import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Pagination() {
  // there is a fixed highest index because of an error in Google Books API where the totalItems changes seemingly 
  // randomly, causing issues with using it to calculate how many pages there actually are
  // https://stackoverflow.com/questions/76799691/google-books-api-erroneously-incrementing-totalitems-returned
  const highestIndex = 200;
  const itemsPerPage = 40;
  const pageCount = Math.max(1, Math.ceil(highestIndex / itemsPerPage));
  const pages = [...Array(pageCount).keys()];

  const { pageNumber } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (pageNumber <= 1) {
      navigate('../', { relative: "path", replace: true });
    }
  }, [pageNumber])


  function handlePageNavigation(offset) {
    jumpToSpecificPage(parseInt(pageNumber ?? 1) + offset);
  }

  function jumpToSpecificPage(page) {
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

      {pages?.map((page, index) => {
        return <button
          onClick={() => jumpToSpecificPage(page + 1)}
          key={'pageCount' + index}
          className={`px-3 py-1 border hover:bg-gray-50 ${(pageNumber ? pageNumber : 1) - 1 === page ? 'bg-slate-300 hover:bg-slate-300' : 'bg-white'}`}
        >
          {page + 1}
        </button>
      })}

      {(pageNumber === undefined || pageNumber < pageCount) &&
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
