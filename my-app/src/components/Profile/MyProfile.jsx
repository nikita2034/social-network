import React, { useState,useEffect} from "react";
import MyPostContainer from "./Post/MyPostContainer";
import Profile from "./Profile";
import s from "./Profile.module.css";

const MyProfile = ({userId,userName,userAvatar,userPosts}) => {
  
  const [postText, setPostText] = useState('');

  const [image, setImage] = useState();
  const [imageURL, setImageURL] = useState();

  const [addID, setAddId] = useState(0);
  const [photo,setPhoto]=useState(null);
  
  console.log(postText);
  let posts=[];
  const formData=new FormData();

  const [user, setUser]=useState({});

    useEffect(()=>{
      fetch(`https://63600b083e8f65f283c242dc.mockapi.io/socialnetwork/users/24`)
          .then(res=>res.json())
          .then(data=>setUser(data))
    },[]);


    console.log({user});
  if(user.posts){
    posts=user.posts.map(post=>(
    <MyPostContainer key={userId}
      postText={post.postText} postImg={post.postPicture}/>  
    ))
  }

  useEffect(() => {

      //Это работает
    let posts=
      [{
      postText:postText,
      postPicture:imageURL
      }];

    if (addID !== 0) {
      function addPost() {
        fetch(
          "https://63600b083e8f65f283c242dc.mockapi.io/socialnetwork/my_friends/3",
          {
            method: "PUT",
            headers: {
               "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({posts:posts}),
          }
        );
         console.log(formData.get);
      }
      addPost();
    
      console.log("Запрос ушел");
    }
  }, [addID]);
  

  const onAddId = (id) => {
    setAddId(id);
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
    <Profile userId={0}
             userName={"Nikita"} 
             userAvatar={"https://www.iguides.ru/upload/medialibrary/9f8/9f8fdff471b7d281f81f694c100b5adc.png"}
             userPosts={[]}/>
     
       <div className={s.form}>
       <input onChange={(e)=>setPostText(e.target.value)} type="text" className={s.comments}/>
        
      <div className={s.inputBlock}>
        <input
          id="file-loader-button"
          type="file"
          onChange={handleOnChange}
          className={s.inputForm}
        />
      </div>

      <button className={s.button} onClick={()=>onAddId(5)}>Add</button> 
       </div>  

       <div className={s.usetPosts}>
         <ul>{posts}</ul>
       </div>
      </>
  );
};

export default MyProfile;
