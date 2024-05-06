import React, { useState, useEffect } from 'react';
import SearchUsers from './SearchUsers';
import ChatModal from './ChatModal';
import ChatCard from './ChatCard';
import styles from './CamelChat.module.css';

function CamelChat() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Qui potresti fare eventuali chiamate API per ottenere l'elenco degli utenti o altri dati iniziali
  }, []);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const users = [
    { id: 1, firstName: '', lastName: '' }
  ];

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.title}>CAMEL@CHAT</h1>
        <h3 className={styles.description}>Connettiti con i tuoi amici</h3>
      </div>
      <div className={styles.imagecontainer}>
        <img src="/assets/CamelChat1.jpg" alt="Left Image" className={styles.image} />
        <SearchUsers onSelectUser={handleSelectUser} />
        <img src="/assets/CamelChat2.jpg" alt="Right Image" className={styles.image} />
      </div>

      {/* Visualizza le card degli utenti */}
      {users.map((user) => (
        <ChatCard key={user.id} user={user} onClick={handleSelectUser} />
      ))}

      {/* Visualizza il modal solo se è aperto */}
      {isModalOpen && selectedUser && (
        <ChatModal user={selectedUser} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default CamelChat;
