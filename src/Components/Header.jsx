import { BrowserRouter as Router, NavLink } from "react-router-dom";

export default function Header({ facade, LoggedIn }) {
  return (
    <div>
      <ul className="header">
        <li>
          <NavLink exact activeClassName="active" to="/">
            Home
          </NavLink>
        </li>
          <div>
            <li>
              <NavLink activeClassName="active" to="/signup">
                Signup
              </NavLink>
            </li>
          </div>
        {facade.hasUserAccess("user", LoggedIn) && (
          <div>
            <li>
              <NavLink activeClassName="active" to="/all-races">
                All Races
              </NavLink>
            </li>
          </div>
        )}

        {facade.hasUserAccess("admin", LoggedIn) && (
          <div>
            <li>
              <NavLink activeClassName="active" to="/all-cars">
                All Cars
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/race-add">
                Add Race
              </NavLink>
            </li>
          </div>
        )}
      </ul>
    </div>
  );
}
