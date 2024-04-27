import React, { useState } from 'react';
import styles from './NotificationSettings.module.css';

function NotificationSettings() {
  const [receiveNotifications, setReceiveNotifications] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);
  const [sendContent, setSendContent] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const handleNotificationChange = (notification) => {
    const index = selectedNotifications.indexOf(notification);
    if (index === -1) {
      setSelectedNotifications([...selectedNotifications, notification]);
    } else {
      setSelectedNotifications(selectedNotifications.filter((item) => item !== notification));
    }
  };

  const handleDeleteSelectedNotifications = () => {
    setSelectedNotifications([]);
  };

  const addNotification = () => {
    setNotifications([...notifications, { id: Date.now(), content: "Hello world" }]);
  };

  return (
    <div className={styles.container}>
      <h2>Impostazioni Notifiche</h2>
      <div className={styles.buttons}>
        <button className={`${styles.button} ${receiveNotifications && styles.active}`} onClick={() => setReceiveNotifications(!receiveNotifications)}>Ricevi Notifiche</button>
        <button className={`${styles.button} ${subscribeNewsletter && styles.active}`} onClick={() => setSubscribeNewsletter(!subscribeNewsletter)}>Iscriviti alla Newsletter</button>
        <button className={`${styles.button} ${sendContent && styles.active}`} onClick={() => setSendContent(!sendContent)}>Invia Contenuti</button>
      </div>
      <div className={styles.navbar}>
        <input type="text" placeholder="Cerca notifiche" className={styles.search} />
        <button className={styles.icon}>🔍</button>
        <button className={styles.icon}>🔔</button>
        <button className={styles.icon}>🔄</button>
        <img src="https://www.nicepng.com/png/full/38-385668_notification-icon-png.png" alt="Notification Icon" className={styles.notificationIcon} />
        <button className={styles.deleteButton} onClick={handleDeleteSelectedNotifications}>Cancella ({selectedNotifications.length})</button>
      </div>
      <div className={styles.notificationContainer}>
        <div className={styles.notificationCard}>
          <ul>
            {notifications.map(notification => (
              <li key={notification.id} className={styles.notification}>
                <input type="checkbox" checked={selectedNotifications.includes(notification.id)} onChange={() => handleNotificationChange(notification.id)} />
                <span>{notification.content}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button onClick={addNotification}>Aggiungi Notifica</button>
    </div>
  );
}

export default NotificationSettings;


