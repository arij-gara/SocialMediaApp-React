import "./register.css";
import{Link} from 'react-router-dom'
import {useRef} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
export default function Register() {
  let navigate = useNavigate();
  const email= useRef();
  const password= useRef();
  const username= useRef();
  const passwordagain= useRef();

  const handelclick= async (e) =>{
   e.preventDefault();
   if(password.current.value != passwordagain.current.value) {
    password.current.setCustomValidity('passwords dont match')
   } else{
    const user = {
      username : username.current.value,
      email : email.current.value,
      password :  password.current.value,
    }
    try{
      const res = await axios.post('http://localhost:8000/api/auth/register',user)
      navigate('login')
    }catch(err){
      console.log(err)
    }
  
   }
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">MYsocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handelclick}>
            <input placeholder="Username"ref= {username} required className="loginInput" />
            <input placeholder="Email" ref= {email} required type='email'className="loginInput" />
            <input placeholder="Password" ref= {password} required type='password' className="loginInput" />
            <input placeholder="Password Again" ref= {passwordagain} required type='password' className="loginInput" />
            <button className="loginButton" type='submit'>Sign Up</button>
            <Link  to='/login'>
            <button className="loginRegisterButton">
              Log into Account
            </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
