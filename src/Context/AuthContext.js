import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

const AuthContext = React.createContext();
export function useAuth() {
   return useContext(AuthContext);
}

export function AuthProvider({ children }) {
   const [currentUser, setCurrentUser] = useState();
   const [loading, setloading] = useState(true);

   // ? The auth function returns a promise upon which we decides whether there is an error
   // ? or successful reg of user, and to redirect user to specific page.
   function signUp(email, password) {
      return auth.createUserWithEmailAndPassword(email, password);
   }

   function signin(email, password) {
      return auth.signInWithEmailAndPassword(email, password);
   }

   function logout() {
      return auth.signOut();
   }

   function resetPassword(email) {
      return auth.sendPasswordResetEmail(email);
   }

   // ? Firebase has a way to notify you when the user get set
   // ? In order to
   useEffect(() => {
      // ? the onAuthStateChanged() function returns The unsubscribe function for the observer
      // ? So you can save it in a variable to unsubscribe at anytime you want
      // ? we want to unsubscribe to prevent memory leakes consider article on Chrome
      const unsubscribe = auth.onAuthStateChanged((user) => {
         setCurrentUser(user);
         setloading(false);
      });

      // ? When we unmount from component we return from useEffect
      return unsubscribe;
   }, []);

   const value = {
      currentUser,
      signUp,
      signin,
      logout,
      resetPassword,
   };
   return (
      <AuthContext.Provider value={value}>
         {!loading && children}
      </AuthContext.Provider>
   );
}
