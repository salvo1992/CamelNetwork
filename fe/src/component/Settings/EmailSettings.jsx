import React from 'react';
import styles from './Settings.module.css';

function EmailSettings() {
  return (
    <div className={styles.container}>
      <h2>Modifica Email</h2>
      <form>
        <label htmlFor="email">Nuovo Indirizzo Email:</label>
        <input type="email" id="email" name="email" />
        <button type="submit">Salva</button>
      </form>
    </div>
  );
}

export default EmailSettings;
