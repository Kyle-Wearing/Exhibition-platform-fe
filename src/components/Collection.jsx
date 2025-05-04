import { useEffect, useState } from "react";
import { getArt, getCollectionbyId, getSingleScience } from "../../api";
import { Loading } from "./Loading";
import { ExhibitionCard } from "./ExhibitionCard";
import { useParams } from "react-router-dom";
import { formatExhibitions } from "../../utils";

export function Collection() {
  const { collection_id } = useParams();
  const [collection, setCollection] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  {
    return !isLoading ? (
      collection.length ? (
        <ul>
          {collection.map((exhibition) => {
            return (
              <ExhibitionCard key={exhibition.id} exhibition={exhibition} />
            );
          })}
        </ul>
      ) : (
        <p>Collection is empty</p>
      )
    ) : (
      <Loading />
    );
  }
}
