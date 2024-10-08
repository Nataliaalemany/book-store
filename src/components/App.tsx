import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import CartContextProvider from '../context/CartContext';
import ModalContextProvider from '../context/ModalContext';
import WishListContextProvider from '../context/WishListContext';
import Content from './Content';

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <CartContextProvider>
        <WishListContextProvider>
          <ModalContextProvider>
            <div className="flex flex-col min-h-screen">
              <ToastContainer />

              <Content />
            </div>
          </ModalContextProvider>
        </WishListContextProvider>
      </CartContextProvider>
    </QueryClientProvider>
  );
}
