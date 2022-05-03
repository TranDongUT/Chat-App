import React, { createContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { initialState, userReducer } from "./reducers";
import firebase from "firebase/compat/app";
import { getUser } from "../store/actions";
import { auth } from "../firebase/config";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const negative = useNavigate();

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        if (user) {
          const { uid, displayName, email, photoURL } = user;
          ///store in reducer
          dispatch(getUser({ uid, displayName, email, photoURL }));
        } else {
          negative("Login");
        }
      });

    ///clean up func
    return () => unregisterAuthObserver();
  }, []);

  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {children}
    </AuthContext.Provider>
  );
}
