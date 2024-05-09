import React, { useState } from 'react';
import AxiosClient from '../client/client';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css'; // Assicurati di importare il file CSS corretto

const LoginForm = ({ toggleForm }) => {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState('');

    const client = new AxiosClient();
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await client.post('/login', formData);
            if (response.token) {
                localStorage.setItem('auth', JSON.stringify(response.token));
                console.log("Token memorizzato nel localStorage:", response.token); 
                setTimeout(() => {
                    navigate('/home');
                }, 1500);
            }
        } catch (error) {
            setError('Credenziali non valide. Riprova.');
        }
    };

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLoginWithGithub = () => {
        window.location.href = `${process.env.REACT_APP_SERVER_BASE_URL}/auth/github`;
    };

    const handleLoginWithGoogle = () => {
        window.location.href = `${process.env.REACT_APP_SERVER_BASE_URL}/auth/google`;
    };

    return (
        <>
            <form onSubmit={onSubmit} className={`card-body ${styles.cardbodyColor} p-lg-5`}>
                <div className="text-center"></div>
                 <div className="mb-3">
                    <input
                        onChange={onChangeInput}
                        type="email"
                        className="form-control"
                        name="email"
                        aria-describedby="emailHelp"
                        placeholder="Inserisci la tua email..."
                        required
                    />
                </div>

                <div className="mb-3">
                    <input
                        onChange={onChangeInput}
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Inserisci la tua password"
                        required
                    />
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <div className="text-center">
                    <button type="submit" className="btn btn-dark px-5 mb-5 w-100">
                        Login
                    </button>
                </div>

                <div
                    onClick={() => toggleForm()}
                    id="emailHelp"
                    className="form-text text-center mb-5 text-white"
                >
                    Non sei registrato?
                    <a href="#!" className="text-white fw-bold ms-1">
                        Registrati ora!
                    </a>
                </div>  
                            <button
                    onClick={handleLoginWithGithub}
                    className="btn btn-dark px-5 mb-3 w-100"
                >
                    <span className="me-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-github"
                            viewBox="0 0 16 16"
                        >
                            <path
                                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
                            />
                        </svg>
                    </span>
                    Login con Github
                </button>
                <button
    onClick={handleLoginWithGoogle}
    className="btn btn-danger px-5 mb-3 w-100"
>
    <span className="me-2">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-google"
            viewBox="0 0 16 16"
        >
            <path
                d="M8 0C3.582 0 0 3.582 0 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm2.706 11.647h-.001l-1.317-.001c-.516 0-.938-.416-.938-.932v-.001c0-.516.421-.938.937-.938h.001c.516 0 .939.422.939.938v.001c0 .258-.107.486-.278.655-.181.18-.414.28-.659.28zm-.121-1.641a3.68 3.68 0 0 0 1.234-2.741c0-.773-.234-1.488-.638-2.08h-2.325v1.826h1.314c-.061.325-.206.607-.42.815-.238.22-.539.337-.886.337-.678 0-1.23-.58-1.23-1.291s.552-1.292 1.23-1.292c.328 0 .606.123.808.326l.56-.54A2.814 2.814 0 0 0 8.083 4c-.788 0-1.456.266-1.946.73a3.454 3.454 0 0 0-2.415-.941c-.849 0-1.595.364-2.125.943-.512.566-.793 1.3-.793 2.13s.281 1.565.794 2.132c.53.58 1.278.944 2.126.944.66 0 1.235-.224 1.726-.61l-.604-.558c-.228-.211-.518-.33-.852-.33-.646 0-1.168.562-1.168 1.256s.522 1.255 1.168 1.255c.637 0 1.157-.578 1.168-1.298h-1.168v-1.032h2.01c.479.563.745 1.294.745 2.088 0 1.695-1.361 3.075-3.044 3.075z"
            />
        </svg>
    </span>
    Login con Google
</button>
            </form>
          
  
            
        </>
    );
};

export default LoginForm;

