import { useState } from "react";

export default function Login({ facade, setLoggedIn, setErrorMessage }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performLogin = (evt) => {
    evt.preventDefault();
    facade.login(
      loginCredentials.username,
      loginCredentials.password,
      setLoggedIn,
      setErrorMessage
    );
  };

  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <div className="row">
      <div className="offset-4 col-4">
        <h2>Login</h2>
        <form onChange={onChange}>
          <div class="form-group">
            <label for="inputEmail">Email address</label>
            <input
              type="email"
              class="form-control"
              idd="inputEmail"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              id="username"
            />
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div class="form-group">
            <label for="inputPassword">Password</label>
            <input
              type="password"
              class="form-control"
              idd="inputPassword"
              placeholder="Password"
              id="password"
            />
          </div>

          <button
            type="submit"
            class="btn btn-primary mt-2"
            onClick={performLogin}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
