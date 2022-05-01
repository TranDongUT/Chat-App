import React, { useContext } from "react";
import { AuthContext } from "../../store/AuthProvider";
import { auth } from "../../firebase/config";
import { getUser } from "../../store/actions";

export default function User() {
  const [state, dispatch] = useContext(AuthContext);
  const { user } = state;

  const logOut = () => {
    auth.signOut();
    dispatch(getUser(""));
  };

  return (
    <div>
      <img className="avata" src={user.photoURL} alt="" />
      <h3>{user.displayName}</h3>
      <button onClick={() => logOut()}>Sign-Out</button>
    </div>
  );
}
