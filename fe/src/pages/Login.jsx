import React, { useState } from 'react';
import './pages.css'; // Assicurati di importare correttamente il file CSS
import LoginForm from "../component/loginForm/LoginForm";
import SignupForm from "../component/signupForm/SignUpForm";

const Login = () => {
    const [showSignupForm, setShowSignupForm] = useState(false)

    const toggleForm = () => setShowSignupForm(!showSignupForm)

    return (
        <div className="page-container"> {/* Usa una classe CSS per applicare lo stile di sfondo */}
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-5 col-lg-5 loginContainer">
                        <h2 className="text-center mt-5 loginHeader">
                            CamelNetwork Login
                        </h2>
                        <div className="card my-5">
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
