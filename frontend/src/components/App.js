import React, {useEffect, useState,} from "react";
import {Switch, Route, useHistory} from "react-router-dom";
import {api} from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import Header from './Header';
import Main from './Main';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import Footer from './Footer';
import Login from './Login';
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isSignUpPopupOpen, setIsSignUpPopupOpen] = useState(false);

    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [email, setEmail] = useState('');
    const [isSignUp, setIsSignup] = useState(false);

    const history = useHistory();

    function handleRegister(password, email) {
        return auth
            .register(password, email)
            .then(() => {
                setIsSignup(true);
                setIsSignUpPopupOpen(true)
                setTimeout(() => {
                    setIsSignUpPopupOpen(false);
                }, 2000);
                history.push('/sign-in');
            })
            .catch((err) => {
                console.log(err.message)
                setIsSignup(false);
                setIsSignUpPopupOpen(true)
            })
    }

    function handleLogin(password, email) {
        return auth
            .authorize(password, email)
            .then((res) => {
                if (res.token) {
                    localStorage.setItem('jwt', res.token);
                    checkToken();
                }
            })

            .catch((err) => {
                console.log(err.message);
                setIsSignup(false);
                setIsSignUpPopupOpen(true);
            })
    }

    useEffect(() => {
        let token = localStorage.getItem('jwt');
        if (isLoggedIn) {
            api.getProfile(token)
                .then((data) => setCurrentUser(data))
                .catch(err => console.log(err));

            api.getInitialCards(token)
                .then((cards) => {
                    setCards(cards);
                })
                .catch(err => console.log(err))

        }
    }, [isLoggedIn]);

    function checkToken() {
        let token = localStorage.getItem('jwt');
        if (token) {
            auth.getContent(token)
                .then((res) => {
                    setEmail(res.email);
                    setIsLoggedIn(true);
                    history.push('/');
                })
                .catch((err) => console.log(err.message));
        }
    }

    function handleUpdateUser(name, about) {
        const token = localStorage.getItem('jwt');
        if (token) {
            api.editProfile(name, about, token)
                .then(({data}) => {
                    setCurrentUser({name: data.name, about: data.about, avatar: data.avatar});
                    closeAllPopups();
                })
                .catch(err => console.log(err))
        }
    }

    function handleAddPlaceSubmit(name, link) {
        const token = localStorage.getItem('jwt');
        if (token) {
            api.addCard(name, link, token)
                .then(({card}) => {
                    setCards([{name: card.name, link: card.link, owner: card.owner, likes: card.likes, _id: card._id}, ...cards])
                })
                .catch(err => console.log(err))
        }
    }

    function handleUpdateAvatar(avatar) {
        const token = localStorage.getItem('jwt');
        if (token) {
            api.editAvatar(avatar.avatar, token)
                .then((avatar) => {
                    setCurrentUser(avatar);
                    closeAllPopups();
                })
                .catch(err => console.log(err))
        }
    }

    function handleCardLike(card) {
        const token = localStorage.getItem('jwt');
        if (token) {
            const isLiked = card.likes.some((item) => item === currentUser._id);
            const changeLikeCardStatus = !isLiked
                ? api.addLike(card._id, token)
                : api.deleteLike(card._id, token)
            changeLikeCardStatus
                .then((newCard) => {
                    setCards((state) => state.map((c) => c._id === card._id ? newCard.card : c));
                })
                .catch(err => console.log(err))
        }
    }

    function handleCardDelete(card) {
        const token = localStorage.getItem('jwt');
        if (token) {
            api.deleteCard(card._id, token)
                .then(() => {
                    setCards((cards) => cards.filter((c) => c._id !== card._id));
                })
                .catch(err => console.log(err))
        }
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card)
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard(null);
        setIsSignUpPopupOpen(false)
    }

    function handleSignOut() {
        localStorage.removeItem('jwt');
        setEmail('');
        setIsLoggedIn(false);
        history.push('/sign-in');
    }

    useEffect(() => {
        checkToken();
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            history.push('/');
        }
    }, [isLoggedIn, history]);

    return (

        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">

                <Header onSignOut={handleSignOut} email={email} isloggedIn={isLoggedIn}/>

                <Switch>
                    <ProtectedRoute exact path='/' isLoggedIn={isLoggedIn}>
                        <Main
                            cards={cards}
                            onCardLike={handleCardLike}
                            onCardDelete={handleCardDelete}
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onEditAvatar={handleEditAvatarClick}
                            onCardClick={handleCardClick}>
                        </Main>
                    </ProtectedRoute>

                    <Route path='/sign-up'>
                        <Register title={'Регистрация'} onRegister={handleRegister} buttonText={'Зарегистрироваться'}/>
                    </Route>

                    <Route path='/sign-in'>
                        <Login title={'Вход'} onLogin={handleLogin} buttonText={'Войти'}/>
                    </Route>
                </Switch>

                <Footer/>
            </div>

            <InfoTooltip
                onClose={closeAllPopups}
                isOpen={isSignUpPopupOpen}
                isSignUp={isSignUp}/>

            <EditProfilePopup isOpen={isEditProfilePopupOpen}
                              onClose={closeAllPopups}
                              onUpdateUser={handleUpdateUser}/>

            <AddPlacePopup isOpen={isAddPlacePopupOpen}
                           onClose={closeAllPopups}
                           buttonText={'Сохранить'}
                           onAddPlace={handleAddPlaceSubmit}/>

            <PopupWithForm title={"Вы уверены?"}
                           name={"image"}
                           onClose={closeAllPopups}
                           buttonText={"Да"}>
            </PopupWithForm>

            <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                             onClose={closeAllPopups}
                             onUpdateAvatar={handleUpdateAvatar}/>

            <ImagePopup card={selectedCard}
                        onClose={closeAllPopups}/>

        </CurrentUserContext.Provider>

    );
}

export default App;
