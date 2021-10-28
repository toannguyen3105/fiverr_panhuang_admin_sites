import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginUser } from "../../redux/actions/authAction";
import "./login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const authenticated = useSelector((state) => state.auth.authenticated);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(username, password));
  };

  useEffect(() => {
    if (authenticated) {
      history.push("/dashboard");
    }
  }, [history, authenticated]);

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginSignInForm" onSubmit={handleSubmit}>
        <div className="loginSignInItem">
          <label>Username</label>
          <input
            value={username}
            type="text"
            placeholder="Please enter your username"
            className="loginSignInInput"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className="loginSignInItem">
          <label>Password</label>
          <input
            value={password}
            type="password"
            placeholder="Please enter your password"
            className="loginSignInInput"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button className="loginSignInButton" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
