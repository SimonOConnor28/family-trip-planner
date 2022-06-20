import firebase from "./firebase";
import { getDatabase, onValue, ref, push } from "firebase/database";
import { useState, useEffect } from "react";

const Sunday = () => {
  const [sundayItems, setSundayItems] = useState([]);
  const [userItemSunday, setUserItemSunday] = useState("");

  useEffect(() => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);

    onValue(dbRef, (response) => {
      const newState = [];

      const data = response.val([]);

      for (let key in data) {
        newState.push(data[key]);
      }
      setSundayItems(newState);
    });
  }, []);

  const handleInputChange = (event) => {
    setUserItemSunday(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();

    const database = getDatabase(firebase);
    const dbRef = ref(database);

    push(dbRef, { day: "sunday", item: userItemSunday });

    setUserItemSunday("");
  };

  return (
    <div className="sundayBackground sectionSpace">
      <div className="wrapper">
        <h2>Sunday</h2>
        <form action="submit">
          <div className="flex">
            <label htmlFor="newItem"></label>
            <input
              type="text"
              id="newItem"
              placeholder="Add what you are bringing here"
              onChange={handleInputChange}
              value={userItemSunday}
            />
            <button onClick={handleClick}>Add Item here</button>
          </div>
        </form>
        <div>
          <ul>
            {sundayItems
              .filter((item) => item.day === "sunday")
              .map((item) => {
                console.log(item, item.key)
                return (
                  <li key={item.item}>
                    {item.item}
                    <button className="delete">
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sunday;
