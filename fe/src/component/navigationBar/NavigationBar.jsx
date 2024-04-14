import React, { useState } from 'react';
import useSession from '../../hooks/useSession';
import AddNewPostModal from '../AddPostModal/AddPostModal';
import { Link } from 'react-router-dom'; // Assicurati di importare Link dal router di React che stai utilizzando

const NavigationBar = () => {
    const [isAddNewPostModalOpen, setIsAddNewPostModalOpen] = useState(false);
    const session = useSession();
    const toggleAddNewPostModal = () => setIsAddNewPostModalOpen(!isAddNewPostModalOpen);

    return (
        <>
            <nav className="navbar bg-body-tertiary">
                <div className="container">
                    <div className="row w-100">
                        <div className="col-3">
                            <a className="navbar-brand d-flex align-items-center" href="/">
                                <img
                                    src="https://picsum.photos/340/340"
                                    alt="Logo"
                                    width="50"
                                    height="50"
                                    className="d-inline-block align-text-top rounded-circle me-3"
                                />
                                Epibooks
                            </a>
                        </div>
                        <div className="col-9 d-flex justify-content-end align-items-center">
                            <ul className="d-flex justify-content-end align-items-center list-unstyled gap-3">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/">
                                        Home
                                    </a>
                                </li>
                               <li className="nav-item">
                                    <Link className="nav-link" to="/contatti">
                                        Contattaci
                                    </Link>
                                </li>
                                {session && (
                                    <li className="nav-item">
                                        <button onClick={toggleAddNewPostModal} className="btn btn-primary">
                                            Aggiungi Post
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            {isAddNewPostModalOpen && (
                <AddNewPostModal
                    show={isAddNewPostModalOpen}
                    setShow={setIsAddNewPostModalOpen}
                    close={toggleAddNewPostModal}
                />
            )}
        </>
    );
};

export default NavigationBar;