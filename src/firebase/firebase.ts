import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDwbZGuG3nKI3Hdgb8R8crLs-Gd89R4LyI',
  authDomain: 'graphiql-app-5cf3b.firebaseapp.com',
  projectId: 'graphiql-app-5cf3b',
  storageBucket: 'graphiql-app-5cf3b.appspot.com',
  messagingSenderId: '908387958090',
  appId: '1:908387958090:web:76758e821aa0b3130915b3',
  measurementId: 'G-N7FNBYEX09',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const signUp = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return { token: userCredential.user.getIdToken(), error: undefined };
    })
    .catch((error) => {
      return { error: error.message, token: undefined };
    });
};

export const signIn = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return { token: userCredential.user.getIdToken(), error: undefined };
    })
    .catch((error) => {
      return { error: error.message, token: undefined };
    });
};

export const logout = () => {
  signOut(auth);
};
