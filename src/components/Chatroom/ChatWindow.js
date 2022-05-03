import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./style/chatwindow.module.scss";
import AvatarGroup from "react-avatar-group";
import Message from "./Message";
import { db } from "../../firebase/config";
import { AuthContext } from "../../store/AuthProvider";
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
import { useParams } from "react-router-dom";

export default function ChatWindow() {
  const [state, dispatch] = useContext(AuthContext);
  const { uid, displayName, email, photoURL } = state.user;
  const [messageList, setMessageList] = useState([]);

  const { roomId } = useParams();

  const [text, setText] = useState("");

  const messageRef = collection(db, "messages");

  useEffect(async () => {
    const q = query(
      messageRef,
      where("roomId", "==", roomId),
      orderBy("createAt", "desc"),
      limit(5)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessageList("");

      if (!querySnapshot.docs.length) {
      } else {
        const newList = [];
        querySnapshot.forEach((doc) => {
          newList.push(doc.data());
        });
        setMessageList((prev) => {
          return [...prev, ...newList];
        });
      }
    });

    return () => {
      unsubscribe();
    };

    // const querySnapshot = await getDocs(q);
  }, [roomId]);

  const handleSubmit = async () => {
    await addDoc(messageRef, {
      uid: uid,
      displayName: displayName,
      email: email,
      photoURL: photoURL,
      text: text,
      createAt: serverTimestamp(),
      roomId: roomId,
    });
    setText("");
  };

  return (
    <div className={style.chatWindow}>
      <div className={style.header}>
        <h2>{roomId}</h2>
        <div>
          <i className="bx bx-user-plus"></i>
          <AvatarGroup
            avatars={["James", "Amy", "Will" /* or IAvatar objects */]}
            initialCharacters={1}
            max={3}
            size={30}
            displayAllOnHover
            shadow={2}
          />
        </div>
      </div>
      <div className={style.body}>
        <div className={style.messageList}>
          {messageList &&
            messageList
              .map((messageItem, index) => {
                return (
                  <Message
                    key={index}
                    photoURL={messageItem.photoURL}
                    displayName={messageItem.displayName}
                    text={messageItem.text}
                    auth={uid == messageItem.uid ? "auth" : null}
                  />
                );
              })
              .reverse()}
          {/* End Message List */}
        </div>
        <div className={style.inputField}>
          <input
            placeholder="Your Message"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={() => handleSubmit()} disabled={!text}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
