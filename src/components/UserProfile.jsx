import { useEffect, useState } from "react";
import { createCollection, getCollections } from "../../api";
import { useNavigate } from "react-router-dom";
import "./styles/userProfile.css";

export function UserProfile() {
  const userId = sessionStorage.getItem("user_id");
  const [collections, setCollections] = useState([]);
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getCollections(userId).then((response) => {
      setCollections(response);
      setRefresh(false);
    });
  }, [refresh]);

  function handleSubmit(e) {
    e.preventDefault();
    if (input) {
      createCollection(userId, input).then((response) => {
        setInput("");
        setRefresh(true);
      });
    } else {
      setError("Must enter name for collection");
      setTimeout(() => setError(""), 3000);
    }
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <button className="nav-button" onClick={() => navigate("/")}>
          ← Home
        </button>
        <button
          className="nav-button"
          onClick={() => {
            sessionStorage.removeItem("user_id");
            navigate("/");
          }}
        >
          Log Out
        </button>
      </div>

      <form onSubmit={handleSubmit} className="collection-form">
        <label htmlFor="collection">New Collection</label>
        <input
          value={input}
          id="collection"
          name="collection"
          onChange={(e) => {
            setError("");
            setInput(e.target.value);
          }}
        />
        <button type="submit">Create</button>
      </form>

      {error ? <p className="error-message">{error}</p> : null}

      <ul className="collection-list">
        {collections.map((collection) => (
          <li
            tabIndex={0}
            className="collection-card"
            key={collection.collection_id}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                navigate(`/collections/${collection.collection_id}`, {
                  state: { collectionName: collection.collection_name },
                });
              }
            }}
            onClick={() =>
              navigate(`/collections/${collection.collection_id}`, {
                state: { collectionName: collection.collection_name },
              })
            }
          >
            <p>{collection.collection_name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
