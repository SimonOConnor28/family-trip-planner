import firebase from "./firebase";
import { getDatabase, onValue, ref, push, remove } from "firebase/database";
import { useState, useEffect } from "react";

const Tuesday = () => {
  const [tuesdayItems, setTuesdayItems] = useState([]);
  const [userItemTuesday, setUserItemTuesday] = useState("");

  useEffect(() => {
    //variable that hold database detail
    const database = getDatabase(firebase);
    const dbRef = ref(database, "/tuesday");

    onValue(dbRef, (response) => {
      const newState = [];

      const data = response.val();

      for (let key in data) {
        newState.push({ ...data[key], key: key });
      }
      setTuesdayItems(newState);
    });
  }, []);

  const handleInputChange = (event) => {
    setUserItemTuesday(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();

    const database = getDatabase(firebase);
    const dbRef = ref(database, "/tuesday");
    push(dbRef, { item: userItemTuesday });

    setUserItemTuesday("");
  };

  const handleRemoveClick = (itemKey) => {
    const database = getDatabase(firebase);
    const dbRef = ref(database, `/tuesday/${itemKey}`);
    remove(dbRef);
  };
  return (
    <div className="tuesBackground sectionSpace">
      <div className="wrapper">
        <div>
          <h2>
            <i className="fa-solid fa-tents"></i>Tuesday
            <i className="fa-solid fa-tents"></i>
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
              value={userItemTuesday}
            />
            <button className="btnAdd" onClick={handleClick}>
              Add to list
            </button>
          </div>
        </form>
        <ul>
          {/* mapping through the array in state  */}
          {tuesdayItems.map((item) => {
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

export default Tuesday;