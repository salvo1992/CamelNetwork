import React, { useState } from 'react';
import SearchUsers from './SearchUsers'; // Assicurati che il percorso di importazione sia corretto
import ChatModal from './ChatModal'; // Assicurati che il percorso di importazione sia corretto

function CamelChat() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <SearchUsers onSelectUser={handleSelectUser} />
      {isModalOpen && selectedUser && (
        <ChatModal user={selectedUser} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default CamelChat;
