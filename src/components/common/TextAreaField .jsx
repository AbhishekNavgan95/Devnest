import React, { useState } from "react";
import { Textarea } from "../ui/textarea";

const TextAreaField = ({
  icon: Icon,
  type,
  placeholder,
  value,
  onChange,
  required,
  name,
  resize = true,
  id,
  className,
  register,
  rows,
  disabled = false,
  ...props
}) => {
  const [inputType, setInputType] = useState(type);

  return (
    <span
      className={`${className} bg-white flex items-start border border-dark-700 px-3 py-1 rounded-lg transition-all focus-within:ring-1 focus-within:ring-dark-500`}
    >
      {Icon && (
        <span className={`px-1 mt-2 text-xl ${disabled ? "text-dark-400" : "text-main-400"}`}>
          {Icon}
        </span>
      )}

      <Textarea
        type={inputType}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={register && register[name]?.error ? "true" : "false"}
        required={required}
        name={name}
        id={id}
        disabled={disabled}
        style={{
          resize: !resize ? "none" : "vertical",
        }}
        className="w-full bg-transparent placeholder:text-dark-700 text-dark-900 placeholder:text-sm text-lg bg-white !border-none outline-none focus-visible:ring-0 !focus:ring-0 !focus:outline-none"
        {...(register ? register(name) : {})}
        {...props}
      />
    </span>
  );
};

export default TextAreaField;
