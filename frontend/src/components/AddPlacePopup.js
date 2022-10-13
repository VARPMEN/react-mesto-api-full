import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name, link });
  }

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add-element"
      title="Добавить место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-container">
        <input
          type="text"
          id="title"
          name="name"
          className="popup__input popup__input_text_title"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          value={name}
          onChange={handleNameChange}
        />
        <span className="popup__error title-error" id="error-title"></span>
      </div>
      <div className="popup__input-container">
        <input
          type="url"
          id="image"
          name="link"
          className="popup__input popup__input_src_image"
          placeholder="Ссылка на картинку"
          required
          value={link}
          onChange={handleLinkChange}
        />
        <span className="popup__error image-error" id="error-image"></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
