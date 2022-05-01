import React, { useContext, useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { uiConfig, auth } from "../../firebase/config";
import { AuthContext } from "../../store/AuthProvider";
import "./style.scss";
import logo from "../../assest/image/logo.png";
import { getUser } from "../../store/actions";

export default function Login() {
  const [isLogin, setLogin] = useState(false);
  const [state, dispatch] = useContext(AuthContext);
  const { user } = state;

  useEffect(() => {
    if (user.uid) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [user]);

  const logOut = () => {
    auth.signOut();
    setLogin(false);
    dispatch(getUser(""));
  };

  return (
    <div className="container">
      <div className="loginForm">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <h1>Chat App</h1>

        <div>
          {!isLogin ? (
            <>
              <p>Please sign-in:</p>
              <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
            </>
          ) : (
            <>
              <p>
                <img className="avata" src={auth.currentUser.photoURL} alt="" />
                Welcome{" "}
                <span className="displayName">
                  {auth.currentUser.displayName}
                </span>
                ! You are now signed-in!
              </p>
              <button className="logOutBtn" onClick={() => logOut()}>
                Sign-out
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
