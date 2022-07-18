import React from 'react';

function ImagePopup({card, onClose}) {
    return (
        <div className={`popup popup-image ${card && "popup_opened"}`}>
            <div className="popup-image__container container">
                <button className="popup-image__close popup__close" onClick={onClose}></button>
                <img alt={card ? card.name : ""} className="popup-image__image" src={card ? card.link : ""}/>
                <p className="popup-image__capture">{card ? card.name : ""}</p>
            </div>
        </div>
    );
}

export default ImagePopup;