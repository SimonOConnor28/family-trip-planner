import firebase from "./firebase";
import { getDatabase, onValue, ref, push, remove } from "firebase/database";
import { useState, useEffect } from "react";

const Friday = () => {
  const [fridayItems, setFridayItems] = useState([]);
  const [userItemFriday, setUserItemFriday] = useState("");

  useEffect(() => {
    //variable that hold database detail
    const database = getDatabase(firebase);
    const dbRef = ref(database, "/friday");

    onValue(dbRef, (response) => {
      const newState = [];

      const data = response.val();

      for (let key in data) {
        newState.push({ ...data[key], key: key });
      }
      setFridayItems(newState);
    });
  }, []);

  const handleInputChange = (event) => {
    setUserItemFriday(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();

    const database = getDatabase(firebase);
    const dbRef = ref(database, "/friday");
    push(dbRef, { item: userItemFriday });

    setUserItemFriday("");
  };

  const handleRemoveClick = (itemKey) => {
    const database = getDatabase(firebase);
    const dbRef = ref(database, `/friday/${itemKey}`);
    remove(dbRef);
  };
  return (
    <div className="tuesBackground sectionSpace">
      <div className="wrapper">
        <div>
          <h2 className="torch">
            <i className="fa-solid fa-champagne-glasses"></i>Friday
            <i className="fa-solid fa-champagne-glasses"></i>
          </h2>
        </div>
        <form action="submit">
          <div className="flex">
            <label htmlFor="newItem"></label>
            <input
              type="text"
              id="newItem"
              placeholder="Add Item here"
              onChange={handleInputChange}
              value={userItemFriday}
            />
            <button className="btnAdd" onClick={handleClick}>
              Add to list
            </button>
          </div>
        </form>
        <ul>
          {/* mapping through the array in state  */}
          {fridayItems.map((item) => {
            return (
              <li key={item.key}>
                {item.item}
                <button
                  className="removeBtn"
                  onClick={() => handleRemoveClick(item.key)}
                >
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

export default Friday;
