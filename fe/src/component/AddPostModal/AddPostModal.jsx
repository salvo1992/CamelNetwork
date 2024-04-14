import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

const AddNewPostModal = ({ close, show, setShow }) => {
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({});
    const [token, setToken] = useState(localStorage.getItem('token')); // Recupera il token JWT memorizzato

    const onChangeHandleFile = (e) => {
        setFile(e.target.files[0]);
    };

    const onChangeHandleInput = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const uploadFile = async () => {
        const fileData = new FormData();
        fileData.append('uploadImg', file);

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/Newpost/cloudUploadImg`, {
                method: 'POST',
                body: fileData,
            });
            return await response.json();
        } catch (e) {
            console.log(e.message);
        }
    };

    const submitnewpost = async (e) => {
        e.preventDefault();
        const currentDate = new Date().toISOString().slice(0, 16);
        setFormData({
            ...formData,
            pubDate: currentDate,
        });

        if (file) {
            try {
                const uploadedFile = await uploadFile(file);
                const bodyToSend = {
                    ...formData,
                    cover: uploadedFile.source,
                };
                const token = localStorage.getItem('auth');
                const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/newpost/create`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token // Aggiungi il token nell'header Authorization
                    },
                    body: JSON.stringify(bodyToSend),
                });
                return await response.json();
            } catch (e) {
                console.log(e.message);
            }
        }
    };

    return (
        <Modal show={show}>
            <Modal.Header onClick={() => close()} closeButton>
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form encType="multipart/form-data" className="d-flex flex-column gap-3" onSubmit={submitnewpost}>
                    <input
                        name="title"
                        className="form-control"
                        type="text"
                        placeholder="titolo del post"
                        onChange={onChangeHandleInput}
                    />
                    <input onChange={onChangeHandleFile} type="file" className="form-control" name="uploadImg" />
                    <input
                        onChange={onChangeHandleInput}
                        type="text"
                        name="description"
                        className="form-control"
                        placeholder="inserisci descrizione"
                    />
                    <input
                        type="datetime-local"
                        className="form-control"
                        name="pubDate"
                        readOnly={true} // Impediamo all'utente di modificare la data
                        value={formData.pubDate || ''} // Visualizziamo la data nel formato corretto
                    />
                    <select onChange={onChangeHandleInput} name="isFeatured" className="form-control">
                        <option selected disabled>
                            Scegli opzione Featured
                        </option>
                        <option value="true">Featured</option>
                        <option value="false">Not Featured</option>
                    </select>
                    <button type="submit" className="btn btn-primary pt-2">
                        Aggiungi Post
                    </button>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default AddNewPostModal;

