// inside src/App.js
// Replace previous code with this.

import React,{useState} from "react";
import { useForm } from "react-hook-form";
import "./App.css";
import Login from "./login";
import Register from "./register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";

function App() {
  const [emailId,setEmailId]=useState()
  const homeFunction =(email)=>{
    setEmailId(email)
  }
  
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login homeFunction={homeFunction}/>}></Route>
          <Route path="register" element={<Register/>} />
          <Route path="home" element={<Home emailId={emailId}/>} />
          
        
      </Routes>
    </BrowserRouter>
     
     
      
     
    </>
  );
}

export default App;
