import { useEffect, useState } from "react";
import { createCollection, getCollections } from "../../api";
import { useNavigate } from "react-router-dom";

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
      setInput("");
      createCollection(userId, input);
      setRefresh(true);
    } else {
      setError("Must enter name for collection");
    }
  }

  return (
    <>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </button>
      <button
        onClick={() => {
          sessionStorage.removeItem("user_id");
          navigate("/");
        }}
      >
        Log Out
      </button>
      <form onSubmit={handleSubmit}>
        <label htmlFor="collection" title="collection">
          New Collection
        </label>
        <input
          value={input}
          id="collection"
          title="collection"
          name="collection"
          onChange={(e) => {
            setError("");
            setInput(e.target.value);
          }}
        ></input>

        <button type="submit">Create</button>
      </form>
      {error ? <p>{error}</p> : null}
      <ul>
        {collections.map((collection) => {
          return (
            <li
              className="link-card"
              key={collection.collection_id}
              onClick={() =>
                navigate(`/collections/${collection.collection_id}`, {
                  state: { collectionName: collection.collection_name },
                })
              }
            >
              <p>{collection.collection_name}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}
