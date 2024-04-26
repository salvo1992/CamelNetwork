import React, { useState } from 'react';
import styles from './Siderbar.module.css'; // Assicurati che il nome del file sia corretto
import { FaHome, FaUser, FaEnvelope, FaBell, FaCog, FaPowerOff } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);


  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
        <button className={styles.arrowButton} onClick={toggleCollapse}>{isCollapsed ? '<' : '>'}</button>
        <div className={styles['icon-container']}>
        <div >
  <Link className={styles.icon} to="/home">
    <FaHome />
  </Link>
</div>
<div >
  <Link className={styles.icon} to="/userProfile">
    <FaUser />
  </Link>
</div>
<div >
  <Link className={styles.icon} to="/inbox">
    <FaEnvelope />
  </Link>
</div>
<div >
  <Link className={styles.icon} to="/notifications">
    <FaBell />
  </Link>
</div>
<div >
  <Link className={styles.icon} to="/settings">
    <FaCog />
  </Link>
</div>
<div >
  <Link className={styles.icon} to="/logout">
    <FaPowerOff />
  </Link>
</div>
</div>
</div>
  );
}

export default Sidebar;
