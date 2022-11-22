import React, { useState, useEffect } from "react";
import s from "./Community.module.css";
import Friend from "../Friends/Friend/Friend";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const MyCommunities = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [ID, setId] = useState(0);
  const [fetchDel, setStatus] = useState("null");
  const [newCommunities, setNewCommunities] = useState([]);
  const [change, setChange] = useState(0);
  const [image, setImage] = useState();
  const [imageURL, setImageURL] = useState();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [nameCommunity,setName]=useState('');
  const [descriptionCommunity,setDesription]=useState('');

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
    setStatus("null");
  }, [newCommunities]);

  useEffect(() => {
    console.log("Идет запрос");
    setTimeout(() => {
      console.log(fetchDel);
      fetch(
        "https://63600b083e8f65f283c242dc.mockapi.io/socialnetwork/my_communities?p=1&l=3"
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
          `https://63600b083e8f65f283c242dc.mockapi.io/socialnetwork/community/${id}`,
          { method: "DELETE" }
        );
        setStatus("Delete successful");
      }
      deletePost(ID);
    }
    console.log(ID);
  }, [ID]);

  //post
  useEffect(() => {
    let community={
      name:nameCommunity,
      avatar:imageURL,
      // avatar: avatarCommunity,
      // description:descriptionCommunity,
      posts:[],
      subscribes:0,
      id:45
    }
    if (change!== 0) {
      function addUser() {
        fetch(
          "https://63600b083e8f65f283c242dc.mockapi.io/socialnetwork/community",
          {
            method: "POST",
            headers: {
               "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(community),
          }
        );
      }
      addUser();
      console.log("Добавление произошло");
    }
  }, [change]);



  if (error) {
    // return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    // return <div>Загрузка...</div>;
  } else {
      communities = items.map((item) => (
        <Friend
          key={item.id}
          name={item.name}
          img={item.avatar}
          path={`/communities/${item.id}`}
          id={item.id}
          onId={() => onId(item.id)}
          action={props.action}
        />
      ));
  }

  const onId = (id) => {
    setId(id);
    console.log(ID);
  };

  const onChange = () => {
    setChange(200);
    console.log('изменил');
    handleClose();
  };


  const onNameCommunity = (name) => {
    setName(name);
    console.log(nameCommunity);
  };
  const onDescriptionCommunity = (description) => {
    setDesription(description);
    console.log(descriptionCommunity);
  };

  const fileReader = new FileReader();
  console.log(fileReader);
  fileReader.onloadend = () => {
    setImageURL(fileReader.result);
  };

  const handleOnChange = (event) => {
    event.preventDefault();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      setImage(file.name);
      fileReader.readAsDataURL(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files.length) {
      setImage(event.dataTransfer.files[0]);
      fileReader.readAsDataURL(event.dataTransfer.files[0]);
    }
  };

  const handleDragEmpty = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
 console.log(imageURL);
 console.log(image);

  return (
    <>
      <div className={s.flex}>
        <div className={s.columm}>
          <div className={s.block}>
            <div className={s.name}>My Communities</div></div>
          
          
          <ul>{communities}</ul>
        </div>
        <div className={s.buttons}>
          <Link to='/communities/find'>
          
            <button className={s.button} >
              Сommunity search
            </button>
          </Link>
          <Link to='/communities/management'><button className={s.button}>        
             Community management
            </button></Link>
          <Button variant="primary" onClick={handleShow} className={s.button}>
            Create community
          </Button>
        </div>

        {/* <div class="fixed-overlay"> */}
          <Modal show={show} onHide={handleClose} className={s.modal}>
          <Modal.Body closeButton>
            <form >
              <h2 className={s.h2}>Create community</h2>
              <div className={s.box}>
                <label className={s.label} htmlFor="name">Название сообщества:</label>
                <input onChange={(e)=>onNameCommunity(e.target.value)} className={s.input} id="name" name="name" type="text" />
              </div>
              <div  className={s.box}>
                <label className={s.label} htmlFor="email">Описание сообщества:</label>
                <input onChange={(e)=>onDescriptionCommunity(e.target.value)} className={s.input} id="description" name="description" type="text" />
              </div>
              <div  className={s.box}>
                <label className={s.label} htmlFor="amount">Фото сообщества:</label>
                <input onChange={handleOnChange} id="avatar" name="avatar" type="file" accept="image/*,.png,.jpg,.gif,.web"/>
              </div>
              </form>
              </Modal.Body>
              <Modal.Footer className={s.footer}>
              <Button onClick={handleClose} className={s.buttonCreate}>Close</Button>
              <Button onClick={()=>onChange()} className={s.buttonClose}>Create</Button>
              
              </Modal.Footer>
          </Modal>
        </div>
      {/* </div> */}
    </>
  );
};

export default MyCommunities;
