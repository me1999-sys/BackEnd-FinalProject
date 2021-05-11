import React, { useState } from "react";
import firebase from '../../../config/Firebase'
import {useHistory} from 'react-router-dom'

const Register = () => {
  const [email,setEmail] = useState("")
  const [password,setPassword] =useState("")
  const [fullname,setFullname] =useState("")

  let history = useHistory();
  const onSubmit  = () =>{
    
    const data = {
      email:email,
      fullname: fullname,
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    //simpan ke realtime database
    const userId = userCredential.user.uid;
    firebase.database().ref('users/' + userId).set(data);
   setFullname('')
   setEmail('')
  setPassword('')
    // redirect ke halaman dashboard
  history.push("/dashboard")
  })
  .catch((error) => {
    console.log(error)
//tampilkan pesan error
  });

  };
  
  
  return (
     <div className="container mt-5">
       <h1>Register</h1>
       <p className="mt-4">Nama Lengkap</p>
            <input 
            className="form-control"
            placeholder="Masukkan nama lengkap" 
            value={fullname} 
            onChange={(e) =>setFullname(e.target.value)} />
          
           <p className="mt-4">Email</p>
            <input 
            className="form-control"
            placeholder="Masukkan email" 
            value={email} 
            onChange={(e) =>setEmail(e.target.value)} />
            <br />
            <p className="mt-4">Password</p>
            <i class="fas fa-lock"></i>
            <input className="form-control"
             placeholder="Masukkan password" 
             type="password" 
             value={password} 
             onChange={(e) =>setPassword(e.target.value)}/>
            <br>
            </br>
            <button className="btn btn-primary mb-3"
             type="button" onClick={onSubmit}>Register New User</button>
        
     </div>
  );
};

export default Register;