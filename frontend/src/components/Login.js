import { useState } from "react";

function Login({ onAuthtorize }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChange(e) {
    const { value } = e.target;
    e.target.name === "email" ? setEmail(value) : setPassword(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAuthtorize(password, email);
  }

  return (
    <section className="sign">
      <form className="sign__form" onSubmit={handleSubmit}>
        <div>
          <h2 className="sign__title">Вход</h2>
          <input
            className="sign__input"
            name="email"
            type="email"
            placeholder="Email"
            required
            value={email || ""}
            onChange={handleChange}
          ></input>
          <input
            className="sign__input"
            name="password"
            type="password"
            placeholder="Пароль"
            required
            value={password || ""}
            onChange={handleChange}
          ></input>
        </div>
        <button className="sign__button" type="submit">
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
