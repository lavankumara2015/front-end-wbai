import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ReactContext from "./context/ReactContext";
import { useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  return (
    <ReactContext.Provider value={{ users, setUsers }}>
      <Navbar />
      <Sidebar />
    </ReactContext.Provider>
  );
}

export default App;