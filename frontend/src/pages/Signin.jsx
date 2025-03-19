import { useState } from "react";
import axios from "axios";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const [signinData, setSigninData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const signin = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKENED_URL}/api/v1/user/signin`,
        signinData
      );

      if (!data.msg) {
        localStorage.setItem("token", `Bearer ${data.token}`);
        navigate("/dashboard");
      }else{
        navigate("/signin");
      }
      
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="min-h-screen w-full bg-base-100 flex justify-center items-center">
      <div className="card bg-base-200 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">PayPaisa</h2>
          <p>Sign into your account</p>
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
          <button className="btn btn-secondary" onClick={() => navigate("/signup")}>
            Go to Signup
          </button>
        </div>
      </div>
    </div>
  );
};
