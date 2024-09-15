import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Params } from '../types/Params.type';

export default function Pagination() {
  // there is a fixed highest index because of an error in Google Books API where the totalItems changes seemingly 
  // randomly, causing issues with using it to calculate how many pages there actually are
  // https://stackoverflow.com/questions/76799691/google-books-api-erroneously-incrementing-totalitems-returned
  const HIGHEST_INDEX = 200;
  const ITEMS_PER_PAGE = 40;
  const pageCount = Math.max(1, Math.ceil(HIGHEST_INDEX / ITEMS_PER_PAGE));
  const pages = [...Array(pageCount).keys()];

  const { pageNumber } = useParams<Params>();
  const pageNumberInt = pageNumber ? parseInt(pageNumber) : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (pageNumberInt && pageNumberInt <= 1) {
      navigate('../', { relative: "path", replace: true });
    }
  }, [pageNumber])

  function handlePageNavigation(offset: number) {
    jumpToSpecificPage((pageNumberInt ?? 1) + offset);
  }

  function jumpToSpecificPage(page: number) {
    if (pageNumber) {
      navigate(`../${page}/`, { relative: "path" })
    } else {
      navigate(`./${page}/`, { relative: "path" })
    }
  }

  return (
    <div className='flex justify-center my-6'>

      {pageNumber &&
        <button
          onClick={() => handlePageNavigation(-1)}
          className='px-3 py-2.5 border hover:bg-gray-50'
        >
          <ChevronLeftIcon className='w-3' />
        </button>
      }

      {pages.map((page, index) => {
        return <button
          onClick={() => jumpToSpecificPage(page + 1)}
          key={'pageCount' + index}
          className={`px-3 py-1 border hover:bg-gray-50 ${(pageNumberInt ? pageNumberInt : 1) - 1 === page ? 'bg-slate-300 hover:bg-slate-300' : 'bg-white'}`}
        >
          {page + 1}
        </button>
      })}

      {(pageNumberInt === null || pageNumberInt < pageCount) &&
        <button
          onClick={() => handlePageNavigation(+1)}
          className='px-3 py-2.5 border hover:bg-gray-50'
        >
          <ChevronRightIcon className='w-3' />
        </button>
      }
    </div>
  )
}
