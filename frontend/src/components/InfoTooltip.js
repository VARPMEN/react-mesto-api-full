import closeIcon from "../images/close-icon.svg";
import successIcon from "../images/success-pic.svg";
import failureIcon from "../images/failure-pic.svg";

function InfoTooltip({ onClose, isOpen, isSuccess }) {
  return (
    <section
      className={`popup ${isOpen && "popup_opened"}`}
      aria-label="Информационное окно"
    >
      <div className="popup__container info-tool__container">
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
        <img
          className="info-tool__image"
          src={isSuccess ? successIcon : failureIcon}
          alt={isSuccess ? "Успешно" : "Неудачно"}
        />
        <h2 className="popup__title info-tool__title">
          {isSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте еще раз."}
        </h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
