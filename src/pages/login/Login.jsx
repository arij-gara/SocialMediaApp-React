import "./login.css";
import {useRef, useContext} from 'react'
import {Logincall} from '../../apicalls'
import { Authcontext } from "../../context/authcontext";
export default function Login() {
  const email= useRef();
  const password= useRef();
 const {user,isFetching, dispatch}= useContext(Authcontext)
  const handelsubmit=(e) => {
  e.preventDefault();
  Logincall({email:email.current.value, password :password.current.value}, dispatch);
  }
  console.log(user)
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
          <form className="loginBox" onSubmit={handelsubmit}>
            <input placeholder="Email" type='email' required className="loginInput" ref={email}/>
            <input placeholder="Password" type='password' required className="loginInput" ref={password} />
            <button className="loginButton">Log In</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
