import React from 'react';

function PopupWithForm({ formValid, title, name,  isOpen, onClose, children, buttonText, onSubmit }) {

    return (
        <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : " "}`}>
            <div className="popup__container container">
                <button className="popup__close" id="cross" onClick={onClose}></button>
                <p className="popup__text">{title}</p>
                <form className={`form popup__form_${name}`}  name="form" onSubmit={onSubmit} >
                    {children}
                    <button
                        type="submit"
                        className="form__button"
                        name="button"
                        onClick={onClose}
                        // disabled={!formValid}
                    >{buttonText}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;