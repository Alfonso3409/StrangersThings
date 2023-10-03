import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Posts from "../src/components/Post";
// import Register from "../src/components/Register";
// import PostForm from "../src/components/PostForm";
// import {
//   logIn,
//   logOut,
//   isLoggedIn,
//   makeHeaders,
// } from "../src/components/Login";
import Navbar from "../src/components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <h1>Posts</h1>
      </header>
      <Posts />
    </div>
  );
}

export default App;
