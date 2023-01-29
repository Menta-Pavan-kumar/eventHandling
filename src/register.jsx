import React,{useState}  from "react";
import { useForm } from "react-hook-form";
import "./App.css";
import { useNavigate } from "react-router-dom";
function Register() {
    const {register,reset, handleSubmit, formState: { errors } } = useForm();
    const [success,setSuccess]= useState("")
    const [failure,setFailure]= useState("")
    const navigate = useNavigate()
    const onSubmit = (data) => {
        setSuccess("")
        setFailure("")
        const userData = JSON.parse(localStorage.getItem(data.email));
      if(!userData){
        localStorage.setItem(data.email, JSON.stringify({ 
            name: data.name, password: data.password 
        }));
setSuccess("Registered")
reset({email:"",name:"",password:""})
      }
      else{
        setFailure("This Email Id is already registered")
      }
      
      
    };
    const gotoLogin =()=>{
        navigate("/")
    }
  return (
    <>
      

      <form className="App" onSubmit={handleSubmit(onSubmit)}>
      <input type="email" {...register("email", { required: true,pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/  })}   placeholder='Email'/>
        {errors.email && <sub style={{ color: "red" }}>
        *Please provide valid email address </sub>}
        <input type="text" {...register("name", { required: true })}  placeholder='User Name' />
        {errors.name && <sub style={{ color: "red" }}>
        *Please provide the name </sub>}
        <input type="password" {...register("password", { required: true ,pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/})} placeholder='Password'/>
        {errors.password && <sub style={{ color: "red" }}>
        *Please provide the strong password </sub>}
        <button type={"submit"} style={{ backgroundColor: "#1877f2" }} >Register</button>
        {success && <sub style={{ color: "green" }}>
       {success} </sub>}
       {failure && <sub style={{ color: "green" }}>
       {failure} </sub>}
        <sub style={{marginLeft:"-240px"}}>Already Registered?</sub>
        <span onClick={gotoLogin} className="register" style={{ backgroundColor: "#42b72a" }} >
            Login
        </span>
      </form>
    </>
  );
}
export default Register;