import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { auth, provider } from '../services/Firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

// Create the context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up the auth state listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user)
      setLoading(false);
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []);

  // Function to sign in with email and password
  const loginWithEmailAndPassword = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  // Function to sign in with Google
  const loginWithGoogle = async () => {
    await signInWithPopup(auth, provider);
  };

  // Function to sign out
  const logout = async () => {
    await signOut(auth);
  };


  const value = {
    currentUser,
    loginWithEmailAndPassword,
    loginWithGoogle,
    logout,
  };



  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
