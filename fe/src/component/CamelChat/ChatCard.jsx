import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Styles from './ChatCard.module.css';

function ChatCard({ user, onClick }) {
  const [chatMessages, setChatMessages] = useState([]);
  
  useEffect(() => {
    
    fetchChatMessages(user.id);
  }, [user]);

  const fetchChatMessages = async (userId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/messages?userId=${userId}`);
      const groupedMessages = groupMessagesByUser(response.data);
      setChatMessages(groupedMessages);
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  };

  const groupMessagesByUser = (messages) => {
    const groupedChats = {};
    messages.forEach((message) => {
      const key = `${message.firstName} ${message.lastName}`;
      if (!groupedChats[key]) {
        groupedChats[key] = [];
      }
      groupedChats[key].push(message.text);
    });
    return Object.entries(groupedChats).map(([name, messages]) => ({
      name,
      messages,
    }));
  };

  const handleClick = () => {
    // Passiamo l'utente selezionato al componente padre CamelChat
    onClick(user);
  };
  return (
    <div className={Styles.container}>
      {chatMessages && chatMessages.map((chat, index) => (
        <div key={index} className={Styles.chatCard} onClick={handleClick}>
          <div className={Styles.chatHeader}>
            <h3>{chat.name}</h3>
           
          </div>
          <div className={Styles.chatMessages}>
            {chat.messages && chat.messages.map((message, index) => (
              <div key={index} className={Styles.messageCard}>
                <p>{message}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatCard;
