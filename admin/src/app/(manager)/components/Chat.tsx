"use client";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { IconContext } from "react-icons/lib";

export function Chat() {
  return (
    <div className="">
      <IconContext.Provider value={{ size: "28px", color: "gray" }}>
        <IoChatboxEllipsesOutline />
      </IconContext.Provider>
    </div>
  );
}
