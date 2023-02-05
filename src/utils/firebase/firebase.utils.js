import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAXnNI5zr_e2u7gyTNuPdTjl8aPN4iE_90",
    authDomain: "crwn-clothing-db-c3f26.firebaseapp.com",
    projectId: "crwn-clothing-db-c3f26",
    storageBucket: "crwn-clothing-db-c3f26.appspot.com",
    messagingSenderId: "871046005663",
    appId: "1:871046005663:web:bbdb38c7b8cab33e5c33aa"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef);
    // console.log('userSnapshot', userSnapshot.exists())


    // if user data !exists
    // create / set the document with the data from userAuth in my collection
    if (!userSnapshot.exists()) {
        const { uid, providerId, displayName, email, photoURL } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                uid,
                providerId,
                displayName,
                email,
                createdAt,
                photoURL
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    // if user data exists
    return userDocRef;
}