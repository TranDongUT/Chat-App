import React, { useContext } from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import style from "./style/style.module.scss";

export default function Chatroom() {
  return (
    <div className={style.container}>
      <div className={style.col3}>
        <Sidebar />
      </div>
      <div className={style.col7}>
        <ChatWindow />
      </div>
    </div>
  );
}
