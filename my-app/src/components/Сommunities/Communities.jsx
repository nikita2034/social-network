import React, { useState, useEffect } from "react";
import Friend from "../Friends/Friend/Friend";
import s from "../Friends/Friends.module.css";


const Communities = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [community, setCommunitu] = useState({});

  const [newUsers, setNewUsers] = useState([]);

  let communities = [];
  let path=window.location.pathname;




  useEffect(() => {
    console.log("Идет запрос");

    props.onChangePath(path);
    console.log(window.location.pathname);
    fetch("https://63600b083e8f65f283c242dc.mockapi.io/socialnetwork/community")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
   
  }, [newUsers]);

//post
useEffect(() => {

  if (community !== 0) {
    function addUser() {
      fetch(
        "https://63600b083e8f65f283c242dc.mockapi.io/socialnetwork/my_communities",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(community),
        }
      );
    }
    addUser();
    console.log("Добавление произошло");
  }
}, [community]);


  if (error) {
    console.log(error.message);
  } else if (!isLoaded) {
  } else {
      communities = items.map((item) => (
        <Friend
          key={item.id}
          name={item.name}
          img={item.avatar}
          path={`/communities/${item.id}`}
          id={item.id}
          onId={() => onAddId(item.id)}
          action={props.action}
        />
      ));
    }
  
  const onAddId = (ID) => {
    let community=items.find((item)=>{
      if(item.id===ID){
        return item;
      }
    })
    console.log(community);
    setCommunitu(community);
  };

  return (
    <div className={s.friends}>
      <div className={s.flex}>
        <div className={s.block}>
          <div className={s.name}>Communities</div></div>
      </div>
      <ul>{communities}</ul>
    </div>
  );
};

export default Communities;