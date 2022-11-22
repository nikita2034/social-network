import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import s from "./Community.module.css";
import MyPostContainer from "../../Profile/Post/MyPostContainer";

const Community = ({path}) => {
  const { id } = useParams();
  const [community, setCommunity] = useState({});
  let posts = [];
  useEffect(() => {
    fetch(
      `https://63600b083e8f65f283c242dc.mockapi.io/socialnetwork/${path}/${id}`
    )
      .then((res) => res.json())
      .then((data) => setCommunity(data));
  }, [id,path]);

  console.log({ community });

  if (community.posts) {
    posts = community.posts.map((post) => (
      <MyPostContainer
        key={community.id}
        postText={post.postText}
        postImg={post.postPicture}
      />
    ));
  }

  return (
    <div className={s.posts}>
      <div className={s.info}>
        <img src={community.avatar} alt="" className={s.communityPhoto} />
        <div className={s.block}>
          <div className={s.name}>{community.name}</div>
        </div>

        <button className={s.button}>subscribes</button>
       
      </div>
      
      <div className={s.usetPosts}>
        <ul className={s.usetPosts}>{posts}</ul>
      </div>
    </div>
  );
};

export default Community;
