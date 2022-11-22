import React, { useState, useEffect } from "react";
import Friend from "../../Friends/Friend/Friend";
import s from "../../Friends/Friend/Friend";
import { Link } from "react-router-dom";
import { Button } from "bootstrap";

const CommunitiesManagement = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [ID, setId] = useState(0);
  const [addID, setAddId] = useState(0);
  const [fetchDel, setStatus] = useState("null");
  const [newUsers, setNewUsers] = useState([]);
  let friends = [];
//   let path=window.location.pathname;
  
  
  useEffect(() => {
    console.log("Идет запрос");
   
    // props.onChangePath(path);
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
    setStatus("null");
  }, [newUsers]);

  useEffect(() => {
    console.log("Идет запрос");
    setTimeout(() => {
      console.log(fetchDel);
      fetch(
        "https://63600b083e8f65f283c242dc.mockapi.io/socialnetwork/my_friends?p=1&l=3"
      )
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
    }, 300);
    setStatus("null");
  }, [fetchDel]);

  useEffect(() => {
    if (ID !== 0) {
      function deletePost(id) {
        fetch(
          `https://63600b083e8f65f283c242dc.mockapi.io/socialnetwork/my_friends/${id}`,
          { method: "DELETE" }
        );
        setStatus("Delete successful");
      }
      deletePost(ID);
    }
    console.log(ID);
  }, [ID]);

  if (error) {
    console.log(error.message);
  } else if (!isLoaded) {
  } else {
      friends = items.map((item) => (
        <Friend
          key={item.id}
          name={item.name}
          img={item.avatar}
          path={`/users/${item.id}`}
          id={item.id}
          onId={() => onId(item.id)}
        //   action={props.action}
        />
      
      )); 
      
  }

  const onId = (id) => {
    setId(id);
    console.log(ID);
  };


  return (
    <div className={s.friends}>
      <div className={s.flex}>
        <div className={s.block}>
          <div className={s.name}>My friends</div></div>
        <Link to="/users/find">
         
          <button className={s.button}>
            users search
          </button>

        </Link>
      </div>
      <ul>{friends}</ul>
    </div>
  );
};

export default CommunitiesManagement;
