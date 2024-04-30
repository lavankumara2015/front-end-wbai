import "./App.css";
import Navbar from "./components/Navbar";
import ProfileImage from "./components/ProfileImage/profile";
import Sidebar from "./components/Sidebar";
import ReactContext from "./context/ReactContext";
import { useState } from "react";
import { PrimeReactProvider } from 'primereact/api';

function App() {
  const [users, setUsers] = useState([]);
  return (
    <PrimeReactProvider>
    <ReactContext.Provider value={{ users, setUsers }}>
      <Navbar />
      <Sidebar />

{/* <ProfileImage/> */}

    </ReactContext.Provider>
    </PrimeReactProvider>

  );
}

export default App;