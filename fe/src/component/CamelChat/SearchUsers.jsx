import React, { useState,useEffect } from 'react';
import axios from 'axios';
import styles from './SearchUsers.module.css'; // Importa i tuoi stili CSS


function SearchUsers({ onSelectUser }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [users, setUsers] = useState([]);


  const handleSearch = async () => {
    try {
      let currentPage = 1;
      let allUsers = [];

      // Continua a recuperare gli utenti finché non ottieni una risposta vuota
      while (true) {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/getUsers?page=${currentPage}`);
        const fetchedUsers = response.data.users;

        // Se la risposta è vuota, interrompi il ciclo
        if (fetchedUsers.length === 0) {
          break;
        }

        allUsers = allUsers.concat(fetchedUsers);
        currentPage++;
      }

      // Filtra gli utenti in base al nome e al cognome
      const filteredUsers = allUsers.filter(user =>
        user.firstName.toLowerCase().includes(firstName.toLowerCase()) &&
        user.lastName.toLowerCase().includes(lastName.toLowerCase())
      );

      // Aggiorna lo stato degli utenti con gli utenti filtrati
      setUsers(filteredUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputcontainer}>
        <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className={styles.resultcontainer}>
        {users.map(user => (
          <div key={user._id} onClick={() => onSelectUser(user)}>
            <img src={user.profileImage} alt={user.firstName} />
            <p>{user.firstName} {user.lastName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default SearchUsers;
