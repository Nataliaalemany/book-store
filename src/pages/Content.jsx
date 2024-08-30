import { Route, Routes } from 'react-router-dom';
import BookList from '../components/book/BookList';
import Layout from '../components/Layout';
import { home, wishList } from '../routes';
import WishList from './WishList';

export default function Content() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path={home} element={<BookList />} />

        <Route path={wishList} element={<WishList />} />
      </Route>
    </Routes >
  )
}
