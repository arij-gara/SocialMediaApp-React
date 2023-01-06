import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import axios from  'axios'
import  {useParams} from 'react-router'
import{useState, useEffect} from 'react'
  export default function Profile() {
  const[user, setuser]=useState({})
  const username = useParams().username
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  
  useEffect ( ()=>{
    const fetchuser = async () =>{
   const res=  await axios.get(`http://localhost:8000/api/users?username=${username}`)
   setuser(res.data)
   console.log(res.data)
    }
    fetchuser()
  },[username])
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src= {user.coverpic  ?PF+user.coverpic : PF+'post/1.jpeg'}
                alt=""
              />
              <img
                className="profileUserImg"
                src={ user.profilepic ? PF+ user.profilepic : PF+"/person/noavatar.png"}
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.description }</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={user.username} />
            <Rightbar user={user}/>
          </div>
        </div>
      </div>
    </>
  );
}
