import React,{useState} from "react";
import s from "./Friend.module.css";
import { Link } from "react-router-dom";
const Friend = (props) => {
  const { name, img, onId, path, id, action } = props;
  const [type,setType]=useState(action);

  function oplo(){
    onId();
    if(type==='unsubscribe'){
      setType('subscribe');
    }
    if(type==='subscribe'){
      setType('unsubscribe');
    }
  }
  return (
    <li className={s.user}>
      <Link key={id} to={path} className={s.a}>
        <div className={s.flex}>
          <img alt=" " src={img} className={s.userPhoto} />
          <div className={s.userName}>{name}</div>
        </div>
      </Link>
      <button onClick={oplo}  type="button" className={s.button}>
        {type}
      </button>
    </li>
  );
};

export default Friend;
