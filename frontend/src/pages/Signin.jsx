import { useState } from "react";
import axios from 'axios'
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { LinkPage } from "../components/LinkPage";
import { SubHeading } from "../components/SubHeading";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const [signinData, setSigninData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate()
  
  const signin = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKENED_URL}/api/v1/user/signin`,
        signinData
      );
      
      if (!data) {
        navigate("/signin");
      }
      localStorage.setItem("token", `Bearer ${data.token}`);
      navigate("/dashboard");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-300 flex justify-center items-center">
      <div className="w-80 bg-white text-center h-fit rounded-md shadow-md px-4">
        <Heading label={"Login"} />
        <SubHeading label={"Sign into your account"} />
        <InputBox
          label={"Email"}
          placeholder={"johndoe@gmail.com"}
          onChange={(e) => {
            setSigninData((prev) => ({
              ...prev,
              username: e.target.value,
            }));
          }}
        />
        <InputBox
          label={"Password"}
          isPassword={true}
          onChange={(e) => {
            setSigninData((prev) => ({
              ...prev,
              password: e.target.value,
            }));
          }}
        />
        <Button label={"Login"} onClick={signin} />
        <LinkPage
          label={"Don't have an account?"}
          linkText={"Create"}
          to={"/signup"}
        />
      </div>
    </div>
  );
};
