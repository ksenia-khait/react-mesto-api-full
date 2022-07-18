import React, {useState, useEffect} from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [nameError, setNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');

    function handleNameChange(e) {
        setName(e.target.value);

        if (e.target.value !== '') {
            setNameError('')
            if(e.target.value.length < 2 ) {
                setNameError('Поле должно содержать не менее 2 знаков')
            }
        } else {
            setNameError('Поле не может быть пустым')
        }
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
        if (e.target.value !== '') {
            setDescriptionError('')
            if(e.target.value.length < 2 ) {
                setDescriptionError('Поле должно содержать не менее 2 знаков')
            }
        } else {
            setDescriptionError('Поле не может быть пустым')
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser(name, description);
        // setName(currentUser.name);
        // setDescription(currentUser.about)
    }

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about)

    }, [currentUser]);

    return (
        <PopupWithForm title={"Редактировать профиль"}
                       name={"profile"}
                       isOpen={isOpen}
                       onClose={onClose}
                       buttonText={'Сохранить'}
                       onSubmit={handleSubmit}>

            <input type="text"
                   className="form__name profile-form__name form__input"
                   name="name"
                   id="profile-name"
                   placeholder="Имя"
                   minLength="2"
                   maxLength="40"
                   required
                   onChange={handleNameChange}
                   value={name || ''}
            />
            <div id="profile-name-error" className="error">{nameError}</div>
            <input
                type="text"
                className="form__capture profile-form__capture form__input"
                name="description"
                id="profile-capture"
                placeholder="О себе"
                minLength="2"
                maxLength="200"
                required
                onChange={handleDescriptionChange}
                value={description || ''}
            />
            <div id="profile-capture-error" className="error">{descriptionError}</div>
        </PopupWithForm>
    )
}
// const [values, setValues] = useState({name: '', description: ''})
//
// function handleChange(e) {
//     const {name, value} = e.target
//     setValues((prev) => ({
//         ...prev,
//         [name]: value
//     }))
// }

// useEffect(() => {
//     if (nameError || descriptionError) {
//         setFormValid(false)
//     } else {
//         setFormValid(true)
//     }
// }, [nameError, descriptionError])
export default EditProfilePopup