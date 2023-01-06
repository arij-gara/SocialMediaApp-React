import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import{Link} from 'react-router-dom'
import {useContext} from'react'
import {Authcontext} from '../../context/authcontext'
const PF = process.env.REACT_APP_PUBLIC_FOLDER
export default function Topbar() {
  const{user}=useContext(Authcontext)
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to ='/' style={{textDecoration:'none'}}>
        <span className="logo">MYsocial</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <Link to= '/messanger' >
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          </Link>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
        <img src={user.profilepic ? PF+user.profilepic : PF+'/person/noavatar.png'} alt="" className="topbarImg"/>
        </Link>
      </div>
    </div>
  );
}
