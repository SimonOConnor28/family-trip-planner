import firebase from "./firebase";
import { getDatabase, onValue, ref, push } from "firebase/database";
import { useState, useEffect } from "react";

const Friday = () => {
    const [fridayItems, setFridayItems] = useState([]);
    const [userItemFriday, setUserItemFriday] = useState("");

    useEffect(() => {
        const database = getDatabase(firebase);
        const dbRef = ref(database);

        onValue(dbRef, (response) => {
            const newState = [];

            const data = response.val([]);

            for (let key in data) {
                newState.push(data[key]);
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
        const dbRef = ref(database);

        push(dbRef, { day: "friday", item: userItemFriday });

        setUserItemFriday("");
    };

    return (
        <div className="fridayBackground sectionSpace">
            <div className="wrapper">
                <h2>Friday</h2>
                <div>
                <form action="submit">
                    <div className="flex">
                        <label htmlFor="newItem"></label>
                        <input
                            type="text"
                            id="newItem"
                            placeholder="Add what you are bringing here"
                            onChange={handleInputChange}
                            value={userItemFriday}
                        />
                        <button onClick={handleClick}>Add Item here</button>
                    </div>
                </form>
                <div>
                    <ul>
                        {fridayItems
                            .filter((item) => item.day === "friday")
                            .map((item) => {
                                return (
                                    <li key={item.item}>
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
            </div>
        </div>
    );
};

export default Friday;
