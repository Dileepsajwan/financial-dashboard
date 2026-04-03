import React from "react";

export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="fixed top-5 right-5 bg-black text-white px-4 py-2 rounded-lg shadow-lg animate-bounce z-50">
      {message}
    </div>
  );
}
