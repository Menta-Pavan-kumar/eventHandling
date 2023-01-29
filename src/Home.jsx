import React,{useState} from "react";
import { useForm } from "react-hook-form";
import "./App.css";
import { useNavigate } from "react-router-dom";
import Table from "./table";
import { useEffect } from "react";

function Home(props) {
    const {register,reset, handleSubmit, formState: { errors } } = useForm();
    const [data1,setData]= useState([])
    const [edit,setEdit]= useState(false)
    const [index,setIndex]= useState()
    const navigate = useNavigate()
    const onSubmit = (data) => {
        if(edit){
          const updateItem = JSON.parse(localStorage.getItem('dataItem'));
          updateItem.map((value,ind)=>{
            if(value.id==index){
            updateItem[ind]=data
            return updateItem
          }})
          
  localStorage.setItem('dataItem', JSON.stringify(updateItem));
      setEdit(false)
      
      const output=updateItem.filter(value=>value.email==props.emailId)
      
  setData(output)
      reset({eventname:"",eventdate:"",description:"",password:false})
        }
        else{
          const dbdata =  JSON.parse(localStorage.getItem('dataItem')) || [];
          data.email=props.emailId
          data.id=crypto.randomUUID();
          dbdata.push(data);
          localStorage.setItem('dataItem', JSON.stringify(dbdata));
          
          const output=dbdata.filter(value=>value.email==props.emailId)
  setData(output)
          reset({eventname:"",eventdate:"",description:"",password:false})
        }
    };
  
useEffect(()=>{
  const updateItem = JSON.parse(localStorage.getItem('dataItem')) || [];
 
  const output=updateItem.filter(value=>value.email==props.emailId)
  setData(output)
},[])

const toEdit = (e, ele, rowIndex,id) => {
  e.preventDefault();

  reset(ele)
  setEdit(true)
  setIndex(id)
};

const toDelete = (e, rowIndex) => {
  e.preventDefault();
  const updateItem = JSON.parse(localStorage.getItem('dataItem'));
  updateItem.map((value,ind)=>{
    if(value.id==rowIndex ){
      updateItem.splice(ind, 1);
    return updateItem
  }})
  
  localStorage.setItem('dataItem', JSON.stringify(updateItem));
  const output=updateItem.filter(value=>value.email==props.emailId)
  setData(output)
  
};
const disableDate=()=>{
  var today,dd,mm,yyyy;
  today=new Date();
  dd=today.getDate()+1;
  mm=today.getMonth()+1;
  yyyy=today.getFullYear();
  return yyyy+'-'+mm+'-'+dd;
}
  return (
    <>
    <button style={{marginLeft:"92%",paddind:"10px"}} onClick={e=>{navigate("/")}}>Logout</button>
      <div>
      
      <form className="App" onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register("eventname", { required: true })}   placeholder='Event Name'/>
        
        <input type="date"  {...register("eventdate", { required: true })}  minDate= {disableDate} placeholder='Event date' />
        
        <input type="text" {...register("description", { required: true })} placeholder='Event description'/>
        <label style={{marginLeft:"-160px"}}>
          
          <input
            name="isGoing"
            type="checkbox"
            {...register("password", { required: true })}
            
             />
             I accept terms & conditions
        </label>

       
        <input type={"submit"} style={{ backgroundColor: "#1877f2" }} disabled={errors.eventname || errors.eventdate || errors.description || errors.password}/>
        
        
       
      </form>
      </div>
      <div style={{overflowY:"auto"}}>
      <Table tableData={data1} toEdit={toEdit} toDelete={toDelete}

          />
          </div>
      
    </>
  );
}
export default Home;