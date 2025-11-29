import React from 'react'

const UserList = ({ users, loadUsers }) => {
    console.log()
    const deleteUser = async (id) => {
    await fetch(`http://localhost:5000/submit2/${id}`, { method: "DELETE" });
    loadUsers();
  };
  return (
   <>
    <ul className="list-group mt-3">

      {users.map((u) => (
      
        <li key={u.id} className="list-group-item d-flex justify-content-between">
          {u.username} - {u.email}
        
          <button className="btn btn-danger btn-sm"
                  onClick={() => deleteUser(u._id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
   
   </>
  )
}

export default UserList