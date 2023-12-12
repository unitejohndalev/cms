import React from "react";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";

//import react router properties
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";

const App = () => {

  return (
    <>
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </>
  );
};

export default App;
