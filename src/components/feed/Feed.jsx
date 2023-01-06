import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from 'axios'
import {useEffect,useState} from  'react'


export default function Feed( {username}) {
  const[posts,setposts]= useState([])

   useEffect ( ()=>{
    const fetchposts = async () =>{
   const res= username
   ? await axios.get("http://localhost:8000/api/posts/profile/"+username)
   : await axios.get('http://localhost:8000/api/posts/timeline/62fd40af711b117aee62a047')
   setposts(res.data)
    }
    fetchposts()
  })
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share post={posts}/>
        {/* {posts.map((p) => (
          <Share key={p._id} post={p} /> ))} */}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
