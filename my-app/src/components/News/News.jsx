import React, { useState, useEffect } from "react";
import MyPostContainer from "../Profile/Post/MyPostContainer";
import s from "./News.module.css";

function News() {
  const [community, setCommunity] = useState([]);
  const [users, setUsers] = useState([]);

  const [communityNews, setCommunityNews] = useState([]);
  const [usersNews, setUsersNews] = useState([]);
  // const [newsAll, setNews] = useState([]);

  let newsCommunity = [];
  let newsUsers = [];
  let news = [];
  useEffect(() => {
    fetch(
      `https://63600b083e8f65f283c242dc.mockapi.io/socialnetwork/community/`
    )
      .then((res) => res.json())
      .then((data) => setCommunity(data));

    fetch(`https://63600b083e8f65f283c242dc.mockapi.io/socialnetwork/users/`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
 
  useEffect(() => {
    if (users ) {
      newsUsers = users.map((user) => user.posts.pop());
      console.log("users");
      setUsersNews(newsUsers);
    }
  },[users]);

  useEffect(() => {
    if (community ) {
      newsCommunity = community.map((community) => community.posts.pop());
      console.log("community");
      setCommunityNews(newsCommunity);
    }
  },[community]);

  console.log(communityNews);
  console.log(usersNews);
  news=[...communityNews,...usersNews];
  console.log(news);

  const elements = news.map((item) => {
    const { id, ...itemProps } = item;
    return <MyPostContainer key={id} {...itemProps} />;
  });
  return (
    <div>
      <div className={s.new}>
        <ul>{elements}</ul>
      </div>
    </div>
  );
}

export default News;
