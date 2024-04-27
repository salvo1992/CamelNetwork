import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ChatModal({ user, onClose }) {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
  
    useEffect(() => {
      const fetchMessages = async () => {
        const response = await axios.get(`http://localhost:8080/messages?conversationId=${user.id}`);
        setMessages(response.data);
      };
  
      fetchMessages();
    }, [user.id]);
  
    const handleSend = async () => {
      await axios.post('http://localhost:8080/messages', {
        conversationId: user.id,
        text
      });
      setText('');
    };
  
    return (
      <div className="chat-modal">
        <div className="chat-header">
          <img src={user.profileImage} alt="Profile" />
          <h3>{user.firstName} {user.lastName}</h3>
          <button onClick={onClose}>Close</button>
        </div>
        <div className="chat-messages">
          {messages.map(msg => (
            <p key={msg.id}>{msg.text}</p>
          ))}
        </div>
        <div className="chat-input">
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    );
  }

  export default ChatModal;
