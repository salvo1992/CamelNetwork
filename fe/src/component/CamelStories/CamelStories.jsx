import React, { useState, useEffect } from 'react';
import styles from './CamelStories.module.css';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function CamelStories() {
  const [videos, setVideos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({ firstName: '', videoUrl: '' });
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/videos`);
    setVideos(response.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/upload`, formData);
    setModalIsOpen(false);
    loadVideos();
  };

  const handleDelete = async (videoId) => {
    await axios.delete(`${process.env.REACT_APP_SERVER_BASE_URL}/videos/${videoId}`);
    loadVideos();
  };

  const closeModal = () => setModalIsOpen(false);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`${styles.container} ${isCollapsed ? styles.collapsed : ''}`}>
      <button className={styles.arrowButton} onClick={toggleCollapse}>{isCollapsed ? '<' : '>'}</button>
      <button className={styles.videoButton} onClick={() => setModalIsOpen(true)}>Aggiungi Video</button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className={styles.reactModal}>
        <button onClick={closeModal} className={styles.closeButton}>&times;</button>
        <form onSubmit={handleSubmit}>
          <label>CamelComment:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />
          <label>Camelvideo Stories:</label>
          <input type="text" name="videoUrl" value={formData.videoUrl} onChange={handleInputChange} />
          <button  type="submit" className={styles.inviaButton}>Invia</button>
        </form>
      </Modal>
      {videos.map(video => (
        <div key={video.id} className={styles.card}>
          <h4 className={styles.username}>{video.firstName}</h4>
          <video controls>
            <source src={video.videoUrl} type="video/mp4" />
          </video>
          <button onClick={() => handleDelete(video.id)}>Elimina</button>
        </div>
      ))}
    </div>
  );
}


export default CamelStories;
