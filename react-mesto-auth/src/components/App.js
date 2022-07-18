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
import {register, authorize, getContent} from "../utils/auth"

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

    useEffect(() => {
        api.getProfile()
            .then((data) => {
                setCurrentUser(data);
            })
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        api.getInitialCards()
            .then((cards) => setCards(cards))
            .catch(err => console.log(err))
    }, [])

    function handleUpdateUser(name, about) {
        api.editProfile(name, about)
            .then((item) => {
                setCurrentUser(item);
                closeAllPopups();
            })
            .catch(err => console.log(err))
    }

    function handleAddPlaceSubmit(name, link) {
        api.addCard(name, link)
            .then((newCard) => {
                setCards([newCard, ...cards])
            })
            .catch(err => console.log(err))
    }

    function handleUpdateAvatar(avatar) {
        api.editAvatar(avatar.avatar)
            .then((item) => {
                setCurrentUser(item);
                closeAllPopups();
            })
            .catch(err => console.log(err))
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        const changeLikeCardStatus = !isLiked
            ? api.addLike(card._id)
            : api.deleteLike(card._id)
        changeLikeCardStatus
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(err => console.log(err))
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((cards) => cards.filter((c) => c._id !== card._id));
            })
            .catch(err => console.log(err))
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

    function handleRegister(password, email) {
        return register(password, email)
            .then(res => {
                if (res.data._id) {
                    setIsSignup(true);
                    setIsSignUpPopupOpen(true)
                    setTimeout(() => {
                        setIsSignUpPopupOpen(false);
                    }, 2000);
                    history.push('/sign-in');
                } else {
                    setIsSignup(false);
                    setIsSignUpPopupOpen(true)
                }
            })
            .catch((err) => {
                console.log(err.message)
                setIsSignup(false);
                setIsSignUpPopupOpen(true)
            })
    }

    function handleLogin(password, email) {
        return authorize(password, email)
            .then(data => {
                localStorage.setItem('jwt', data.token);
                setEmail(email);
                setIsSignup(true);
                history.push('/')
            })

            .catch((err) => {
                console.log(err.message);
                setIsSignup(false);
                setIsSignUpPopupOpen(true);
            })
    }

    function checkToken() {
        if (localStorage.getItem('jwt')) {
            let token = localStorage.getItem('jwt');
            getContent(token)
                .then((res) => {
                    setEmail(res.data.email);
                    setIsLoggedIn(true);
                })
                .catch((err) => console.log(err.message));
        }
    }

    useEffect(() => {
        checkToken();
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            history.push('/')
        }
    }, [isLoggedIn]);

    function handleSignOut() {
        localStorage.removeItem('jwt');
        setEmail('');
        setIsLoggedIn(false);
        history.push('/sign-in');
    }

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
