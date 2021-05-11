import React, { useState } from "react";
import firebase from "../../../config/Firebase"
import {useHistory} from 'react-router-dom'
import avatar from '../../../image/avatar.png'
import wave from '../../../image/wave.png'
import list from '../../../image/list.png'
import App from '../../../App.css'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();
  const handleClick = () => {
    history.push("/register")
}
const resetForm =() => {
  setEmail("");
  setPassword("");
};

  const handleSubmit = () => {
    const data = {
      email: email,
      password: password,
    };
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((res) => history.push("/dashboard"))
      .catch((error) =>{
        console.log(error,"error")
        alert("Make sure your email dan password are correct")
       
        });
    resetForm();
  };

  return (
    //JSX 
    //
    <div className="body">
      
      <img src={wave} className="wave" alt="wave" />
      <div className="container1">
        <div className="img">
      <img src={list} className="list" alt="list" />
</div>
      <div className="login-container">
      <form className="row ">
<img src={avatar} className="avatar" alt="avatarr" />

      <h2>Welcome</h2>
        
          <h5>Email</h5>
          <input
        className="form"
        placeholder="Masukan email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
        
          <h5>Password</h5>
          
          <input
        className="form"
        placeholder="Masukan password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
       
      
       <button className="btn" type="button" onClick={handleSubmit} >Login</button>
        <p className="or">Or</p>
 <button className="buat" type="button" onClick={handleClick}>Create Account</button>

        
      
      </form>

    </div>
    </div>
    </div>
  );
};

export default Login;

