import { useNavigate, useParams } from "react-router-dom";
import "./styles/exhibitionCard.css";

import { removeFromCollection } from "../../api";
import { useState } from "react";

export function CollectionCard({ exhibition, setCollection, index }) {
  const navigate = useNavigate();
  const { collection_id } = useParams();
  const [error, setError] = useState(false);
  const [deleting, setdeleting] = useState(false);

  function handleRemove() {
    setdeleting(true);
    removeFromCollection(collection_id, exhibition.id).then((response) => {
      if (response === "true") {
        setCollection((currCollection) => {
          return [
            ...currCollection.slice(0, index),
            ...currCollection.slice(index + 1),
          ];
        });
      } else {
        setError("Something went wrong");
        setTimeout(() => {
          setError("");
        }, 2000);
      }
      setdeleting(false);
    });
  }

  return (
    <div
      style={deleting ? { background: "#ffcccb" } : null}
      tabIndex={0}
      className="link-card"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          navigate(`/exhibitions/${exhibition.api}/${exhibition.id}`);
        }
      }}
      onClick={() => {
        navigate(`/exhibitions/${exhibition.api}/${exhibition.id}`);
      }}
      role="button"
    >
      <button
        className="remove-button"
        onClick={(e) => {
          e.stopPropagation();
          handleRemove();
        }}
        aria-label="Remove from collection"
      >
        ✕
      </button>
      {error ? <p style={{ color: "red" }}>{error}</p> : null}
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
