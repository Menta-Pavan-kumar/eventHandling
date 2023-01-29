import React,{useState} from "react";
import { useForm } from "react-hook-form";
import "./App.css";
import { Outlet, Link,useNavigate } from "react-router-dom";
function Login(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate()

const [errPassword,setErrPassword]= useState("")
const [errEmail,setErrEmail]= useState("")
const gotoRegister =()=>{
    navigate("/register")
}
  const onSubmit = (data) => {
    const userData = JSON.parse(localStorage.getItem(data.email));
    setErrPassword("")
        setErrEmail("")
    if (userData) { // getItem can return actual value or null
      if (userData.password === data.password) {
        setErrPassword("")
        setErrEmail("")
        navigate("home")
        //alert(userData.name + " You Are Successfully Logged In");
        props.homeFunction(data.email)

        
      } else {
        setErrPassword("Please enter the correct password");
        setErrEmail("")
      }
    } else {
        setErrEmail("Invalid email");

    }
  };
 
  return (
    <>
      

      <form className="App" onSubmit={handleSubmit(onSubmit)}>
        <input type="email" {...register("email", { required: true })} placeholder='Email'/>
        {errors.email && <sub style={{ color: "red" }}>
         *Please provide the email address </sub>}
        
        <input type="password" {...register("password", { required: true })} placeholder='Password'/>
        {errors.password && <sub style={{ color: "red" }}>
         *Please provide the Password </sub>}
         {errPassword && <sub style={{ color: "red" }}>
         {errPassword} </sub>}
         
        <button type={"submit"} style={{ backgroundColor: "#1877f2" }} >
            Login
        </button>
        {errEmail && <sub style={{ color: "red" }}>
         {errEmail} </sub>}
     <sub style={{marginLeft:"-270px"}}>Not Registered?</sub>
     <span onClick={gotoRegister} className="register" style={{ backgroundColor: "#42b72a" }} >
            Register
        </span>
      
      </form>
     
    </>
  );
}
export default Login;