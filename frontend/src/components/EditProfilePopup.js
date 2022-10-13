import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    e.preventDefault();
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ name, about: description });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактирование профиля"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-container">
        <input
          type="text"
          id="user-name"
          name="name"
          className="popup__input popup__input_text_user-name"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
          value={name || ""}
          onChange={handleNameChange}
        />
        <span
          className="popup__error user-name-error"
          id="error-user-name"
        ></span>
      </div>
      <div className="popup__input-container">
        <input
          type="text"
          id="user-job"
          name="about"
          className="popup__input popup__input_text_user-job"
          placeholder="О себе"
          required
          minLength="2"
          maxLength="200"
          value={description || ""}
          onChange={handleDescriptionChange}
        />
        <span
          className="popup__error user-job-error"
          id="error-user-job"
        ></span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
