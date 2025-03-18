import { useState } from "react";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [signupData, setSignupdata] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const signup = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKENED_URL}/api/v1/user/signup`,
        signupData
      );
      if (!data) {
        navigate("/signup");
      }
      localStorage.setItem("token", `Bearer ${data.token}`);
      navigate("/dashboard");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="min-h-screen w-full bg-base-100 flex justify-center items-center">
      <div className="card bg-base-200 w-96 shadow-sm">
        <div className="card-body">
        <h2 className="card-title">PayPaisa</h2>
        <p>Create a free Account now</p>
          <InputBox
            label={"First Name"}
            placeholder={"John"}
            onChange={(e) => {
              setSignupdata((prev) => ({
                ...prev,
                firstName: e.target.value,
              }));
            }}
          />
          <InputBox
            label={"Last Name"}
            placeholder={"Doe"}
            onChange={(e) => {
              setSignupdata((prev) => ({
                ...prev,
                lastName: e.target.value,
              }));
            }}
          />
          <InputBox
            label={"Email"}
            placeholder={"johndoe@gmail.com"}
            onChange={(e) => {
              setSignupdata((prev) => ({
                ...prev,
                username: e.target.value,
              }));
            }}
          />
          <InputBox
            label={"Password"}
            isPassword={true}
            onChange={(e) => {
              setSignupdata((prev) => ({
                ...prev,
                password: e.target.value,
              }));
            }}
          />
          <Button label={"Create"} onClick={signup} />
          <button class="btn btn-secondary" onClick={()=>navigate('/signin')}>Go to Login</button>
        </div>
      </div>
    </div>
  );
};
