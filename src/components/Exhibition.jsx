import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getArt, getSingleScience } from "../../api";
import { formatExhibitions } from "../../utils";
import "./styles/singleExhibition.css";

export function Exhibition() {
  const { api, exhibition_id } = useParams();
  const navigate = useNavigate();

  const [exhibition, setExhibition] = useState({});

  useEffect(() => {
    if (api === "art") {
      getArt(`objects/${exhibition_id}`).then((response) => {
        setExhibition(formatExhibitions([response])[0]);
      });
    } else if (api === "science") {
      getSingleScience(exhibition_id).then((response) => {
        setExhibition(formatExhibitions([response])[0]);
      });
    }
  }, []);

  return (
    <>
      <div className="exhibition-card">
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          go back
        </button>
        <h1>{exhibition.title}</h1>

        <h3>{exhibition.artist ? exhibition.artist : "unknown artist"}</h3>

        <img
          src={exhibition.img}
          width="80%"
          alt={
            exhibition.img
              ? `image showcasing the exhibition ${exhibition.title}`
              : "failed to load image"
          }
        />

        <p>
          {exhibition.description
            ? exhibition.description
            : "this exhibition has no description"}
        </p>
      </div>
    </>
  );
}
