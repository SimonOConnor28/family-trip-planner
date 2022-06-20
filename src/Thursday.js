import firebase from "./firebase";
import { getDatabase, onValue, ref, push, update} from "firebase/database";
import { useState, useEffect } from "react";

const Thursday = () => {
  const [thursdayItems, setThursdayItems] = useState([]);
  const [userItemThursday, setUserItemThursday] = useState("");
  const [fullDataBase, setfullDataBase]= useState([]);

  useEffect(() => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);

    onValue(dbRef, (response) => {
      const newState = [];

      const data = response.val([]);

      // const fullData = Object.keys(data).map((key) => [(key),data[key]]);

      // console.log(fullData, 'fulldata')

      // const thurs = data.filter(items => {
      //   console.log(items, 'items')
      // })
      //gooogle how to 
      for (let key in data) {
        // console.log('key', key.item)
        if (data[key].day === "thursday") {
          newState.push(data[key]);
          console.log(data);
        }
        
        // console.log(data[key].day === 'thursday');
      }
      console.log(newState);
      setThursdayItems(newState);
    });
  }, []);

  const handleInputChange = (event) => {
    setUserItemThursday(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();

    const userId = `-N4yYObyAARjOmkH4FPm`;

    const database = getDatabase(firebase);
    const childRef = ref(database, `/${userId}`);
    const newEntry = {
      day: "thursday",
      items: [{ item: "food" }, { item: "drinks" }],
    }; 
    // const dbRef = ref(database);
    setUserItemThursday("");
    return update(childRef, newEntry )

    //how to add a new object to the items array 
    //key value pair for the object is item: value
    // push(dbRef, { day: "thursday", items: [{item: userItemThursday}] });
  
  };

  return (
    <div className="thursBackground sectionSpace">
      <div className="wrapper">
        <h2>Thursday</h2>
        <form action="submit">
          <div className="flex">
            <label htmlFor="newItem"></label>
            <input
              type="text"
              id="newItem"
              placeholder="Add what you are bringing here"
              onChange={handleInputChange}
              value={userItemThursday}
            />
            <button onClick={handleClick}>Add Item here</button>
          </div>
        </form>
        <div>
          <ul>
            {/* loop through the state / find the day of the week that matches / loop through that day's items // print each item  */}

            {thursdayItems
              .filter((item) => item.day === "thursday").map((item) => {
                return (
                  <li key={item.day}>
                    {item.day}
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
  );
};

export default Thursday;
