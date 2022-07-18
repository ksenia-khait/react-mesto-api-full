import React from 'react';
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ cards, onCardLike, onCardDelete, onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="intro">
                <div className="intro__profile">
                    <div className="intro__image" style={{backgroundImage: `url(${currentUser.avatar})`}}>
                        <div className="intro__image-hovered" onClick={onEditAvatar}></div>
                    </div>
                    <div className="intro__description">
                        <div className="intro__name-box">
                            <h1 className="intro__name">{currentUser.name}</h1>
                            <button className="intro__edit" onClick={onEditProfile}></button>
                        </div>
                        <p className="intro__capture">{currentUser.about}</p>
                    </div>
                </div>
                <button className="intro__add-button" onClick={onAddPlace}></button>
            </section>
            <section className="grid">
                {
                    cards.map((card) => {
                        return (
                            <Card card={card} key={card._id} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
                        );
                    })
                }
            </section>
        </main>
    );
}

export default Main;