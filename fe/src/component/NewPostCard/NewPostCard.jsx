import React from 'react';
import {convertDateIntoHuman} from "../../helpers/convertDate";
import styles from './NewPostCard.module.css'

const NewPostCard = ({
    Users,
    title,
    cover,
    description,
    pubDate,
    isFeatured,
}) => {

    return (
        <div className="card position-relative">
            <img src={cover} className="card-img-top" alt={title}/>
            <div className="card-body">
                <div className={`badge bg-warning text-dark ${styles.isFeatured}`}>
                    {isFeatured ? 'Featured' : ''}
                </div>
                <h5 className="card-title">{title}</h5>
                <p className="card-text">
                    {description}
                </p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    {Users}
                </li>
                <li className="list-group-item">
                    {convertDateIntoHuman(pubDate)}
                </li>
            </ul>
        </div>
    );
};

export default NewPostCard;