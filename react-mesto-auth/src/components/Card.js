import React from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        ` ${isOwn ? 'grid__trash' : 'grid__trash_hidden'}`
    );

    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `grid__heart ${
        isLiked && "grid__heart_active"
    }`;

    function handleClick() {
        onCardClick(card)
    }

    function handleLikeClick() {
        onCardLike(card)
    }

    function handleCardDelete() {
        onCardDelete(card)
    }

    return (
        <div className="grid__item">
            <div className={cardDeleteButtonClassName} onClick={handleCardDelete}/>
            <img className="grid__image" alt={card.name} src={card.link} onClick={handleClick}/>
            <div className="grid__text-box">
                <h2 className="grid__text">{card.name}</h2>
                <div className="grid__heart-container">
                    <button className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <span className="grid__heart_counter">{card.likes.length}</span>
                </div>
            </div>
        </div>
    );
}

export default Card;