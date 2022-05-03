import React from "react";
import style from "./style/message.module.scss";
import clsx from "clsx";

export default function Message(props) {
  const { photoURL, displayName, createAt, text, auth } = props;

  const classStyle = clsx(style.message, auth ? style.authMessage : null);

  return (
    <div className={classStyle}>
      <img className={style.avatar} src={photoURL} alt="" />
      <div className={style.displayName}>
        <h3>{displayName}</h3>
        <span className={style.createAt}>{createAt}</span>
      </div>
      <p className={style.text}>{text}</p>
    </div>
  );
}
