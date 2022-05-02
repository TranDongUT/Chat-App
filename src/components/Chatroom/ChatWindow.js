import React from "react";
import style from "./style/chatRoom.module.scss";

export default function ChatWindow() {
  return (
    <div>
      <div className={style.header}>
        <h2>Room 1</h2>
        <div>
          <i class="bx bx-user-plus"></i>
        </div>
      </div>
    </div>
  );
}
