import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { UserProvider } from './contexts/user.context';
import { CategoriesProvider } from './contexts/categories.context';
import { CartProvider } from './contexts/cart.context';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import './index.scss';

const client = new ApolloClient({
  uri: 'https://crwn-clothing.com/',
  cache: new InMemoryCache()
});


const Root = () => {
  return (
    <React.StrictMode>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <UserProvider>
            <CategoriesProvider>
              <CartProvider>
                <App />
              </CartProvider>
            </CategoriesProvider>
          </UserProvider>
        </BrowserRouter>
      </ApolloProvider>
    </React.StrictMode>
  )
}

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Root />);



