import firebase from "./firebase";
import { getDatabase, onValue, ref, push } from "firebase/database";
import { useState, useEffect } from "react";

const Wednesday = () => {
  const [wednesdayItems, setWednesdayItems] = useState([]);
  const [userItemWednesday, setUserItemWednesday] = useState("");

  useEffect(() => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);

    onValue(dbRef, (response) => {
      const newState = [];

      const data = response.val([]);

      for (let key in data) {
        newState.push(data[key]);
      }
      setWednesdayItems(newState);
    });
  }, []);

  const handleInputChange = (event) => {
    setUserItemWednesday(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();

    const database = getDatabase(firebase);
    const dbRef = ref(database);

    push(dbRef, { day: "wednesday", item: userItemWednesday });

    setUserItemWednesday("");
  };

  return (
    <div className="wednesBackground sectionSpace">
      <div className="wrapper">
        <h2>Wednesday</h2>
        <form action="submit">
          <div className="flex">
            <label htmlFor="newItem"></label>
            <input
              type="text"
              id="newItem"
              placeholder="Add what you are bringing here"
              onChange={handleInputChange}
              value={userItemWednesday}
            />
            <button onClick={handleClick}>Add Item here</button>
          </div>
        </form>
        <div>
          <ul>
            {wednesdayItems
              .filter((item) => item.day === "wednesday")
              .map((item) => {
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

export default Wednesday;
