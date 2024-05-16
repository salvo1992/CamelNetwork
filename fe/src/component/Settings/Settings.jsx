import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Settings.module.css';
import { FaUser, FaEnvelope, FaLock, FaLanguage, FaBell, FaShieldAlt } from 'react-icons/fa';
import Sidebar from '../siderbar/Siderbar';

function Settings() {
  return (
    <div className={styles.container}>
      <h1>Impostazioni</h1>
      <div className={styles.setting}>
        <FaUser className={styles.icon} />
        <div className={styles.label}>Modifica Profilo</div>
        <Link to="/ProfileSettings" className={styles.link}>Modifica</Link>
      </div>
      <div className={styles.setting}>
        <FaEnvelope className={styles.icon} />
        <div className={styles.label}>Modifica Email</div>
        <Link to="/EmailSettings" className={styles.link}>Modifica</Link>
      </div>
      <div className={styles.setting}>
        <FaLock className={styles.icon} />
        <div className={styles.label}>Modifica Password</div>
        <Link to="/PasswordSettings" className={styles.link}>Modifica</Link>
      </div>
      <div className={styles.setting}>
        <FaLanguage className={styles.icon} />
        <div className={styles.label}>Lingua e regione</div>
        <Link to="/LanguageSettings" className={styles.link}>Modifica</Link>
      </div>
      <div className={styles.setting}>
        <FaBell className={styles.icon} />
        <div className={styles.label}>Notifiche</div>
        <Link to="/NotificationsSettings" className={styles.link}>Modifica</Link>
      </div>
      <div className={styles.setting}>
        <FaShieldAlt className={styles.icon} />
        <div className={styles.label}>Privacy e sicurezza</div>
        <Link to="/PrivacySettings" className={styles.link}>Modifica</Link>
      </div>
      <Sidebar className={styles.sidebar} />
    </div>
  );
}

export default Settings;