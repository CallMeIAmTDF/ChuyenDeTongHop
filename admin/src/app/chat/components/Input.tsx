import React, { useEffect, useImperativeHandle, useState } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface InputContainerRef {
  focusInput: () => void;
}

interface InputContainerProps {
  handleSendMessage: (messageInput: string) => void;
}

const InputContainer = React.forwardRef<InputContainerRef, InputContainerProps>(
  ({ handleSendMessage }, ref) => {
    const [messageInput, setMessageInput] = useState("");
    const inputRef = React.useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      focusInput: () => {
        inputRef.current?.focus();
      },
    }));

    useEffect(() => {
      inputRef.current?.focus();
    });

    const handleSendClick = () => {
      handleSendMessage(messageInput);
      setMessageInput("");
      inputRef.current?.focus();
    };

    return (
      <div className=" h-full w-full flex items-center">
        <Input
          className="bg-[#e6e6e6] rounded-2xl border-transparent focus-visible:border-transparent focus-visible:ring-0"
          ref={inputRef}
          onKeyDown={(e) => e.key === "Enter" && handleSendClick()}
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          type="text"
          placeholder="Aa"
        />
        <div
          onClick={handleSendClick}
          className=" mx-1 p-2 rounded-full hover:bg-[#ebebeb]"
        >
          <Image src={"/send.svg"} height={20} width={20} alt="" />
        </div>
      </div>
    );
  }
);

export default InputContainer;
