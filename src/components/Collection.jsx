import { useEffect, useState } from "react";
import { getArt, getCollectionbyId, getSingleScience } from "../../api";
import { Loading } from "./Loading";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { formatExhibitions } from "../../utils";
import { CollectionCard } from "./CollectionCard";

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
              (response) => {
                return formatExhibitions([response])[0];
              }
            );
          } else if (exhibition.api === "science") {
            return getSingleScience(exhibition.exhibition_id).then(
              (response) => {
                return formatExhibitions([response])[0];
              }
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
    <>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        go back
      </button>
      <h1 style={{ textAlign: "center" }}>{collectionName}</h1>
      {collection.length ? (
        <ul>
          {collection.map((exhibition) => {
            return (
              <CollectionCard key={exhibition.id} exhibition={exhibition} />
            );
          })}
        </ul>
      ) : (
        <p>Collection is empty</p>
      )}
    </>
  ) : (
    <Loading />
  );
}
