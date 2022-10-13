import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeEmail(e) {
    const { value } = e.target;
    e.target.name === "email" ? setEmail(value) : setPassword(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(password, email);
  }

  return (
    <section className="sign">
      <form className="sign__form" onSubmit={handleSubmit} noValidate>
        <div>
          <h2 className="sign__title">Регистрация</h2>
          <input
            className="sign__input"
            name="email"
            id="email"
            type="email"
            placeholder="Email"
            value={email || ""}
            onChange={handleChangeEmail}
            required
          ></input>
          <input
            className="sign__input"
            name="password"
            id="password"
            type="password"
            placeholder="Пароль"
            value={password || ""}
            onChange={handleChangeEmail}
            required
          ></input>
        </div>
        <div>
          <button
            className="sign__button sign__button_type-register"
            type="submit"
          >
            Зарегистрироваться
          </button>
          <Link to="/sign-in" className="sign__link">
            <p className="sign__signup">Уже зарегистрированы? Войти</p>
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Register;
