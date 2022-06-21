import firebase from "./firebase";
import { getDatabase, onValue, ref, push, remove } from "firebase/database";
import { useState, useEffect } from "react";

const Saturday = () => {
  const [saturdayItems, setSaturdayItems] = useState([]);
  const [userItemSaturday, setUserItemSaturday] = useState("");

  useEffect(() => {
    //variable that hold database detail
    const database = getDatabase(firebase);
    const dbRef = ref(database, "/saturday");

    onValue(dbRef, (response) => {
      const newState = [];

      const data = response.val();

      for (let key in data) {
        newState.push({ ...data[key], key: key });
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
    const dbRef = ref(database, "/saturday");
    push(dbRef, { item: userItemSaturday });

    setUserItemSaturday("");
  };

  const handleRemoveClick = (itemKey) => {
    const database = getDatabase(firebase);
    const dbRef = ref(database, `/saturday/${itemKey}`);
    remove(dbRef);
  };
  return (
    <div className="tuesBackground sectionSpace">
      <div className="wrapper">
        <div>
          <h2 className="torch">Saturday</h2>
        </div>
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
        <ul>
          {/* mapping through the array in state  */}
          {saturdayItems.map((item) => {
            return (
              <li key={item.key}>
                {item.item}
                <button onClick={() => handleRemoveClick(item.key)}>
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
