import React from "react";

const Input = ({
  type = "text",
  placeholder = "",
  name,
  label,
  value,
  onChange,
  className = "",
  error,
}) => {
  return (
    <div className={`flex flex-col w-full mb-1 max-w-[400px] ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium mb-2 text-gray-300"
        >
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full p-3.5 bg-[#3d3a50] text-white border ${
          error ? "border-red-500" : "border-[#3d3a50]"
        } rounded-lg text-base transition-all focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20`}
      />
      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
};

export default Input;
