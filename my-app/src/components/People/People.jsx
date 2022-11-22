import React, { useState, useEffect } from "react";
import Friend from "../Friends/Friend/Friend";
import s from "../Friends/Friends.module.css";


const People = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  // const [ID, setId] = useState(0);
  const [user, setUser] = useState({});

  const [newUsers, setNewUsers] = useState([]);

  let users = [];
  let path=window.location.pathname;




  useEffect(() => {
    console.log("Идет запрос");
    props.onChangePath(path);
    console.log(window.location.pathname);

    fetch("https://63600b083e8f65f283c242dc.mockapi.io/socialnetwork/users")
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

  if (user !== 0) {
    function addUser() {
      fetch('https://63600b083e8f65f283c242dc.mockapi.io/socialnetwork/my_friends',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
          body: JSON.stringify(user)
         
        }
      );
    }
    
 console.log("Добавление произошло");
    addUser();
  }
}, [user]);

  if (error) {
    console.log(error.message);
  } else if (!isLoaded) {
  } else {
      users = items.map((item) => (
        <Friend
          key={item.id}
          name={item.name}
          img={item.avatar}
          path={`/users/${item.id}`}
          id={item.id}
          onId={() => onAddId(item.id)}
          action={props.action}
        />
      ));
    }
  

    const onAddId = (ID) => {
      let user=items.find((item)=>{
        if(item.id===ID){
          return item;
        }
      })
      console.log(user);
      setUser(user);
    };

  return (
    <div className={s.friends}>
      <div className={s.flex}>
        <div className={s.block}>
          <div className={s.name}>People</div></div>
      </div>
      <ul>{users}</ul>
    </div>
  );
};

export default People;