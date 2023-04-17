import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore';
const ANONYMOUS_ICON_PATH =
    'https://resumegenius.com/wp-content/uploads/resume-profile-icon.png';

const firebaseConfig = {
    apiKey: 'AIzaSyAXnNI5zr_e2u7gyTNuPdTjl8aPN4iE_90',
    authDomain: 'crwn-clothing-db-c3f26.firebaseapp.com',
    projectId: 'crwn-clothing-db-c3f26',
    storageBucket: 'crwn-clothing-db-c3f26.appspot.com',
    messagingSenderId: '871046005663',
    appId: '1:871046005663:web:bbdb38c7b8cab33e5c33aa',
};

initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

// one time initializer used to set categories collection
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach(object => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const documentQuery = query(collectionRef);

    const querySnapshot = await getDocs(documentQuery);
    return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

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
                photoURL: photoURL || ANONYMOUS_ICON_PATH,
                ...additionalInformation,
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    // if user data exists
    return userSnapshot;
};

export const createAuthUserWithEmailAndPassword = async (email, pasword) => {
    if (!email || !pasword) return;

    return await createUserWithEmailAndPassword(auth, email, pasword);
};

export const signInAuthWithEmailAndPassword = async (email, pasword) => {
    if (!email || !pasword) return;

    return await signInWithEmailAndPassword(auth, email, pasword);
};

export const signOutUser = async () => {
    await signOut(auth);
};

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth, (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        )
    })
}


