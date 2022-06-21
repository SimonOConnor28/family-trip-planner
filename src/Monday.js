import firebase from "./firebase";
import { getDatabase, onValue, ref, push, remove } from "firebase/database";
import { useState, useEffect } from "react";


        const Monday = () => {
          // set userName to state
          const [mondayItems, setMondayItems] = useState([]);
          const [userItemMonday, setUserItemMonday] = useState("");

          useEffect(() => {
            //variable that hold database detail
            const database = getDatabase(firebase);
            const dbRef = ref(database, "/monday");

            onValue(dbRef, (response) => {
              const newState = [];

              const data = response.val();

              for (let key in data) {
                newState.push({ ...data[key], key: key });
              }
              setMondayItems(newState);
            });
          }, []);

          const handleInputChange = (event) => {
            setUserItemMonday(event.target.value);
          };

          const handleClick = (event) => {
            event.preventDefault();

            const database = getDatabase(firebase);
            const dbRef = ref(database, "/monday");
            push(dbRef, { item: userItemMonday });

            setUserItemMonday("");
          };

          const handleRemoveClick = (itemKey) => {
            const database = getDatabase(firebase);
            const dbRef = ref(database, `/monday/${itemKey}`);
            remove(dbRef);
          };
          return (
            <div className="tuesBackground sectionSpace">
              <div className="wrapper">
                <div>
                  <h2 className="torch">
                    <i className="fa-solid fa-campground"></i>Monday
                    <i className="fa-solid fa-campground"></i>
                  </h2>
                </div>
                <form action="submit">
                  <div className="flex">
                    <label htmlFor="newItem"></label>
                    <input
                      type="text"
                      id="newItem"
                      placeholder="Add Items here"
                      onChange={handleInputChange}
                      value={userItemMonday}
                    />
                    <button className="btnAdd" onClick={handleClick}>
                      Add to list
                    </button>
                  </div>
                </form>
                <ul>
                  {/* mapping through the array in state  */}
                  {mondayItems.map((item) => {
                    return (
                      <li key={item.key}>
                        {item.item}
                        <button className="removeBtn" onClick={() => handleRemoveClick(item.key)}>
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
export default Monday;
