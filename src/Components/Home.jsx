import Login from "../Content/Login";
import UserPage from "../Content/UserPage";

function Home({ logout, loggedIn, setLoggedIn, facade, setErrorMessage }) {
  return (
    <div>
      {!loggedIn ? (
        <Login
          facade={facade}
          setLoggedIn={setLoggedIn}
          setErrorMessage={setErrorMessage}
        />
      ) : (
        <div>
          <UserPage
            facade={facade}
            logout={logout}
            setErrorMessage={setErrorMessage}
          />
        </div>
      )}
    </div>
  );
}

export default Home;
