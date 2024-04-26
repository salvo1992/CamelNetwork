import React from 'react';
import styles from './Settings.module.css';

function PasswordSettings() {
  return (
    <div className={styles.container}>
      <h2>Modifica Password</h2>
      <form>
        <label htmlFor="currentPassword">Password Corrente:</label>
        <input type="password" id="currentPassword" name="currentPassword" />
        <label htmlFor="newPassword">Nuova Password:</label>
        <input type="password" id="newPassword" name="newPassword" />
        <label htmlFor="confirmPassword">Conferma Password:</label>
        <input type="password" id="confirmPassword" name="confirmPassword" />
        <button type="submit">Salva</button>
      </form>
    </div>
  );
}

export default PasswordSettings;
