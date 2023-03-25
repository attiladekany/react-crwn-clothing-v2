import { createContext, useState } from 'react';

export const ProductsContext = createContext({
  products: [],
});

export const ProductsProvider = ({ children }) => {
  //one time import data into firestore categories document
  // useEffect(() => {
  //   return () => {
  //     addCollectionAndDocuments('categories', SHOP_DATA);
  //   };
  // }, []);

  const [products, setProducts] = useState([]);
  const value = { products };
  return (
    <ProductsContext.Provider value={products}>
      {children}
    </ProductsContext.Provider>
  );
};
