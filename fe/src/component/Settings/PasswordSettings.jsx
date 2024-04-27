import React from 'react';
import styles from './PasswordSettings.module.css';

function PasswordSettings() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.formContainer}>
          <h2 className={styles.title}>Modifica Password</h2>
          <form className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="currentPassword" className={styles.label}>Password Corrente:</label>
              <input type="password" id="currentPassword" name="currentPassword" className={styles.input} />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="newPassword" className={styles.label}>Nuova Password:</label>
              <input type="password" id="newPassword" name="newPassword" className={styles.input} />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>Conferma Password:</label>
              <input type="password" id="confirmPassword" name="confirmPassword" className={styles.input} />
            </div>
            <button type="submit" className={styles.button}>Salva</button>
          </form>
        </div>
        <div className={styles.imageContainer}>
          <img src="https://img.freepik.com/premium-photo/camel-wearing-jacket-with-word-camel-it_919652-1275.jpg" alt="Password" className={styles.image} />
        </div>
      </div>
    </div>
  );
}

export default PasswordSettings;

