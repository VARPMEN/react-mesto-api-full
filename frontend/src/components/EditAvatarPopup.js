import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="change-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-container">
        <input
          type="url"
          id="avatar"
          name="avatar"
          className="popup__input popup__input_src_image"
          placeholder="Ссылка на картинку"
          ref={avatarRef}
          required
        />
        <span className="popup__error avatar-error" id="error-avatar"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
