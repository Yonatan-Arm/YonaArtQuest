import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import logo from "./assets/logo.svg";
import { Home, CreatePost, Login, Signup } from "./pages";
const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>
        <div className="flex flex-row gap-2">
          <Link
            to="/login"
            className="font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
          >
            Login
          </Link>
          <Link
            to="/create-post"
            className="font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
          >
            Create
          </Link>
        </div>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc{100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
