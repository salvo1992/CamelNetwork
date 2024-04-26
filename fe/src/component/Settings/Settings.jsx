import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Settings.module.css';
import { FaUser, FaEnvelope, FaLock, FaLanguage, FaBell, FaShieldAlt } from 'react-icons/fa';

function Settings() {
  return (
    <div className={styles.container}>
      <h1>Impostazioni</h1>
      <div className={styles.setting}>
        <FaUser className={styles.icon} />
        <div className={styles.label}>Modifica Profilo</div>
        <Link to="/settings/profile" className={styles.link}>Modifica</Link>
      </div>
      <div className={styles.setting}>
        <FaEnvelope className={styles.icon} />
        <div className={styles.label}>Modifica Email</div>
        <Link to="/settings/email" className={styles.link}>Modifica</Link>
      </div>
      <div className={styles.setting}>
        <FaLock className={styles.icon} />
        <div className={styles.label}>Modifica Password</div>
        <Link to="/PasswordSettings" className={styles.link}>Modifica</Link>
      </div>
      <div className={styles.setting}>
        <FaLanguage className={styles.icon} />
        <div className={styles.label}>Lingua e regione</div>
        <Link to="/settings/language" className={styles.link}>Modifica</Link>
      </div>
      <div className={styles.setting}>
        <FaBell className={styles.icon} />
        <div className={styles.label}>Notifiche</div>
        <Link to="/settings/notifications" className={styles.link}>Modifica</Link>
      </div>
      <div className={styles.setting}>
        <FaShieldAlt className={styles.icon} />
        <div className={styles.label}>Privacy e sicurezza</div>
        <Link to="/PrivacySettings" className={styles.link}>Modifica</Link>
      </div>
    </div>
  );
}

export default Settings;