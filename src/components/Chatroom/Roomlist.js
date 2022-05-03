import React, { useState } from "react";
import style from "./style/roomList.module.scss";
import { Link } from "react-router-dom";

export default function Roomlist() {
  const [showList, setShowList] = useState(false);
  const [listRoom, setListRoom] = useState([]);

  // const handleAddListRoom = ()=>{
  //   setListRoom(=> {
  //     return [...prev, ]
  //   })
  // }

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
            <Link to={"/Chatroom/1"}>
              <li className={style.room}>Room1</li>
            </Link>
            <Link to={"/Chatroom/2"}>
              <li className={style.room}>Room2</li>
            </Link>
            <Link to={"/Chatroom/3"}>
              <li className={style.room}>Room3</li>
            </Link>
          </>
        ) : null}
      </ul>
      <div onClick={() => handleAddListRoom()} className={style.footer}>
        <h3>Add Room</h3>
        <i className="bx bx-message-alt-add"></i>
      </div>
    </div>
  );
}
