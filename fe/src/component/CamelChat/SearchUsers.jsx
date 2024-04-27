import React, { useState } from 'react';
import axios from 'axios';

function SearchUsers({ onSelectUser }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [users, setUsers] = useState([]);

  const handleSearch = async () => {
    const response = await axios.get(`http://localhost:8080/users?firstname=${firstName}&lastname=${lastName}`);
    setUsers(response.data);
  };

  return (
    <div>
      <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      {users.map(user => (
        <div key={user.id} onClick={() => onSelectUser(user)}>
          <img src={user.profileImage} alt={user.firstName} />
          <p>{user.firstName} {user.lastName}</p>
        </div>
      ))}
    </div>
  );
}


export default SearchUsers;