import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

function App() {
const [users, setUsers] = useState([]);
  const loadUsers = async () => {
    const res = await fetch("http://localhost:5000/submit1");
    const data = await res.json();
    setUsers(data);
  };
   useEffect(() => { loadUsers(); }, []);

  return (
    <>
     <div className="container p-4">
      <h2 className="text-center mb-3">
        Cognifyz • Where Data Meets Intelligence
      </h2>

     <UserForm loadUsers={loadUsers} />
      <UserList users={users} loadUsers={loadUsers} />
    </div>
    
    
    </>
  );
}

export default App;
