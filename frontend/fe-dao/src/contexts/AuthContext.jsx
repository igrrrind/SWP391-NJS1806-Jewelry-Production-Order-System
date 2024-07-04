import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { auth, provider } from '../services/Firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, createUserWithEmailAndPassword} from 'firebase/auth';
import { useCustomerDetailsById } from '@/hooks/customerDetailHooks';
import { useUserById } from '@/hooks/userHooks';

// Create the context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Set up the auth state listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
           setCurrentUser(user)
           setLoading(false);
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []);
  
  const{ customerDetails } = useCustomerDetailsById(currentUser)
  const{ user } = useUserById(currentUser)

  useEffect(() => {
    if (customerDetails) {
      setCurrentCustomer(customerDetails);
      console.log(currentCustomer)
    } else {
      console.log('login')
    }
  }, [customerDetails]);

  useEffect(() => {
    if (user) {
      setUserDetails(user);
      console.log(user)
    } else {
      console.log('login')
    }
  }, [user]);
  

  // Function to sign in with email and password
  const loginWithEmailAndPassword = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  // Function to sign in with Google
  const loginWithGoogle = async () => {
    await signInWithPopup(auth, provider);

  };

  const signupWithEmailAndPassword = async (email, password, firstName, lastName) => {
    await createUserWithEmailAndPassword(auth, email, password) 
  }

  // Function to sign out
  const logout = async () => {
    setCurrentCustomer(null);
    setUserDetails(null);
    await signOut(auth);
  };


  const value = {
    currentUser,
    currentCustomer,
    userDetails,
    loginWithEmailAndPassword,
    loginWithGoogle,
    logout,
    signupWithEmailAndPassword,
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
