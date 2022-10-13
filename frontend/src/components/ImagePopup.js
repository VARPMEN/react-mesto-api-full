import React from "react";
import closeIcon from "../images/close-icon.svg";

function ImagePopup({ card, onClose }) {
  return (
    <section
      className={`popup popup_photo_fullsize popup_dark_overlay ${
        card && "popup_opened"
      }`}
      aria-label="Полный размер"
    >
      <figure className="fullscreen-image">
        <img
          src={card && card.link}
          alt={card && card.name}
          className="fullscreen-image__picture"
        />
        <button
          className="popup__close-btn"
          type="button"
          aria-label="Закрыть окно"
          onClick={onClose}
        >
          <img
            src={closeIcon}
            alt="Закрыть"
            className="popup__close-btn-icon"
          />
        </button>
        <figcaption>
          <p className="fullscreen-image__caption">{card && card.name}</p>
        </figcaption>
      </figure>
    </section>
  );
}

export default ImagePopup;
