import styles from "./index.module.css";
import { useContext, useEffect, useState } from "react";
import ReactContext from "../../context/ReactContext";
import Index2 from "../Usermessages";
import axios from "axios";

export default function Sidebar() {
  const { users, setUsers } = useContext(ReactContext);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [message, setmessage] = useState(false);
  const [userData, setUserData] = useState([]);
  const [showMessage, setShowMessage] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [patientNumber, setpatientNumber] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://node-ccoplnfjedo.onrender.com/messageData"
        );
        setUserData(response?.data?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (users.length !== 0) {
      console.log(users, "Users");
      handleName(users[0]);
      console.log(userData)
    }
  }, [userData]);

  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://node-ccoplnfjedo.onrender.com/users"
        );
        if (response.ok) {
          const data = await response.json();
          setUsers(data.data);
        }
      } catch (error) {
        console.log(error.message, "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleName = (each) => {
    console.log(each, "Handle Name");
    setpatientNumber(each.patient_phone_number);
    const data = userData.filter((item) => {
      return item.from === each.patient_phone_number;
    });
    setShowMessage(data);
    setmessage(!false);
    setShowEditor(false);
    setShowEmoji(false);
  };

  useEffect(() => {
    const filteredData = users.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredUsers(filteredData);
  }, [search, users]);

  // useEffect(() => {
  //   if (filteredUsers.length !== 0) {
  //     console.log("Called", filteredUsers);
  //     handleName(filteredUsers[0]);
  //   }
  // }, [filteredUsers]);

  return (
    <>
      <div style={{ display: "flex" }}>
        <aside>
          <div className={styles.sidebarHeader}>
            <div className={styles.searchBox}>
              <img
                src="assets/Search.png"
                alt="search-icon"
                className={styles.searchIcon}
              />
              <input
                type="search"
                placeholder="Search for a Chat or User"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div>
              <img
                src="assets/filter.png"
                alt="filter-icon"
                className={styles.filterIcon}
              />
            </div>
          </div>
          <hr className={styles.hrLine} />
          <ul className={styles.userList}>
            {isLoading
              ? null
              : filteredUsers.map((each, i) => (
                  <li key={i}>
                    <img src={each.image_url} alt="profile-photo" />
                    <div onClick={(e) => handleName(each, i)}>
                      <h1>{each.name}</h1>
                      <p>{each.patient_phone_number}</p>
                    </div>
                  </li>
                ))}
          </ul>
        </aside>

        <div className={styles.message_container}>
          <Index2
            message={message}
            userData={userData}
            showMessage={showMessage}
            patientNumber={patientNumber}
            showEditor={showEditor}
            setShowEditor={setShowEditor}
            showEmoji={showEmoji}
            setShowEmoji={setShowEmoji}
          />
        </div>
      </div>
    </>
  );
}