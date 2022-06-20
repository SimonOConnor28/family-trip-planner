import firebase from "./firebase";
import { getDatabase, onValue, ref, push, remove } from "firebase/database";
import { useState, useEffect } from "react";


        const Monday = () => {
        // set userName to state
        const [items, setItem] = useState([]);
        const [userItem, setUserItem] = useState("");

        useEffect( () => {
            //variable that hold database detail
            const database = getDatabase(firebase);
            const dbRef = ref(database);

            onValue(dbRef, (response) => {
            const newState = [];

            const data = response.val();

            for (let key in data) {
                newState.push(data[key]);
            }
            setItem(newState);
            });
        }, []);

        const handleInputChange = (event) => {
            setUserItem(event.target.value);
        };

        const handleClick = (event) => {
            event.preventDefault();

            const database = getDatabase(firebase);
            const dbRef = ref(database);

            push(dbRef, { day: "monday", item: userItem });

            setUserItem("");
        };

        const handleRemoveClick = (newItem) => {
          const database = getDatabase(firebase);
          const dbRef = ref(database, `/${newItem}`);
          console.log(database);
          remove(dbRef.id)
        }
        return (
          <div className="mondayBack sectionSpace">
            <div className="wrapper">
              <div>
                <h2 className="torch">Monday</h2>
              </div>
              <form action="submit">
                <div className="flex">
                  <label htmlFor="newItem"></label>
                  <input
                    type="text"
                    id="newItem"
                    placeholder="Add what you are bringing here"
                    onChange={handleInputChange}
                    value={userItem}
                  />
                <button onClick={handleClick}>Add Item here</button>
                </div>
              </form>
              <ul>
                {/* mapping through the array in state  */}
                {items.filter((item) => item.day === "monday").map((item) => {
                    return (
                      <li key={item.item}>
                        {item.item}
                        <button onClick={() => handleRemoveClick(item.item)}>
                          Remove
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
