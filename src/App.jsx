import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Content from './Content';
import CartContextProvider from './context/CartContext';
import ModalContextProvider from './context/ModalContext';
import WishListContextProvider from './context/WishListContext';
import Header from './Header';


export default function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <CartContextProvider>
        <WishListContextProvider>
          <ModalContextProvider>
            <div className="flex flex-col min-h-screen">
              <Header />

              <Content />
            </div>
          </ModalContextProvider>
        </WishListContextProvider>
      </CartContextProvider>
    </QueryClientProvider>
  );
}
