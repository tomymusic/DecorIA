import React from "react";

export function Input({ type = "text", placeholder, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className="border p-2 rounded-lg w-full text-lg shadow-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
}
