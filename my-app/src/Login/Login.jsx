import React, { useState, useEffect } from "react";
import s from "./Login.module.css";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
function Login(props) {
  // const [login, setLogin] = useState(false);
  // const [Login, setLog] = useState("");
  // const [Password, setPassword] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState();
  const [imageURL, setImageURL] = useState();
  const[change,setChange]=useState(0);
  useEffect(() => {
    let user={
      name:name,
      avatar:imageURL,
      login:login,
      password:password,
      posts:[],
      id:45
    }
    if (change!== 0) {
      function addUser() {
        fetch(
          "https://63600b083e8f65f283c242dc.mockapi.io/socialnetwork/users",
          {
            method: "POST",
            headers: {
               "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(user),
          }
        );
      }
      addUser();
      console.log("Добавление произошло");
    }
  }, [change]);

  const onChange = () => {
    setChange(200);
    console.log('изменил');
    handleClose();
  };
  // const update = (value) => {
  //   setLogin(value);
  //   console.log(value);
  // };

  // if (login === true && Login === "login" && Password === "password") {
  //   return <Link to="/profile" />;
  // }

  const onName = (e) => {
    setName(e);
  };
  const onLogin = (e) => {
    setLogin(e);
  };
  const onPassword = (e) => {
    setPassword(e);
  };
  const onSubmit=()=>{
    props.onLogin();
  }
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

    <div className={s.enter}>
     <div className={s.login}>
      <form>
        <div className={s.header}>Sign In</div>
        <div className={s.flex}>
          <div>
            <label className={s.text}>Login</label>
          </div>

          <input
            // type="email"
            className={s.input1}
            placeholder="Enter email"
            // onChange={(e) => setLog(e.target.value)}
          />
        </div>
        <div className={s.flex}>
          <div>
            <label className={s.text}>Password</label>
          </div>
          <input
            type="password"
            className={s.input2}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3"></div>
        <div className="d-grid">
          <Button variant="primary" onClick={handleShow} className={s.button}>Registration</Button>
         <Link to='/profile'><button onClick={() => onSubmit()} className={s.button}>
           Login
          </button></Link> 
        </div>
      </form>

      <>
        <Modal show={show} onHide={handleClose} className={s.modal}>      
          <Modal.Body closeButton>
          <form className={s.form}>
              <h2 className={s.h2}>Registration</h2>
              <div className={s.box}>
                <label className={s.label} htmlFor="name">Name:</label>
                <input onChange={(e)=>onName(e.target.value)} className={s.inputName} id="name" name="name" type="text" />
              </div>
              <div  className={s.box}>
                <label className={s.label} htmlFor="avatar">Avatar:</label>
                <input onChange={handleOnChange} className={s.inputAvatar} id="avatar" name="avatar" type="file" accept="image/*,.png,.jpg,.gif,.web" />
              </div>
              <div  className={s.box}>
                <label className={s.label} htmlFor="login">Login:</label>
                <input onChange={(e)=>onLogin(e.target.value)} className={s.inputLogin} id="login" name="loginRegistration"  />
              </div>
              <div  className={s.box}>
                <label className={s.label} htmlFor="password">Password:</label>
                <input onChange={(e)=>onPassword(e.target.value)} className={s.inputPassword} id="passwordRegistration" name="passwordRegistration" type="password" />
              </div>
              </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary"className={s.buttonCreate} onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary"className={s.buttonClose}  onClick={()=>onChange()}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div> 
    </div>  
  );
}
export default Login;
