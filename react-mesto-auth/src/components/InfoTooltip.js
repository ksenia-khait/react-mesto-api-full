import React from "react";
import success from '../images/success-tick.svg'
import fail from '../images/fail-cross.svg'

function InfoTooltip({ isOpen, onClose,  isSignUp }) {
    return (
        <div className={`tooltip popup_type_tooltip ${isOpen ? "tooltip_opened" : " "}`}>
            <div className="popup__tooltip-container">
                <button className="popup__close" id="cross" onClick={onClose}></button>
                <img className="popup__tooltip-img"  src={isSignUp ? success : fail} alt={'Иконка'} />
                <h2 className="popup__tooltip-text">{isSignUp ? 'Вы успешно зарегистрировались' : 'Что-то пошло не так! Попробуйте еще раз.'}</h2>
            </div>
        </div>
    )
}

export default InfoTooltip;
