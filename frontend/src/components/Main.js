import { useContext } from "react";
import Card from "./Card";
import editBtnIcon from "../images/edit-button-icon.svg";
import addBtnIcon from "../images/add-button-icon.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile container" aria-label="Профиль">
        <div className="profile__info-block">
          <div className="profile__avatar-block">
            <img
              src={currentUser.avatar}
              alt="Ваш аватар"
              className="profile__avatar"
            />
            <div className="profile__avatar-overlay" onClick={onEditAvatar}>
              <img
                src={editBtnIcon}
                alt="Редактирование"
                className="profile__overlay-icon"
              />
            </div>
          </div>
          <div className="profile__info">
            <div className="profile__info-container">
              <h1 className="profile__user-name">{currentUser.name}</h1>
              <button
                className="profile__edit-button"
                type="button"
                aria-label="Редактировать профиль"
                onClick={onEditProfile}
              >
                <img
                  src={editBtnIcon}
                  alt="Редактирование"
                  className="profile__edit-button-icon"
                />
              </button>
            </div>
            <p className="profile__user-job">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить публикацию"
          onClick={onAddPlace}
        >
          <img
            src={addBtnIcon}
            alt="Добавить публикацию"
            className="profile__add-button-icon"
          />
        </button>
      </section>

      <section className="elements container" aria-label="Галерея">
        {cards.map((item) => {
          return (
            <Card
              key={item._id}
              card={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
