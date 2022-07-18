import React, {useState, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

    const [values, setValues] = useState({name: '', src: ''})

    function handleChange(e) {
        const {name, value} = e.target
        setValues((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault(e);
        onAddPlace(values.name, values.src);
    }

    useEffect(() => {
        setValues({name: '', src: ''});
    }, [])

    return (
        <PopupWithForm title={"Новое место"}
                       name={"new-item"}
                       isOpen={isOpen}
                       onClose={onClose}
                       buttonText={'Сохранить'}
                       onSubmit={handleSubmit}
                       onAddPlace={onAddPlace}>
            <input
                type="text"
                value={values.name}
                className="form__name new-item-form__name form__input"
                name="name"
                id="card-name"
                minLength="2"
                maxLength="30"
                placeholder="Название"
                required
                onChange={handleChange}
            />
            <span id="card-name-error" className="error"></span>
            <input
                type="url"
                value={values.src}
                className="form__capture new-item-form__capture form__input"
                name="src"
                id="image-link"
                placeholder="Ссылку на картинку"
                required
                onChange={handleChange}
            />
            <span id="image-link-error" className="error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;
