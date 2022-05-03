import React, { useState } from "react";
import style from "./style/modal.module.scss";

export default function ModalAddRoom(props) {
  const [newRoomName, setNewRoomName] = useState("");
  const { onAddRoom } = props;

  const handleAddRoom = () => {
    onAddRoom(newRoomName);
    setNewRoomName("");
  };

  return (
    <div className={style.modal}>
      <input
        type="text"
        placeholder="Your Room Name"
        onChange={(e) => setNewRoomName(e.target.value)}
        value={newRoomName}
      />
      <button onClick={() => handleAddRoom()}>Add</button>
    </div>
  );
}
