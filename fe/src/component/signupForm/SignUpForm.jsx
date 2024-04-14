import React, { useState } from 'react';

const SignupForm = ({ toggleForm }) => {
    const [signupFormData, setSignupFormData] = useState({});

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        const newValue = name === 'age' ? Number(value) : value;
        setSignupFormData({
            ...signupFormData,
            [name]: newValue,
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(process.env.REACT_APP_SERVER_BASE_URL);
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/createUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupFormData)
            });
            
            if (response.ok) {
                // Successo, puoi gestire la risposta qui
            } else {
                // Gestione degli errori
                throw new Error('Errore nella richiesta di registrazione');
            }
        } catch (error) {
            console.error('Si è verificato un errore durante la registrazione:', error.message);
        }
    };

    return (
        <form
            onSubmit={onSubmit}
            className="card-body cardbody-color p-lg-5"
        >
            <div className="text-center">
                <img
                    src="https://img.freepik.com/premium-photo/camel-wearing-suit-jacket-with-tie_759095-23484.jpg"
                    className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                    width="200px"
                    alt="profile"
                />
            </div>

            <div className="mb-3">
                <input
                    onChange={onChangeInput}
                    type="text"
                    className="form-control"
                    name="firstName"
                    aria-describedby="firstNameHelp"
                    placeholder="Inserisci il tuo nome"
                    required
                />
            </div>

            <div className="mb-3">
                <input
                    onChange={onChangeInput}
                    type="text"
                    className="form-control"
                    name="lastName"
                    aria-describedby="lastNameHelp"
                    placeholder="Inserisci il tuo cognome"
                    required
                />
            </div>

            <div className="mb-3">
                <input
                    onChange={onChangeInput}
                    type="email"
                    className="form-control"
                    name="email"
                    aria-describedby="emailHelp"
                    placeholder="Inserisci la tua email"
                    required
                />
            </div>

            <div className="mb-3">
                <input
                    onChange={onChangeInput}
                    type="password"
                    className="form-control"
                    name="password"
                    aria-describedby="passwordHelp"
                    placeholder=" password di almeno 8 caracteres"
                    required
                />
            </div>

            <div className="mb-3">
                <input
                    onChange={onChangeInput}
                    type="number"
                    className="form-control"
                    name="age"
                    aria-describedby="ageHelp"
                    placeholder="Inserisci la tua età"
                    required
                />
            </div>

            <div className="text-center">
                <button
                    type="submit"
                    className="btn btn-primary px-5 mb-5 w-100"
                >
                    Registrati
                </button>
            </div>

            <div
                onClick={() => toggleForm()}
                id="emailHelp"
                className="form-text text-center mb-5 text-dark"
            >
                Sei già registrato?
                <a href="#" className="text-dark fw-bold ms-1">
                    Effettua il login!
                </a>
            </div>
        </form>
    );
};

export default SignupForm;