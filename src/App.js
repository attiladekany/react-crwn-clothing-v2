import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './components/checkout/checkout.component';
import { useEffect } from 'react';
import { createUserDocumentFromAuth, onAuthStateChangedListener, signOutUser } from './utils/firebase/firebase.utils';
import { setCurrentUser } from './store/user/user.action';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    signOutUser(); // when the user provider mounts it has to enforce an initial state of the Auth singleton
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      console.log('onAuthStateChangedListener', user);

      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, []); // -> dispatch never changes

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
