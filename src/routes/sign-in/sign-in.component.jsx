import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  useEffect(() => {
    const redirectedResultPromise = async () => await getRedirectResult(auth); // auth => keep track auth. state
    redirectedResultPromise().then(async (response) => {
      if (response) {
        const userDocRef = await createUserDocumentFromAuth(response.user);
      }
    });
  }, []); // passing empty array means it will only run once, when the comp is initialized

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign in page</h1>
      <button onClick={logGoogleUser}>Sign in with Google popup</button>
      <button onClick={signInWithGoogleRedirect}>
        Sign in with Google redirect
      </button>
    </div>
  );
};

export default SignIn;
