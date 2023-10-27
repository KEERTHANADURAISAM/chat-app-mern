import React from "react";
import "./Login.css";
import chat from "./speech-bubble.png";
import { Button } from "@mui/material";
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import { useStateValue } from "../context/StateProvider";
import { actionTypes } from "../context/reducer";
const Login = () => {
  const [{user}] = useStateValue();
  const [state, dispatch] =  useStateValue();
  console.log(state);

const signin =()=>{
signInWithPopup(auth,provider).then((result)=>{
dispatch({
  type:actionTypes.SET_USER,
  user:result.user,
})
}).catch((err)=>{
  alert(err.message);
})
}

  return (
    <div className="login">
      <div className="login-container">
        <img src={chat} alt="chat" className="chat-icon" />
        <div className="login-text">
          <h1>Login to Live Chat-App</h1>
        </div>
        <Button onClick={signin}>Sign in With Google</Button>
      </div>
    </div>
  );
};

export default Login;
