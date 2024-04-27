import React, { useState } from 'react';
import styles from './LanguageSettings.module.css';

function LanguageSettings() {
  const [selectedLanguage, setSelectedLanguage] = useState('it'); // Impostazione predefinita: italiano

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Impostazioni Lingua</h2>
      
      <div className={styles.languageDescription}>
        {selectedLanguage === 'it' && <p>Benvenuto nelle impostazioni della lingua. Seleziona la lingua desiderata per il tuo profilo.</p>}
        {selectedLanguage === 'en' && <p>Welcome to the language settings. Select the desired language for your profile.</p>}
        {selectedLanguage === 'fr' && <p>Bienvenue dans les paramètres de langue. Sélectionnez la langue souhaitée pour votre profil.</p>}
        {selectedLanguage === 'de' && <p>Willkommen in den Spracheinstellungen. Wählen Sie die gewünschte Sprache für Ihr Profil aus.</p>}
        {selectedLanguage === 'es' && <p>Bienvenido a la configuración de idioma. Seleccione el idioma deseado para su perfil.</p>}
        {selectedLanguage === 'pt' && <p>Bem-vindo às configurações de idioma. Selecione o idioma desejado para o seu perfil.</p>}
        {selectedLanguage === 'ru' && <p>Добро пожаловать в настройки языка. Выберите желаемый язык для своего профиля.</p>}
        {selectedLanguage === 'ja' && <p>言語設定へようこそ。プロフィールに使用する言語を選択してください。</p>}
        {selectedLanguage === 'ko' && <p>언어 설정에 오신 것을 환영합니다. 프로필에 사용할 언어를 선택하세요.</p>}
        {/* Aggiungi altre descrizioni linguistiche qui */}
      </div>
      <div className={styles.languageOptions}>
        <div className={`${styles.languageOption} ${selectedLanguage === 'it' && styles.selected}`} onClick={() => handleLanguageChange('it')}>
          <span className={styles.flag}><img src="https://th.bing.com/th/id/OIP.a9MRQtUcuRDjJ76-GUJJhgHaHa?w=202&h=202&c=7&r=0&o=5&pid=1.7" alt="Italy Flag" /></span>
          <span className={styles.language}>Italiano</span>
        </div>
        <div className={`${styles.languageOption} ${selectedLanguage === 'en' && styles.selected}`} onClick={() => handleLanguageChange('en')}>
          <span className={styles.flag}><img src="https://th.bing.com/th/id/OIP._LJqAeutTTjI9dFJ6d6HpwHaHa?w=184&h=184&c=7&r=0&o=5&pid=1.7/" alt="UK Flag" /></span>
          <span className={styles.language}>English</span>
        </div>
        <div className={`${styles.languageOption} ${selectedLanguage === 'fr' && styles.selected}`} onClick={() => handleLanguageChange('fr')}>
          <span className={styles.flag}><img src="https://th.bing.com/th/id/OIP.DdIdlrDrhxD2oTJbvd0TdgHaHv?w=188&h=188&c=7&r=0&o=5&pid=1.7" alt="France Flag" /></span>
          <span className={styles.language}>Français</span>
        </div>
        <div className={`${styles.languageOption} ${selectedLanguage === 'de' && styles.selected}`} onClick={() => handleLanguageChange('de')}>
          <span className={styles.flag}><img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg" alt="Germany Flag" /></span>
          <span className={styles.language}>Deutsch</span>
        </div>
        <div className={`${styles.languageOption} ${selectedLanguage === 'es' && styles.selected}`} onClick={() => handleLanguageChange('es')}>
          <span className={styles.flag}><img src="https://th.bing.com/th/id/OIP.iKPD_82j-Jt5BmcEh_bW1AHaHa?w=207&h=207&c=7&r=0&o=5&pid=1.7" alt="Spain Flag" /></span>
          <span className={styles.language}>Español</span>
        </div>
        <div className={`${styles.languageOption} ${selectedLanguage === 'pt' && styles.selected}`} onClick={() => handleLanguageChange('pt')}>
          <span className={styles.flag}><img src="https://th.bing.com/th/id/OIP.PQFxhSRGLTj5l0zlsr4zLwHaHa?w=184&h=184&c=7&r=0&o=5&pid=1.7" alt="Portugal Flag" /></span>
          <span className={styles.language}>Português</span>
        </div>
        <div className={`${styles.languageOption} ${selectedLanguage === 'ru' && styles.selected}`} onClick={() => handleLanguageChange('ru')}>
          <span className={styles.flag}><img src="https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg" alt="Russia Flag" /></span>
          <span className={styles.language}>Русский</span>
        </div>
        <div className={`${styles.languageOption} ${selectedLanguage === 'ja' && styles.selected}`} onClick={() => handleLanguageChange('ja')}>
          <span className={styles.flag}><img src="https://th.bing.com/th/id/OIP.RQQs84o5JxRtDj6-0a7Y8AHaHa?w=207&h=207&c=7&r=0&o=5&pid=1.7" alt="Japan Flag" /></span>
          <span className={styles.language}>日本語</span>
        </div>
        <div className={`${styles.languageOption} ${selectedLanguage === 'ko' && styles.selected}`} onClick={() => handleLanguageChange('ko')}>
          <span className={styles.flag}><img src="https://th.bing.com/th/id/OIP.A5EjtYYpvw5YerRIhBe-5QHaHa?w=211&h=211&c=7&r=0&o=5&pid=1.7" alt="South Korea Flag" /></span>
          <span className={styles.language}>한국어</span>
        </div>
      </div>
    </div>
  );
}

export default LanguageSettings;
