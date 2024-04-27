import React, { useState } from 'react';
import styles from './ProfileSettings.module.css';

function ProfileSettings() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [complaint, setComplaint] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState(false);
  const [submittedComplaint, setSubmittedComplaint] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleComplaintChange = (e) => {
    setComplaint(e.target.value);
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    setSubmittedFeedback(true);
    // Invia il feedback al backend o esegui altre operazioni necessarie
  };

  const handleSubmitComplaint = (e) => {
    e.preventDefault();
    setSubmittedComplaint(true);
    // Invia il reclamo al backend o esegui altre operazioni necessarie
  };

  const handleLogout = () => {
    // Aggiungi qui la logica per eseguire il logout
  };

  const handleDeleteAccount = () => {
    // Aggiungi qui la logica per cancellare l'account
  };

  const handleAssistance = () => {
    // Aggiungi qui la logica per inviare una email all'assistenza
  };

  return (
    <div className={styles.container}>
      <h2>Impostazioni Profilo</h2>
      <p>Questa pagina ti consente di modificare le tue informazioni personali, fornire feedback e contattare l'assistenza.</p>
      <div className={styles.form}>
        <h3>Modifica Dati Personali</h3>
        <form>
          <label htmlFor="name">Nome:</label>
          <input type="text" id="name" name="name" value={name} onChange={handleNameChange} />
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} />
          <button type="submit" onClick={handleLogout}>Logout</button>
          <button type="button" onClick={handleDeleteAccount}>Cancella Account</button>
        </form>
      </div>
      <div className={styles.assistance}>
        <h3>Assistenza</h3>
        <p>Per contattare l'assistenza, invia un'email a: support@example.com</p>
        <button onClick={handleAssistance}>Contatta Assistenza</button>
      </div>
      <div className={styles.feedback}>
        <h3>Feedback</h3>
        <form onSubmit={handleSubmitFeedback}>
          <label htmlFor="feedback">Inserisci il tuo feedback:</label>
          <textarea id="feedback" name="feedback" value={feedback} onChange={handleFeedbackChange}></textarea>
          <button type="submit">Invia Feedback</button>
          {submittedFeedback && <p>Grazie per il tuo feedback! Ti ringraziamo per il contributo.</p>}
        </form>
      </div>
      <div className={styles.complaint}>
        <h3>Lamentele</h3>
        <form onSubmit={handleSubmitComplaint}>
          <label htmlFor="complaint">Inserisci la tua lamentela:</label>
          <textarea id="complaint" name="complaint" value={complaint} onChange={handleComplaintChange}></textarea>
          <button type="submit">Invia Lamentela</button>
          {submittedComplaint && <p>Grazie per il tuo messaggio! Ti ringraziamo per il feedback.</p>}
        </form>
      </div>
    </div>
  );
}

export default ProfileSettings;
