import firebase from "./firebase";
import { getDatabase, onValue, ref, push, remove } from "firebase/database";
import { useState, useEffect } from "react";

const Wednesday = () => {
  const [wednesdayItems, setWednesdayItems] = useState([]);
  const [userItemWednesday, setUserItemWednesday] = useState("");

  useEffect(() => {
    //variable that hold database detail
    const database = getDatabase(firebase);
    const dbRef = ref(database, "/wednesday");

    onValue(dbRef, (response) => {
      const newState = [];

      const data = response.val();

      for (let key in data) {
        newState.push({ ...data[key], key: key });
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
    const dbRef = ref(database, "/wednesday");
    push(dbRef, { item: userItemWednesday });

    setUserItemWednesday("");
  };

  const handleRemoveClick = (itemKey) => {
    const database = getDatabase(firebase);
    const dbRef = ref(database, `/wednesday/${itemKey}`);
    remove(dbRef);
  };
  return (
    <div className="sectionSpace">
      <div className="wrapper">
        <div>
          <h2 className="torch">
            {" "}
            <i className="fa-solid fa-fire-burner"></i>Wednesday
            <i className="fa-solid fa-fire-burner"></i>
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
              value={userItemWednesday}
            />
            <button className="btnAdd" onClick={handleClick}>
              Add to list
            </button>
          </div>
        </form>
        <ul>
          {/* mapping through the array in state  */}
          {wednesdayItems.map((item) => {
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

export default Wednesday;
