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

  const [amountMessage, setAmountMessage] = useState(5);

  const queryData = async () => {
    const q = query(
      messageRef,
      where("roomId", "==", roomId ? roomId : ""),
      orderBy("createAt", "desc"),
      limit(amountMessage)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessageList(""); ///reset

      if (querySnapshot.docs.length) {
        const newList = [];
        querySnapshot.forEach((doc) => {
          newList.push(doc.data());
        });
        setMessageList((prev) => {
          return [...prev, ...newList];
        });
      }
    });
  };

  useEffect(() => {
    queryData();
    return () => {
      queryData();
    };
  }, [amountMessage]);

  useEffect(() => {
    setAmountMessage(5);
    queryData();
    return () => {
      queryData();
    };
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

  const onSubmit = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
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
          <button
            onClick={() => setAmountMessage(amountMessage + 5)}
            className={style.viewMore}
          >
            view more...
          </button>
          {messageList ? (
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
              .reverse()
          ) : (
            <div>Empty Room</div>
          )}
          {/* End Message List */}
        </div>
        <div className={style.inputField}>
          <input
            placeholder="Your Message"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => onSubmit(e)}
          />
          <button onClick={() => handleSubmit()} disabled={!text}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
