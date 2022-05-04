import React, { useState, useEffect } from "react";
import style from "./style/roomList.module.scss";
import { Link } from "react-router-dom";
import { db } from "../../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import ModalAddRoom from "./ModalAddRoom";

export default function Roomlist() {
  const [showList, setShowList] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [listRoom, setListRoom] = useState([]);

  const roomRef = collection(db, "rooms");

  useEffect(async () => {
    const q = query(roomRef, orderBy("roomId", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setListRoom("");

      if (!querySnapshot.docs.length) {
      } else {
        const newList = [];
        querySnapshot.forEach((doc) => {
          newList.push(doc.data());
        });
        setListRoom((prev) => {
          return [...prev, ...newList];
        });
      }
    });

    return () => {
      unsubscribe();
    };

    // const querySnapshot = await getDocs(q);
  }, []);

  const handleAddListRoom = async (newRoomName) => {
    const found = listRoom
      ? listRoom.some((el) => el.roomId === newRoomName)
      : false;

    if (!found) {
      await addDoc(roomRef, {
        roomId: newRoomName,
        createAt: serverTimestamp(),
      });
    } else {
      alert("existed");
    }
  };

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
            {listRoom &&
              listRoom.map((room) => {
                return (
                  <Link
                    onClick={() => setShowList(false)}
                    key={room.roomId}
                    to={`/Chatroom/${room.roomId}`}
                  >
                    <li className={style.room}>{room.roomId}</li>
                  </Link>
                );
              })}
          </>
        ) : null}
      </ul>
      <div onClick={() => setShowModal(!showModal)} className={style.footer}>
        <h3>Add Room</h3>
        <i className="bx bx-message-alt-add"></i>
      </div>
      {showModal && <ModalAddRoom onAddRoom={handleAddListRoom} />}
    </div>
  );
}
