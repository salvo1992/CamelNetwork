import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';

const AddNewPostModal = ({ close, show, setShow }) => {
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({});
    const [token, setToken] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('auth');
        if (storedToken) {
            setToken(JSON.parse(storedToken));
            console.log("Token recuperato dal localStorage:", JSON.parse(storedToken));
        }
    }, []);

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
                headers: {
                    'Authorization': token
                }
            });
            console.log("Risposta dall'upload:", response);
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
            firstName: token.firstName,
            lastName: token.lastName
        });
    
        if (file) {
            try {
                const uploadedFile = await uploadFile(file);
                console.log("File caricato:", uploadedFile);
                const bodyToSend = {
                    ...formData,
                    cover: uploadedFile.source,
                };
                const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/newpost/create`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: JSON.stringify(bodyToSend),
                });
                console.log("Risposta dalla creazione del post:", response);
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
                        onChange={onChangeHandleFile}
                        type="file"
                        className="form-control"
                        name="uploadImg"
                    />
                    <input
                        onChange={onChangeHandleInput}
                        type="text"
                        name="title"
                        className="form-control"
                        placeholder="Title"
                    />
                    <input
                        onChange={onChangeHandleInput}
                        type="text"
                        name="description"
                        className="form-control"
                        placeholder="Description"
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
                            Select Featured Option
                        </option>
                        <option value="true">Featured</option>
                        <option value="false">Not Featured</option>
                    </select>
                    <button type="submit" className="btn btn-primary pt-2">
                        Add Post
                    </button>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default AddNewPostModal;