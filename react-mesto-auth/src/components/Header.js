import React from 'react';
import logo from '../images/Vector.svg'
import { Switch, Route, Link } from "react-router-dom";


function Header({ email, handleLogout }) {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип"/>
            <div className="header__content">
                <Switch>
                    <Route exact path="/sign-in">
                        <Link to="/sign-up" className="header__link">Регистрация</Link>
                    </Route>
                    <Route exact path="/sign-up">
                        <Link to="/sign-in" className="header__link">Вход</Link>
                    </Route>
                    <Route exact path="/">
                        <p className="header__email" >{email}</p>
                        <Link to="/sign-in" className="header__link" onClick={handleLogout} >Выйти</Link>
                    </Route>
                </Switch>
            </div>
        </header>
    );
}

export default Header;