import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase.ts';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { isLoggedInSlice } from '../store/slices/isLoggedInSlice.ts';

export const useFetchAndSetFirebaseStatus = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isLoggedInSlice.actions.setLoading(true));
    onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        dispatch(isLoggedInSlice.actions.setStatus(true));
        dispatch(isLoggedInSlice.actions.setLoading(false));
      } else {
        localStorage.setItem('isLoggedIn', JSON.stringify(false));
        dispatch(isLoggedInSlice.actions.setStatus(false));
        dispatch(isLoggedInSlice.actions.setLoading(false));
      }
    });
  }, []);
};
