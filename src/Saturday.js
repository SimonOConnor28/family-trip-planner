import firebase from "./firebase";
import { getDatabase, onValue, ref, push } from "firebase/database";
import { useState, useEffect } from "react";

const Saturday = () => {
  const [saturdayItems, setSaturdayItems] = useState([]);
  const [userItemSaturday, setUserItemSaturday] = useState("");

  useEffect(() => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);

    onValue(dbRef, (response) => {
      const newState = [];

      const data = response.val([]);

      for (let key in data) {
        newState.push(data[key]);
      }
      setSaturdayItems(newState);
    });
  }, []);

  const handleInputChange = (event) => {
    setUserItemSaturday(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();

    const database = getDatabase(firebase);
    const dbRef = ref(database);

    push(dbRef, { day: "saturday", item: userItemSaturday });

    setUserItemSaturday("");
  };

  const removeClickHandle = (event) => {

  }

  return (
    <div className="saturdayBackground sectionSpace">
      <div className="wrapper">
        <h2>Saturday</h2>
        <form action="submit">
          <div className="flex">
            <label htmlFor="newItem"></label>
            <input
              type="text"
              id="newItem"
              placeholder="Add what you are bringing here"
              onChange={handleInputChange}
              value={userItemSaturday}
            />
            <button onClick={handleClick}>Add Item here</button>
          </div>
        </form>
        <div>
          <ul>
            {saturdayItems
              .filter((item) => item.day === "saturday")
              .map((item) => {
                return (
                  <li key={item.item}>
                    {item.item}
                    <button onClick={removeClickHandle} className="delete">
                      remove
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

export default Saturday;
