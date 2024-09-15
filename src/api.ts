import { AUTHOR, TITLE } from "./constants";
import { BookListType } from "./types/BookList.type";
import { SearchByType } from "./types/SearchBy.type";

const BASE_URL = 'https://www.googleapis.com/books/v1/volumes?q=';
const BOOK_DISPLAY_AMOUNT = '&maxResults=';
const BOOK_START_INDEX_URL = '&startIndex=';
const DEFAULT_VOLUME_SEARCH_QUERY = 'best+sellers';
const DEFAULT_TITLE_SEARCH_QUERY = 'j.+r.+r.+tolkien';

const api = async (endpoint: string, maxResults: number, startIndex: number): Promise<any> => {
	const response = await fetch(`${BASE_URL}${endpoint}${BOOK_DISPLAY_AMOUNT}${maxResults}${BOOK_START_INDEX_URL}${startIndex}`);
	const data = await response.json();
	return data;
}

const fetchVolumes = async (searchQuery: string | undefined, maxResult: number, startIndex: number): Promise<string> => {
	const query = searchQuery || DEFAULT_VOLUME_SEARCH_QUERY;

	return api(query, maxResult, startIndex);
}

const fetchAuthors = async (searchQuery: string | undefined, maxResult: number, startIndex: number): Promise<string> => {
	const query = searchQuery || DEFAULT_TITLE_SEARCH_QUERY;

	return api('inauthor:' + query, maxResult, startIndex);
}

export const fetchBookData = async (
	searchQuery: string | undefined,
	searchType: SearchByType,
	maxResult: number,
	startIndex: number
): Promise<BookListType> => {
	const fetchFunctions = {
		[TITLE]: fetchVolumes,
		[AUTHOR]: fetchAuthors,
	};

	const fetchTitleOrAuthor = fetchFunctions[searchType];
	const bookVolumes = await fetchTitleOrAuthor(searchQuery, maxResult, startIndex);

	return simplifyApiData(bookVolumes);
}

// as Google Books Api is missing prices for many books I am replacing it with my own random price
// a count key is also necessary to be able to add more books into the cart and a boolean to check if it is in the wishlist
// as there are over 100 key-value pairs which would be complex to write out, I am giving it the type 'any'
function simplifyApiData(bookVolumes: any): BookListType {
	const minimumPrice = 1500;
	const maximumPrice = 8000;
	return {
		totalItems: bookVolumes.totalItems,
		items: bookVolumes.items?.map((book: any) => ({
			id: book.id,
			authors: book.volumeInfo.authors,
			imageLinks: book.volumeInfo.imageLinks,
			title: book.volumeInfo.title,
			industryIdentifiers: book.volumeInfo.industryIdentifiers,
			categories: book.volumeInfo.categories,
			saleInfo: {
				price: getRandomPrice(minimumPrice, maximumPrice),
				currency: 'HUF',
			},
			count: 1,
			inWishList: false,
		}))
	};
}

function getRandomPrice(min: number, max: number): number {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}
