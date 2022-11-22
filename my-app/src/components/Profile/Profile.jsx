// import React, { useState,useEffect} from "react";
import MyPostContainer from "./Post/MyPostContainer";
import s from "./Profile.module.css";

const Profile = ({userId,userName,userAvatar,userPosts}) => {
  
  
  console.log(userPosts);
  let posts=[];
  if(userPosts){
    posts=userPosts.map(post=>(
    <MyPostContainer key={userId}
      postText={post.postText} postImg={post.postPicture}/>  
    ))
  }

  return (
   
    <div className={s.profileWrapper}>
      <div >
        <img
          alt="profilePhoto"
          src={userAvatar}
          className={s.userPhoto}
        />
      </div>
      <div className={s.userInformation}>
           <div className={s.userName}>
             {userName}
           </div>    
      </div>
      <div className={s.userActivity}>
      </div>
       <div className={s.usetPosts}>
        <div className={s.block}>
           <label className={s.posts}>Posts</label>
        </div>
        
         <ul>{posts}</ul>
       </div>
      </div>
  );
};

export default Profile;
