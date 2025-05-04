import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "./Loading";
import { userLogin } from "../../api";

export function LoginPage() {
  const [username, setUsername] = useState("test_user");
  const [password, setPassword] = useState("secure password");
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
        } else {
          setIsLoading(false);
          setError("username or password incorrect");
        }
      });
    } else {
      setError("must enter username and password");
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        home
      </button>
      <form onSubmit={handleSubmit}>
        <label>
          enter username
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
          />
        </label>
        <label>
          enter password
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
          />
        </label>
        <button type="submit">log in</button>
      </form>
      {error ? <p>{error}</p> : null}
    </>
  );
}
