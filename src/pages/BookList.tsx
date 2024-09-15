import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchBookData } from '../api';
import Pagination from '../components/Pagination';
import Book from '../components/book/Book';
import { TITLE } from '../constants';
import LoadingIndicator from '../icons/LoadingIndicator';
import { Params } from '../types/Params.type';
import NotFound from './NotFound';

export default function BookList() {
	const MIN_RESULTS_PER_PAGE = 18;
	const MAX_RESULTS_PER_PAGE = 40;
	const { type, query, pageNumber } = useParams<Params>();
	const pageNumberInt = parseInt(pageNumber!);
	const startIndex: number = pageNumber ? (pageNumberInt - 1) * MAX_RESULTS_PER_PAGE : 0;
	const maxResult: number = query ? MAX_RESULTS_PER_PAGE : MIN_RESULTS_PER_PAGE;

	const { data: books, isLoading, isError } = useQuery({
		queryKey: ['books', query, type, pageNumber],
		queryFn: () => fetchBookData(query, type ?? TITLE, maxResult, startIndex),
		retry: 0,
		staleTime: 60 * 60 * 1000, // 1 hour
	})

	if (isLoading) {
		return <LoadingIndicator />
	}

	if (isError) {
		return <NotFound />
	}

	if (!books || books.totalItems === 0) {
		return <div className="flex items-center justify-center flex-grow">There are no books found</div>;
	}

	return (
		<div className="container">
			<div className='grid gap-4 grid-cols-[repeat(auto-fit,minmax(144px,1fr))]'>
				{books.items.map((book) => (
					<Book key={book.id} book={book} />
				))}
			</div>

			{query && <Pagination />}
		</div>
	)
}
