import React, { useState } from "react";
import { Input, InputProps } from "@/components/ui/input";

export function PasswordField(props: InputProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Input type={show ? "text" : "password"} {...props} />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-7 text-[10px] font-bold text-slate-400 hover:text-slate-600"
      >
        {show ? "HIDE" : "SHOW"}
      </button>
    </div>
  );
}