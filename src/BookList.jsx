import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchBookData, TITLE } from './api';
import Book from './Book';
import LoadingIndicator from './icons/LoadingIndicator';
import NotFound from './NotFound';
import Pagination from './Pagination';

export default function BookList() {
	const { type, query, pageNumber } = useParams();
	const startIndex = pageNumber ? (pageNumber - 1) * 40 : 0;
	let maxResult = query ? 40 : 18;

	const { data: books, isLoading, isError, error } = useQuery({
		queryKey: ['books', query, type, pageNumber],
		queryFn: () => fetchBookData(query, type ?? TITLE, maxResult, startIndex),
		retry: 0,
		staleTime: 60 * 60 * 1000, // 1 hour
	})

	if (books?.error) {
		return (
			<div className="flex items-center justify-center flex-grow">
				{books.error.message}
			</div>
		)
	}

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
