import { useNavigate } from "react-router-dom";
import "./styles/exhibitionCard.css";
import { useState } from "react";
import { addExhibitionToCollection } from "../../api";

export function ExhibitionCard({ exhibition, collections }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [error, setError] = useState("");
  const userId = sessionStorage.getItem("user_id");

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const selectedId = formData.get("selectedCollection");
    addExhibitionToCollection(
      selectedId,
      userId,
      exhibition.api,
      exhibition.id
    ).then((response) => {
      if (response === 201) {
        setMenuOpen(false);
      } else if (response === 409) {
        setError("Already In Collection");
      } else {
        setError("Something Went Wrong");
      }
    });
  }

  return (
    <div
      tabIndex={0}
      className="link-card"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          navigate(`/exhibitions/${exhibition.api}/${exhibition.id}`);
        }
      }}
      onClick={() => {
        if (!menuOpen) {
          navigate(`/exhibitions/${exhibition.api}/${exhibition.id}`);
        }
      }}
      role="button"
    >
      {userId ? (
        <button
          className="card-action-button"
          aria-label="Add to collection"
          aria-haspopup="true"
          aria-expanded={menuOpen}
          aria-controls="dropdown-menu"
          onKeyDown={(e) => {
            e.stopPropagation();
          }}
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
        >
          +
        </button>
      ) : null}
      {menuOpen ? (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <form
            role="menuitem"
            onSubmit={handleSubmit}
            onChange={() => {
              setError("");
            }}
          >
            {collections.map((collection) => {
              return (
                <label key={collection.collection_id}>
                  <input
                    type="radio"
                    name="selectedCollection"
                    value={collection.collection_id}
                  />
                  {collection.collection_name}
                </label>
              );
            })}
            <input type="submit" value="Add to collection"></input>
            <p style={{ color: "red" }}>{error}</p>
          </form>
        </div>
      ) : null}
      <h3>{exhibition.title}</h3>
      <img
        src={
          exhibition.img ||
          "https://static.vecteezy.com/system/resources/previews/037/359/674/non_2x/loading-error-filled-outline-icon-style-illustration-eps-10-file-vector.jpg"
        }
        width={100}
        height={100}
        alt={
          exhibition.img
            ? `image showcasing the exhibition ${exhibition.title}`
            : "failed to load image"
        }
      />
      <p>
        {exhibition.artist && exhibition.artist !== "Unknown"
          ? `By ${exhibition.artist}`
          : null}
      </p>
    </div>
  );
}
