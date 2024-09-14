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
	const { type, query, pageNumber } = useParams<Params>();
	const pageNumberInt = parseInt(pageNumber!);
	const startIndex: number = pageNumber ? (pageNumberInt - 1) * 40 : 0;
	const maxResult: number = query ? 40 : 18;

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

	if (books?.totalItems === 0) {
		return <div className="flex items-center justify-center flex-grow">There are no books found</div>;
	}

	return (
		<div className="container">
			<div className='grid gap-4 grid-cols-[repeat(auto-fit,minmax(144px,1fr))]'>
				{books?.items?.map((book) => (
					<Book key={book.id} book={book} />
				))}
			</div>

			{query && <Pagination />}
		</div>
	)
}
