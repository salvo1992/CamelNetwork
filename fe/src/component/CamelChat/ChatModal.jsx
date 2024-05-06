import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Styles from './SearchUsers.module.css';

function ChatModal({ user, onClose }) {
  const [text, setText] = useState('');
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (user) {
      fetchChats(user.id);
    }
  }, [user]);

  const fetchChats = async (userId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/messages?userId=${userId}`);
      setChats(response.data);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/messages`, {
        conversationId: user.id,
        text,
        firstName: user.firstName,
        lastName: user.lastName
      });
      setText('');
      // Aggiorniamo la lista delle chat dopo l'invio del messaggio
      fetchChats(user.id);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className={Styles.modalContainer}>
      <div className={Styles.modalContent}>
        <div className={Styles.modalClose} onClick={onClose}>X</div>
        <div className={Styles.chatList}>
          <div className={Styles.chatCard}>
            <div className={Styles.chatHeader}>
              <h3>{user.firstName} {user.lastName}</h3>
            </div>
            <div className={Styles.chatMessages}>
             <form onSubmit={handleSend} className={Styles.chatInput}>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <button type="submit">Send</button>
      </form>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default ChatModal;
