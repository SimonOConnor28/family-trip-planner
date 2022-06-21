import firebase from "./firebase";
import { getDatabase, onValue, ref, push, remove } from "firebase/database";
import { useState, useEffect } from "react";

const Sunday = () => {
  const [sundayItems, setSundayItems] = useState([]);
  const [userItemSunday, setUserItemSunday] = useState("");

  useEffect(() => {
    //variable that hold database detail
    const database = getDatabase(firebase);
    const dbRef = ref(database, "/sunday");

    onValue(dbRef, (response) => {
      const newState = [];

      const data = response.val();

      for (let key in data) {
        newState.push({ ...data[key], key: key });
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
    const dbRef = ref(database, "/sunday");
    push(dbRef, { item: userItemSunday });

    setUserItemSunday("");
  };

  const handleRemoveClick = (itemKey) => {
    const database = getDatabase(firebase);
    const dbRef = ref(database, `/sunday/${itemKey}`);
    remove(dbRef);
  };
  return (
    <div className="sundayBackground sectionSpace">
      <div className="wrapper">
        <div>
          <h2 className="torch">Sunday</h2>
        </div>
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
        <ul>
          {/* mapping through the array in state  */}
          {sundayItems.map((item) => {
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

export default Sunday;
