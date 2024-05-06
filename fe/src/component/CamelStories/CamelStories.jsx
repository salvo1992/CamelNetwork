import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import styles from './CamelStories.module.css';

Modal.setAppElement('#root');

function CamelStories() {
  const [videos, setVideos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [expandedVideoUrl, setExpandedVideoUrl] = useState('');
  const [formData, setFormData] = useState({ firstName: '' });
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/videos`);
      const loadedVideos = response.data;
      setVideos(loadedVideos);
      // Aggiungi la classe .scrollable se ci sono più di 4 video
      if (loadedVideos.length > 4) {
        document.querySelector('.container').classList.add('scrollable');
      } else {
        document.querySelector('.container').classList.remove('scrollable');
      }
    } catch (error) {
      console.error('Errore durante il caricamento dei video:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Memorizza il primo file selezionato
  };

  const uploadVideo = async (file) => {
    const formData = new FormData();
    formData.append('video', file);
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/upload/clouduploadmp4`, {
        method: 'POST',
        body: formData,
      });
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFile) {
      try {
        const video = await uploadVideo(selectedFile);
        const postbody = {
          ...formData,
          videoUrl: video.source,
        }
        const response = await axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/videos/create`, postbody);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Nessun file selezionato');
    }
  };

  const handleDelete = async (videoId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER_BASE_URL}/videos/${videoId}`);
      loadVideos();
    } catch (error) {
      console.error('Errore durante l\'eliminazione del video:', error);
    }
  };

  const openVideoModal = (url) => {
    setExpandedVideoUrl(url);
    setVideoModalOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setVideoModalOpen(false);
  };

  return (
    <div className={`${styles.container} ${styles.containerscrollable} ${isCollapsed ? styles.collapsed : ''}`}>
      <h1 className={styles.title}>Camel Stories</h1>
      <button className={styles.arrowButton} onClick={() => setIsCollapsed(!isCollapsed)}>{isCollapsed ? '<' : '>'}</button>
      <button className={styles.videoButton} onClick={() => setModalIsOpen(true)}>Aggiungi Video</button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className={styles.reactModal}>
        <button onClick={closeModal} className={styles.closeButton}>&times;</button>
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <label>CamelComment:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />
          <label>Camelvideo Stories:</label>
          <input type="file" name="video" onChange={handleFileChange} />
          <button type="submit" className={styles.inviaButton}>Invia</button>
        </form>
      </Modal>
      <Modal isOpen={videoModalOpen} onRequestClose={closeModal} className={styles.videoModal} contentLabel="Video Modal">
        <video controls autoPlay style={{ width: '100%' }}>
          <source src={expandedVideoUrl} type="video/mp4" />
        </video>
      </Modal>
      <div className={styles.videoContainer}>
        {videos.map((video, index) => (
          <div key={video.id || index} className={styles.card} onClick={() => openVideoModal(video.videoUrl)}>
            <video controls>
              <source src={video.videoUrl} type="video/mp4" />
            </video>
            <div className={styles.videoLabel}>{video.firstName}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CamelStories;




