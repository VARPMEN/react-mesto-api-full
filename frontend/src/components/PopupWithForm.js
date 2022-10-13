import React from "react";
import closeIcon from "../images/close-icon.svg";

function PopupWithForm({
  title,
  name,
  buttonText,
  isOpen,
  onClose,
  children,
  onSubmit,
}) {
  return (
    <section
      className={`popup popup_${name} ${isOpen && "popup_opened"}`}
      aria-label={`${title}`}
    >
      <div className="popup__container">
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
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={`form-${name}`} onSubmit={onSubmit}>
          {children}
          <button className="popup__submit-btn" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
