import { use, useState } from "react";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { LinkPage } from "../components/LinkPage";
import { SubHeading } from "../components/SubHeading";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [signupData, setSignupdata] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: ""
  })
  const navigate = useNavigate()
  const signup = async () => {
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_BACKENED_URL}/api/v1/user/signup`, signupData)
      if(!data){
        navigate("/signup")
      }
      localStorage.setItem("token", `Bearer ${data.token}`)
      navigate("/dashboard")
    } catch (e) {
      console.log(e);
      
    }
    
  }
  return (
    <div className="min-h-screen w-full bg-slate-300 flex justify-center items-center">
      <div className="w-80 bg-white text-center h-fit rounded-md shadow-md px-4">
        <Heading label={"Signup"} />
        <SubHeading label={'Create a free account now'} />
        <InputBox label={'First Name'} placeholder={'John'} onChange={(e)=>{
          setSignupdata(prev=>({
            ...prev,
            firstName: e.target.value
          }))
        }}/>
        <InputBox label={'Last Name'} placeholder={'Doe'} onChange={(e)=>{
          setSignupdata(prev=>({
            ...prev,
            lastName: e.target.value
          }))
        }}/>
        <InputBox label={'Email'} placeholder={'johndoe@gmail.com'} onChange={(e)=>{
          setSignupdata(prev=>({
            ...prev,
            username: e.target.value
          }))
        }}/>
        <InputBox label={'Password'} isPassword={true} onChange={(e)=>{
          setSignupdata(prev=>({
            ...prev,
            password: e.target.value
          }))
        }}/>
        <Button label={'Create'} onClick={signup}/>
        <LinkPage label={'Already have an account?'} linkText={'Login'} to={'/signin'}/>
      </div>
    </div>
  );
};
