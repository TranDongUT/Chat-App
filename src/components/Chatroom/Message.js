import React from "react";
import style from "./style/message.module.scss";
export default function Message(props) {
  const { photoURL, displayName, createAt, text } = props;

  return (
    <div className={style.message}>
      <img className={style.avatar} src={photoURL} alt="" />
      <div className={style.displayName}>
        <h3>{displayName}</h3>
        <span className={style.createAt}>{createAt}</span>
      </div>
      <p className={style.text}>{text}</p>
    </div>
  );
}
