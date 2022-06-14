import { useState } from "react";

export default function Signup({ facade, setErrorMessage }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performSignup = (evt) =>
    {
        evt.preventDefault();
        facade.signup(loginCredentials.username, loginCredentials.password, setErrorMessage)
    console.log(loginCredentials)
    }

  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <div className="row">
      <div className="offset-4 col-4">
        <h2>Signup</h2>
        <form onChange={onChange}>
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="username"
              class="form-control"
              id="username"
              aria-describedby="usernameHelp"
              placeholder="Enter username"
              idd="username"
            />
            <small id="UsernameHelp" class="form-text text-muted">
              We'll never share your email or username with anyone else.
            </small>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="password"
              idd="password"
            />
          </div>

          <button
            type="submit"
            class="btn btn-primary mt-2"
            onClick={performSignup}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
