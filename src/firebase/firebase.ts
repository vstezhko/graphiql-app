import {initializeApp} from "firebase/app";
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from 'firebase/auth'
import {getFirestore, addDoc, collection} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDwbZGuG3nKI3Hdgb8R8crLs-Gd89R4LyI",
    authDomain: "graphiql-app-5cf3b.firebaseapp.com",
    projectId: "graphiql-app-5cf3b",
    storageBucket: "graphiql-app-5cf3b.appspot.com",
    messagingSenderId: "908387958090",
    appId: "1:908387958090:web:76758e821aa0b3130915b3",
    measurementId: "G-N7FNBYEX09"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const logInWithEmailAndPassword = async (email: string, password: string) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        if (err instanceof Error) {
            console.error(err);
            alert(err.message);
        }
    }
};


export const registerWithEmailAndPassword = async (name: string, email: string, password: string) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (err) {
        if (err instanceof Error) {
            console.error(err);
            alert(err.message);
        }
    }
};

export const logout = () => {
    signOut(auth);
};
