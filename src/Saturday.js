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

  return (
    <div>
      <h2>Saturday</h2>
      <form action="submit">
        <div className="flex">
          <label htmlFor="newItem">
          </label>
          <input
            type="text"
            id="newItem"
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
  );
};

export default Saturday;
