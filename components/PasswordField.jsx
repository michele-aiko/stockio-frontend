"use client";
import { useState } from "react";
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai"

export default function PasswordField({ className = "", inputClass = "", buttonClass = "", value, onChange, placeholder = "Senha" }) {
  const [showPassword, setShowPassword] = useState(false); //Cria um estado showPassword e uma função pra atualiz-a-lo
  function toggleVisibility() {
  setShowPassword(!showPassword); //O que fazer quando o usuário interagir
                                  // togglevisibility decide qual valor mandar pra setshowpassword, que muda o valor de fato
}
 
  return (
    <div className={className}>
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value} 
        onChange={onChange}
        className={inputClass}
      />

      <button
        type="button"
        onClick={toggleVisibility}
        className={buttonClass}
      >
        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
      </button>
    </div>
  );
}
