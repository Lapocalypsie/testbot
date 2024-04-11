import React from "react";
import Chat from "./components/Chat";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
      <div className="max-w-lg mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">My personnal GTP</h1>
        <Chat />
      </div>
    </div>
  );
};

export default Home;
