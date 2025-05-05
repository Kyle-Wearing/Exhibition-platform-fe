import { useEffect, useState } from "react";
import { getArt, getCollectionbyId, getSingleScience } from "../../api";
import { Loading } from "./Loading";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { formatExhibitions } from "../../utils";
import { CollectionCard } from "./CollectionCard";
import "./styles/collection.css";

export function Collection() {
  const { collection_id } = useParams();
  const [collection, setCollection] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { collectionName } = location.state;

  useEffect(() => {
    setIsLoading(true);
    getCollectionbyId(collection_id).then((response) => {
      return Promise.all(
        response.map((exhibition) => {
          if (exhibition.api === "art") {
            return getArt(`objects/${exhibition.exhibition_id}`).then(
              (response) => formatExhibitions([response])[0]
            );
          } else if (exhibition.api === "science") {
            return getSingleScience(exhibition.exhibition_id).then(
              (response) => formatExhibitions([response])[0]
            );
          }
        })
      ).then((response) => {
        setCollection(response);
        setIsLoading(false);
      });
    });
  }, []);

  return !isLoading ? (
    <div className="collection-container">
      <div className="collection-header">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Go Back
        </button>
        <h1>{collectionName}</h1>
      </div>
      {collection.length ? (
        <ul className="collection-grid">
          {collection.map((exhibition, index) => (
            <CollectionCard
              key={exhibition.id}
              exhibition={exhibition}
              setCollection={setCollection}
              index={index}
            />
          ))}
        </ul>
      ) : (
        <p className="empty-message">Collection is empty</p>
      )}
    </div>
  ) : (
    <Loading />
  );
}
