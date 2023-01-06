import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Messanger from './pages/messanger/messanger'
import{useContext} from 'react'
import {Authcontext} from './context/authcontext'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
function App() {
  const {user} = useContext(Authcontext)
  return(
  
  <BrowserRouter>
  <Routes>
  <Route path="/"  element={ user?<Home /> : <Register />} />
  <Route path="/login" element={user ? <Home/> :<Login />}/>
  <Route path="/" element={<Home />}/>
  <Route path="/register" element={user ? <Home/> :<Register />}/>
  <Route path="/profile/:username" element={<Profile />}/>
  <Route path="/messanger" element={<Messanger />}/>
  </Routes>
  </BrowserRouter>
  
  )
}

export default App;
