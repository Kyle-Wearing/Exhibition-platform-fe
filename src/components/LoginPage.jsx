import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "./Loading";
import { userLogin } from "../../api";
import "./styles/loginPage.css";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (username && password) {
      setIsLoading(true);
      userLogin(username, password).then((userId) => {
        if (userId) {
          sessionStorage.setItem("user_id", userId);
          navigate(-1);
        } else {
          setIsLoading(false);
          setError("Username or password incorrect");
          setTimeout(() => setError(""), 3000);
        }
      });
    } else {
      setError("Must enter username and password");
      setTimeout(() => setError(""), 3000);
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <button className="home-button" onClick={() => navigate("/")}>
          Home
        </button>
        <h2 className="login-title">Log In</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Username
            <input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              autoComplete="username"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              autoComplete="current-password"
            />
          </label>
          <button type="submit">Log In</button>
        </form>
        {error ? <p className="error-message">{error}</p> : null}
      </div>
    </div>
  );
}
