import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import deleteBtnIcon from "../images/delete-btn-icon.svg";

const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id !== currentUser._id;
  const cardDeleteBtnClass = `element__delete-btn ${
    isOwn && "element__delete-btn_inactive"
  }`;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const likeDeleteBtnClass = `element__like-btn ${
    isLiked && "element__like-btn_active"
  }`;

  return (
    <article className="element">
      <img
        src={card.link}
        alt={card.name}
        className="element__image"
        onClick={handleCardClick}
      />
      <button className={cardDeleteBtnClass} type="button" aria-label="Удалить">
        <img
          src={deleteBtnIcon}
          alt="Удалить"
          className="element__delete-btn-icon"
          onClick={handleDeleteClick}
        />
      </button>
      <div className="element__container">
        <h2 className="element__name">{card.name}</h2>
        <div className="element__like-container">
          <button
            className={likeDeleteBtnClass}
            type="button"
            aria-label="Поставить лайк"
            onClick={handleLikeClick}
          ></button>
          <p className="element__counter-likes">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
};
export default Card;
