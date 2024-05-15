import React, { useState } from 'react';
import './pages.css'; // Assicurati di importare correttamente il file CSS
import LoginForm from "../component/loginForm/LoginForm";
import SignupForm from "../component/signupForm/SignUpForm";
import Styles from "./login.module.css";
const Login = () => {
    const [showSignupForm, setShowSignupForm] = useState(false)

    const toggleForm = () => setShowSignupForm(!showSignupForm)

    return (
        <div className= {Styles.pagecontainer}>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-5 col-lg-5 loginContainer">
                        <h2 className="text-center mt-5 loginHeader">
                            CamelNetwork Login
                               Benvenuti
                        </h2>
                        <div className={Styles.login}>
                            {showSignupForm ? (
                                <SignupForm toggleForm={toggleForm} />
                            ) : <LoginForm toggleForm={toggleForm} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
