import React, { useContext } from "react";
import { AuthContext } from "../../store/AuthProvider";
import { auth } from "../../firebase/config";
import { getUser } from "../../store/actions";

import style from "./style/user.module.scss";

export default function User() {
  const [state, dispatch] = useContext(AuthContext);
  const { user } = state;

  const logOut = () => {
    auth.signOut();
    dispatch(getUser(""));
  };

  return (
    <div className={style.user}>
      <img className={style.user__avata} src={user.photoURL} alt="" />
      <div>
        <h3 className={style.user__name}>{user.displayName}</h3>
        <button onClick={() => logOut()}>Sign-Out</button>
      </div>
    </div>
  );
}
