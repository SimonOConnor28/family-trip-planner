import firebase from "./firebase";
import { getDatabase, onValue, ref, push } from "firebase/database";
import { useState, useEffect } from "react";

const Thursday = () => {
  const [thursdayItems, setThursdayItems] = useState([]);
  const [userItemThursday, setUserItemThursday] = useState("");

  useEffect(() => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);

    onValue(dbRef, (response) => {
      const newState = [];

      const data = response.val([]);

      for (let key in data) {
        newState.push(data[key]);
      }
      setThursdayItems(newState);
    });
  }, []);

  const handleInputChange = (event) => {
    setUserItemThursday(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();

    const database = getDatabase(firebase);
    const dbRef = ref(database);

    push(dbRef, { day: "thursday", item: userItemThursday });

    setUserItemThursday("");
  };

  return (
    <div className="thursBackground sectionSpace">
      <div className="wrapper">
        <h2>Thursday</h2>
        <form action="submit">
          <div className="flex">
            <label htmlFor="newItem"></label>
            <input
              type="text"
              id="newItem"
              placeholder="Add what you are bringing here"
              onChange={handleInputChange}
              value={userItemThursday}
            />
            <button onClick={handleClick}>Add Item here</button>
          </div>
        </form>
        <div>
          <ul>
            {thursdayItems
              .filter((item) => item.day === "thursday")
              .map((item) => {
                return (
                  <li key={item.key}>
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

export default Thursday;
