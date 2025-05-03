import React, { useState } from "react";
import { Input } from "@/components/ui/input";

const InputField = ({
  icon: Icon,
  type,
  placeholder,
  value,
  onChange,
  onKeyDown,
  required,
  name,
  min,
  max,
  id,
  className,
  register,
  disabled = false,
  ...props
}) => {
  const [inputType, setInputType] = useState(type);

  return (
    <span
      className={`${className} bg-white flex items-center border border-dark-700 px-3 py-1 rounded-lg transition-all focus-within:ring-1 focus-within:ring-dark-500`}
    >
      {Icon && (
        <span className={`px-1 text-xl ${disabled ? "text-dark-400" : "text-main-400"}`}>
          {Icon}
        </span>
      )}

      <Input
        min={min}
        max={max}
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={register && register[name]?.error ? "true" : "false"}
        required={required}
        name={name}
        onKeyDown={onKeyDown}
        id={id}
        disabled={disabled}
        className="w-full bg-transparent placeholder:text-dark-700 text-dark-900 placeholder:text-sm text-lg bg-white !border-none outline-none focus-visible:ring-0 !focus:ring-0 !focus:outline-none"
        {...(register ? register(name) : {})}
        {...props}
      />

      {type === "password" && (
        <button
          onClick={() =>
            setInputType(inputType === "password" ? "text" : "password")
          }
          type="button"
          className="text-main-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-eye"
          >
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>
      )}
    </span>
  );
};

export default InputField;
