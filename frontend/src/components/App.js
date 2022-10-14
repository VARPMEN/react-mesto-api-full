import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import * as auth from "../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

function App() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  function handleRegister(password, email) {
    auth
      .register(password, email)
      .then((res) => {
        setEmail(res.email);
        setIsSuccess(true);
        history.push("/sign-in");
      })
      .catch(() => {
        setIsSuccess(false);
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      });
  }

  function handleLogin(password, email) {
    auth
      .authorize(password, email)
      .then((token) => {
        auth.checkToken(token).then((res) => {
          setEmail(res.email);
          setLoggedIn(true);
          history.push("/");
        });
      })
      .catch((err) => console.log(err));
  }

  // useEffect(() => {
  //   tokenCheck();
  // }, []);

  // function tokenCheck() {
  //   auth
  //     .checkToken()
  //     .then((res) => {
  //       if (res) {
  //         setLoggedIn(true);
  //         setEmail(res.email);
  //         history.push("/");
  //        }
  //     })
  //     .catch((err) => console.log(err));
  // }

  function handleExitClick() {
    auth.logOut();
    setLoggedIn(false);
    setCards([]);
    setCurrentUser({});
    history.push('/signin');
  }

  useEffect(() => {
    if (loggedIn) {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((res) => console.log(res));
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
    api
      .getUserInfo()
      .then((item) => {
        setCurrentUser(item);
      })
      .catch((res) => console.log(res.status));
    }
  }, [loggedIn]);

  function handleCardClick(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((res) => console.log(res));
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((state) => state.filter((i) => i._id !== card._id));
      })
      .catch((res) => console.log(res));
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((res) => console.log(res));
  }

  function handleUpdateAvatar(data) {
    api
      .setUserAvatar(data)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((res) => console.log(res));
  }

  function handleAddPlace(data) {
    api
      .setNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((res) => console.log(res));
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  function onCardClick(card) {
    setSelectedCard(card);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} isLoggedIn={loggedIn} onClick={handleExitClick} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            loggedIn={loggedIn}
            onAddPlace={handleAddPlaceClick}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={onCardClick}
            cards={cards}
            onCardLike={handleCardClick}
            onCardDelete={handleCardDelete}
          />
          <Route path="/sign-in">
            <Login onAuthtorize={handleLogin} />
          </Route>
          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>
        </Switch>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupWithForm
          name="confirm-remove"
          title={`Вы уверены&#63`}
          buttonText="Да"
          onClose={closeAllPopups}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          isSuccess={isSuccess}
          onClose={closeAllPopups}
          isOpen={isInfoTooltipOpen}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
