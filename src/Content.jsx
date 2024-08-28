import { Route, Routes } from 'react-router-dom';
import BookList from './BookList';
import WishList from './WishList';
import { home, wishList } from './routes';

export default function Content() {
  return (
    <Routes>
      <Route path={home} element={<BookList />} />

      <Route path={wishList} element={<WishList />} />
    </Routes >
  )
}
