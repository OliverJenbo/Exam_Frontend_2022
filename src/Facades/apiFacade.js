const URL = "http://localhost:8080/exam_backend_war_exploded";
export {URL};


function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

let apiFacade = () => {
  const fetchData = (endpoint, updateAction) => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/" + endpoint, options)
      .then(handleHttpErrors)
      .then((data) => updateAction(data));
  };

  const createData = (name, date, time, location, setErrorMessage) => {
    const newItem = { name: name, date: date, time: time, location: location };
    const options = makeOptions("POST", true, newItem);
    return fetch(URL + "/api/race/create", options)
      .then(handleHttpErrors)
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => setErrorMessage(e.code + ": " + e.message));
        } else {
          setErrorMessage("Network error");
        }
      });
  };

  const editData = (id, name, value, setErrorMessage) => {
    const newItem = { name: name, value: value };
    const options = makeOptions("PUT", true, newItem);
    return fetch(URL + "/api/items/" + id, options)
      .then(handleHttpErrors)
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => setErrorMessage(e.code + ": " + e.message));
        } else {
          setErrorMessage("Network error");
        }
      });
  };

  const deleteData = (id, setErrorMessage) => {
    const options = makeOptions("DELETE", true);
    return fetch(URL + "/api/car/delete/" + id, options)
      .then(handleHttpErrors)
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => setErrorMessage(e.code + ": " + e.message));
        } else {
          setErrorMessage("Network error");
        }
      });
  };

  const login = (user, password, setLoggedIn, setErrorMessage) =>
{
    const options = makeOptions("POST", true, { username: user, password: password });
    return fetch(URL + "/api/login", options)
        .then(handleHttpErrors)
        .then(res =>
        {
            setToken(res.token)
            setLoggedIn(true);
            setErrorMessage('Logged in');
        })
        .catch((err) =>
        {
            if (err.status)
            {
                err.fullError.then((e) => setErrorMessage(e.code + ': ' + e.message));
            } else
            {
                setErrorMessage('Network error');
            }
        });
}
const signup = (user, password, SetErrorMessage) =>
{
    const options = makeOptions("POST", true, { username: user, password: password }); //True add's the token
    return fetch(URL + "/api/signup", options)
        .then(handleHttpErrors)
        //.then((data) => updateAction(data))
        .catch(err =>
        {
            if (err.status)
            {
                console.log(err)
                err.fullError.then(e => SetErrorMessage(e.code + ": " + e.message))
            }
            else { SetErrorMessage("Network error"); }
        })
}


  // Security Functionality

  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
  };
  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };
  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
  };

  const getUserRoles = () => {
    const token = getToken();
    if (token != null) {
      const payloadBase64 = getToken().split(".")[1];
      const decodedClaims = JSON.parse(window.atob(payloadBase64));
      const roles = decodedClaims.roles;
      return roles;
    } else return "";
  };

  const getUsername = () => {
    const token = getToken();
    if (token != null) {
      const payloadBase64 = getToken().split(".")[1];
      const decodedClaims = JSON.parse(window.atob(payloadBase64));
      const username = decodedClaims.username;
      return username;
    } else return "";
  };

  const hasUserAccess = (neededRole, loggedIn) => {
    const roles = getUserRoles().split(",");
    return loggedIn && roles.includes(neededRole);
  };

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };

  return {
    makeOptions,
    fetchData,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    getUserRoles,
    getUsername,
    hasUserAccess,
    createData,
    editData,
    deleteData,
    signup,
  };
};

const facade = apiFacade();

export default facade;
