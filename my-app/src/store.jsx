import React, {useState,useEffect} from "react";
function DataFromServer(){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
useEffect(() => {
  fetch("https://63600b083e8f65f283c242dc.mockapi.io/socialnetwork/users")
    .then(res => res.json())
    .then(
      (result) => {
        setIsLoaded(true);
        setItems(result);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
}, [])

if (error) {
  return <div>Ошибка: {error.message}</div>;
} else if (!isLoaded) {
  return <div>Загрузка...</div>;
} else {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.name} 
          <img alt="" src={item.avatar}/>
        </li>
      ))}
    </ul>
  );
}
}

export default DataFromServer;