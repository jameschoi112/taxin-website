// src/firebase/auth.js
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { app } from './config';

export const auth = getAuth(app);

export const loginWithEmail = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    throw error;
  }
};

export const logout = () => signOut(auth);