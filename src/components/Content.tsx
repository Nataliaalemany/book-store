import { Route, Routes } from 'react-router-dom';
import BookList from '../pages/BookList';
import WishList from '../pages/WishList';
import { home, wishList } from '../routes';
import Layout from './Layout';

export default function Content() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path={home} element={<BookList />} />

        <Route path={wishList} element={<WishList />} />
      </Route>
    </Routes>
  );
}
