import React,{useState} from "react";
import { Routes, Route} from "react-router-dom";
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Communities from "./components/Сommunities/Communities";
import Friends from "./components/Friends/Friends";
import News from "./components/News/News";
import MyProfile from "./components/Profile/MyProfile";
import UserProfile from "./components/Profile/UserProfile";
import Community from "./components/Сommunities/Community/Community";
import People from "./components/People/People";
import MyCommunities from "./components/Сommunities/MyCommunities";
import Login from "./Login/Login";
import CommunitiesManagement from "./components/Сommunities/CommunitiesManagement/CommunitiesManagement";
const App = (props) => {


  const[path,setPath]=useState('ok');
  const[login,setLogin]=useState(0)

  const onChangePath=(way)=>{
    if(way==='/users'){
      setPath('my_friends');
      console.log(way);
    } 
    if(way==='/users/find'){
      setPath('users');
      console.log(way);
    }
    if(way==='/communities'){
      setPath('my_communities');
      console.log(way);
    }
    if(way==='/communities/find'){
      setPath('community');
      console.log(way);
    }
  }
const onLogin=()=>{
    setLogin(1);
}
const onExit=()=>{
  setLogin(0);
}
let window;
if(login===1){
  window=   <div className="app-wrapper">
  <Header  onExit={()=>onExit()}/>
  <Navbar />
  <div className="app-wrapper-content">
    <Routes>
      <Route path='/profile' element={<MyProfile/>} />
      <Route path='/communities' element={<MyCommunities onChangePath={onChangePath} action={'unsubscribe'}/>} />
      <Route path='/communities/:id' element={<Community path={path}/>} /> 
      <Route path='/communities/find' element={<Communities onChangePath={onChangePath} action={'subscribe'}/>} /> 
      <Route path='/users' element={<Friends onChangePath={onChangePath}  action={'unsubscribe'}/>} />
      <Route path='/users/:id' element={<UserProfile path={path}/>} /> 
      <Route path='/users/find' element={<People onChangePath={onChangePath}  action={'subscribe'}/>} /> 
      <Route path='/news' element={<News/>} />
      <Route path='/communities/management' element={<CommunitiesManagement/>}/>
    </Routes>
  </div>
</div>
}else window= <Login onLogin={()=>onLogin()}/>
  return (
    <>
      {/*<Login/>
       <div className="app-wrapper">
        <Header out={props.out}/>
        <Navbar />
        <div className="app-wrapper-content">
          <Routes>
            <Route path='/profile' element={<MyProfile/>} />
            <Route path='/communities' element={<MyCommunities onChangePath={onChangePath} action={'unsubscribe'}/>} />
            <Route path='/communities/:id' element={<Community path={path}/>} /> 
            <Route path='/communities/find' element={<Communities onChangePath={onChangePath} action={'subscribe'}/>} /> 
            <Route path='/users' element={<Friends onChangePath={onChangePath}  action={'unsubscribe'}/>} />
            <Route path='/users/:id' element={<UserProfile path={path}/>} /> 
            <Route path='/users/find' element={<People onChangePath={onChangePath}  action={'subscribe'}/>} /> 
            <Route path='/news' element={<News/>} />
            
          </Routes>
        </div>
      </div>  */}
      {window}
    </>
  );
}

export default App;
