import React from 'react';
import styles from './PasswordSettings.module.css';

function EmailSettings() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.formContainer}>
          <h2 className={styles.title}>Modifica Email</h2>
          <form className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>Nuovo Indirizzo Email:</label>
              <input type="email" id="email" name="email" className={styles.input} />
            </div>
            <button type="submit" className={styles.button}>Salva</button>
          </form>
        </div>
        <div className={styles.imageContainer}>
          <img src="https://img.freepik.com/premium-photo/camel-wearing-jacket-with-word-camel-it_919652-1275.jpg" alt="Email" className={styles.image} />
        </div>
      </div>
    </div>
  );
}

export default EmailSettings;
