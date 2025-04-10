import { useEffect, useState } from "react";
import { get10ArtIds, getArt, getScience } from "../../api";
import { formatExhibitions } from "../../utils";
import { ExhibitionCard } from "./ExhibitionCard";
import "./styles/homeScreen.css";

export function HomeScreen() {
  const [exhibitions, setExhibitions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    get10ArtIds()
      .then((response) => {
        const promiseArr = response.map((id) => {
          return getArt(id);
        });
        promiseArr.push(getScience());
        return Promise.all(promiseArr);
      })
      .then((res) => {
        setExhibitions(formatExhibitions(res.flat()));
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div>
      <ul>
        {exhibitions.map((exhibition) => {
          return <ExhibitionCard key={exhibition.id} exhibition={exhibition} />;
        })}
      </ul>
    </div>
  );
}
