import React from "react";
import Roomlist from "./Roomlist";
import User from "./User";
import style from "./style/sideBar.module.scss";
export default function Sidebar() {
  return (
    <div className={style.sideBar}>
      <div className="header">
        <User />
      </div>
      <Roomlist />
    </div>
  );
}
