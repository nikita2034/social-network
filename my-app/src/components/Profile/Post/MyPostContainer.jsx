import React, { useState, useEffect } from "react";
import s from "./MyPostContainer.module.css";
import { RiStarSFill } from "@react-icons/all-files/ri/RiStarSFill";
import { RiStarSLine } from "@react-icons/all-files/ri/RiStarSLine";
import { RiChat4Line } from "@react-icons/all-files/ri/RiChat4Line";
import { RiChat4Fill } from "@react-icons/all-files/ri/RiChat4Fill";
const MyPostContainer = (props) => {
  const { postImg, postText, onDelete } = props;
  const [count, setCount] = useState(0);
  const [like, setLike] = useState(false);
  const [chat, setChat] = useState(false);
  const [showComments, setShow] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(["1"]);
  const [flag, setFlag] = useState(false);

  let commenttext;
  const onLike = (like) => {
    if (like === false) {
      setLike(true);
      setCount(count + 1);
    } else {
      setLike(false);
      setCount(count - 1);
    }
  };

  let stars;
  if (like === false) {
    stars = <RiStarSLine onClick={() => onLike(like)} className={s.star} />;
  }
  if (like === true) {
    stars = <RiStarSFill onClick={() => onLike(like)} className={s.star} />;
  }

  const onChat = (chat) => {
    if (chat === false) {
      setChat(true);
      setShow(true);
    } else {
      setChat(false);
      setShow(false);
    }
  };

  const addComment = () => {
   commenttext = comments.map((item) => <li className={s.li}>{item}</li>);
  };

  const onAdd = () => {
  
    comments.push(comment);
    console.log(comments);
    setFlag(flag+1);
    setComment('');
  };

  const onComment = (e) => {
    setComment(e);
  };
   let chatIcon;

  if (chat === false) {
    chatIcon = (
      <RiChat4Line onClick={() => onChat(chat)} className={s.iconComment} />
    );
  }
 
 if (chat === true && showComments === true) {
    chatIcon = (
      <RiChat4Fill onClick={() => onChat(chat)} className={s.iconComment} />
    );
   addComment();
  }

useEffect(()=>{
   addComment();
},[flag]);

  return (
    <div className={s.post}>
      <div className={s.post_text}>{postText}</div>
      <div>
        <img src={postImg} alt="" className={s.img} />
      </div>
      <div className={s.flex}>
        <div>{stars}</div>
        <div className={s.count}>{count}</div>
        <div>{chatIcon}</div>
      </div>
      <ul>{commenttext}</ul>
      <div className={s.flex}>
        <input
          value={comment}
          onChange={(e) => onComment(e.target.value)}
          type="text"
          className={s.comments}
        />
        <button onClick={() => onAdd()} className={s.button}>
          add
        </button>
      </div>
    </div>
  );
};

export default MyPostContainer;
