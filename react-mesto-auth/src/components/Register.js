import React, {useState} from 'react';
import {Link} from 'react-router-dom'

function Register({title, buttonText, onRegister}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleEmailChange(e) {
        setEmail(e.target.value)
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        onRegister(password, email);
    }

    return (
        <div className="auth__container">
            <p className="auth__title">{title}</p>
            <form className="auth-form"  onSubmit={handleSubmit}>
                <input
                    className="auth-form__email auth-form__input"
                    type="email"
                    placeholder="Email"
                    required
                    name='email'
                    onChange={handleEmailChange}

                />
                <input
                    className=" auth-form__password auth-form__input"
                    type="password"
                    placeholder="Пароль"
                    required
                    name='password'
                    onChange={handlePasswordChange}
                />
                <button
                    type="submit"
                    className="auth-form__button"
                    name="button"
                >{buttonText}</button>
            </form>

            <div className="auth-form__register-caption">
                <p className="register__login-link">Уже зарегистрированы?&nbsp;</p>
                <Link to="/sign-in" className="register__login-link">
                    Войти</Link>
            </div>
        </div>
    );
}

export default Register;