import React, { useState } from 'react';
import styles from './Siderbar.module.css'; // Assicurati che il nome del file sia corretto
import { FaHome, FaUser, FaEnvelope, FaBell, FaCog, FaPowerOff } from 'react-icons/fa';

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);


  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
        <button className={styles.arrowButton} onClick={toggleCollapse}>{isCollapsed ? '<' : '>'}</button>
      <div className={styles.icon}>
        <FaHome />
      </div>
      <div className={styles.icon}>
        <FaUser />
      </div>
      <div className={styles.icon}>
        <FaEnvelope />
      </div>
      <div className={styles.icon}>
        <FaBell />
      </div>
      <div className={styles.icon}>
        <FaCog />
      </div>
      <div className={styles.icon}>
        <FaPowerOff />
      </div>
    </div>
  );
}

export default Sidebar;
