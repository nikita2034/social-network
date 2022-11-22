import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import Profile from "./Profile";

const UserProfile = ({path}) => {
    const {id}=useParams();
    const [user, setUser]=useState({});
    console.log(path);
    useEffect(()=>{
      fetch(`https://63600b083e8f65f283c242dc.mockapi.io/socialnetwork/${path}/${id}`)
          .then(res=>res.json())
          .then(data=>setUser(data))
        },[id,path]);
    
    return(  
       <Profile userId={user.id} userName={user.name} userAvatar={user.avatar} userPosts={user.posts}/>
    )
};
export default UserProfile;