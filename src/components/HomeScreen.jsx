import { useEffect, useState } from "react";
import { get10ArtIds, getArt, getScience } from "../../api";
import { formatExhibitions } from "../../utils";
import { ExhibitionCard } from "./ExhibitionCard";
import "./styles/homeScreen.css";
import { useSearchParams } from "react-router-dom";

export function HomeScreen() {
  const [exhibitions, setExhibitions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams("page=1");

  const page = searchParams.get("page");
  useEffect(() => {
    get10ArtIds(page)
      .then((response) => {
        const promiseArr = response.map((id) => {
          return getArt(id);
        });
        promiseArr.push(getScience(page));
        return Promise.all(promiseArr);
      })
      .then((res) => {
        setExhibitions(formatExhibitions(res.flat()));
        setIsLoading(false);
      });
  }, [searchParams]);

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
