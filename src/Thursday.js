import firebase from "./firebase";
import { getDatabase, onValue, ref, push, remove} from "firebase/database";
import { useState, useEffect } from "react";

const Thursday = () => {
  const [thursdayItems, setThursdayItems] = useState([]);
  const [userItemThursday, setUserItemThursday] = useState("");

  useEffect(() => {
    //variable that hold database detail
    const database = getDatabase(firebase);
    const dbRef = ref(database, "/thursday");

    onValue(dbRef, (response) => {
      const newState = [];

      const data = response.val();

      for (let key in data) {
        newState.push({ ...data[key], key: key });
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
    const dbRef = ref(database, "/thursday");
    push(dbRef, { item: userItemThursday });

    setUserItemThursday("");
  };

  const handleRemoveClick = (itemKey) => {
    const database = getDatabase(firebase);
    const dbRef = ref(database, `/thursday/${itemKey}`);
    remove(dbRef);
  };
  return (
    <div className="sectionSpace">
      <div className="wrapper">
        <div>
          <h2>
            <i className="fa-solid fa-person-hiking"></i>Thurday
            <i className="fa-solid fa-person-hiking"></i>
          </h2>
        </div>
        <form action="submit">
          <div className="flex">
            <label htmlFor="newItem"></label>
            <input
              type="text"
              id="newItem"
              placeholder="Add List item"
              onChange={handleInputChange}
              value={userItemThursday}
            />
            <button className="btnAdd" onClick={handleClick}>
              Add to list
            </button>
          </div>
        </form>
        <ul>
          {/* mapping through the array in state  */}
          {thursdayItems.map((item) => {
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
export default Thursday;
