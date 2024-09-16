import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow gap-2">
      <FaceFrownIcon className="h-20" />

      <div className="text-xl">404</div>

      <div>The page you are looking for does not exist.</div>

      <Link
        to="/"
        className="flex justify-center border-solid rounded-md p-1.5 px-5 h-9 bg-amber-400 text-sm hover:shadow-lg mt-2"
      >
        Return To Home Page
      </Link>
    </div>
  );
}
