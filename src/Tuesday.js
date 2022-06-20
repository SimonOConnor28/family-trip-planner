import firebase from "./firebase";
import { getDatabase, onValue, ref, push } from "firebase/database";
import { useState, useEffect } from "react";

const Tuesday = () => {
    const [tuesdayItems, setTuesdayItems] = useState([])
    const [userItemTuesday, setUserItemTuesday] = useState('')

    useEffect(() => {
        const database = getDatabase(firebase);
        const dbRef = ref(database);

        onValue(dbRef, (response) => {
            const newState = [];

            const data = response.val([]);

            for (let key in data) {
                newState.push(data[key]);
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
        const dbRef = ref(database);

        push(dbRef, { day: 'tuesday', item: userItemTuesday });

        setUserItemTuesday("");
    };


    return (
        <div className="tuesBackground sectionSpace">
            <div className="wrapper">
                <h2>Tuesday</h2>
                <form action="submit">
                    <div className="flex">
                        <label htmlFor="newItem"></label>
                        <input
                            type="text"
                            id="newItem"
                            placeholder="Add what you are bringing here"
                            onChange={handleInputChange}
                            value={userItemTuesday}
                        />
                        <button onClick={handleClick}>Add Item here</button>
                    </div>
                </form>
                <div>
                    <ul>
                        {tuesdayItems
                            .filter((item) => item.day === "tuesday")
                            .map((item) => {
                                return (
                                    <li key={item.item}>
                                        {item.item}
                                        {/* <button
                                            onClick={() =>handleRemoveClick(item.item)}>
                                            Remove
                                        </button> */}
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Tuesday;