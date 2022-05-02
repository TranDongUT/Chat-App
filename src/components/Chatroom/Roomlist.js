import React, { useState } from "react";
import style from "./style/roomList.module.scss";

export default function Roomlist() {
  const [showList, setShowList] = useState(false);

  return (
    <div className={style.roomList}>
      <div className={style.header}>
        <h2>Room List</h2>
        {showList ? (
          <i
            onClick={() => setShowList(false)}
            className="bx bx-chevron-left"
          ></i>
        ) : (
          <i
            onClick={() => setShowList(true)}
            className="bx bx-chevron-down"
          ></i>
        )}
      </div>
      <ul className={style.list}>
        {showList ? (
          <>
            <li className={style.room}>Room1</li>
            <li className={style.room}>Room2</li>
            <li className={style.room}>Room3</li>
          </>
        ) : null}
      </ul>
      <div className={style.footer}>
        <h3>Add Room</h3>
        <i className="bx bx-message-alt-add"></i>
      </div>
    </div>
  );
}
