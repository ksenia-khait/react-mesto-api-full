import React, {useEffect} from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({avatar: avatarRef.current.value});
        avatarRef.current.value = "";
    }

    useEffect(() => {
        avatarRef.current.value = "";
    }, []);


    return (
        <PopupWithForm title={"Обновить аватар?"}
                       name={"avatar"}
                       isOpen={isOpen}
                       onClose={onClose}
                       buttonText={"Да"}
                       onSubmit={handleSubmit}>
            <input
                type="url"
                className="form__capture new-item-form__capture form__input "
                name="src"
                id="avatar-link"
                placeholder="Ссылку на картинку"
                required
                ref={avatarRef}
            />
            <span id="avatar-link-error" className="error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;