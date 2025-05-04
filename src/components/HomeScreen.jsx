import { useEffect, useState } from "react";
import { get10ArtIds, getArt, getCollections, getScience } from "../../api";
import { formatExhibitions } from "../../utils";
import { ExhibitionCard } from "./ExhibitionCard";
import "./styles/homeScreen.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ControlBar } from "./ControlBar";
import { Loading } from "./Loading";

export function HomeScreen() {
  const [exhibitions, setExhibitions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams("page=1");
  const [collections, setCollections] = useState([]);

  const navigate = useNavigate();

  const userId = sessionStorage.getItem("user_id");

  const page = searchParams.get("page");
  const searchTerm = searchParams.get("searchTerm");
  useEffect(() => {
    if (userId) {
      getCollections(userId).then((response) => {
        setCollections(response);
      });
    }
    setIsLoading(true);
    get10ArtIds(page, searchTerm)
      .then((response) => {
        const promiseArr = response.map((id) => {
          return getArt(id);
        });
        promiseArr.push(getScience(page, searchTerm));
        return Promise.all(promiseArr);
      })
      .then((res) => {
        setExhibitions(formatExhibitions(res.flat()));
        setIsLoading(false);
      });
  }, [searchParams]);

  return (
    <>
      {!userId ? (
        <button
          onClick={() => {
            navigate("/log-in");
          }}
        >
          Log in
        </button>
      ) : (
        <button
          onClick={() => {
            navigate(`/profile/${userId}`);
          }}
        >
          Profile
        </button>
      )}
      <ControlBar
        isLoading={isLoading}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      {!isLoading ? (
        <ul>
          {exhibitions.map((exhibition) => {
            return (
              <ExhibitionCard
                key={exhibition.id}
                exhibition={exhibition}
                collections={collections}
              />
            );
          })}
        </ul>
      ) : (
        <Loading />
      )}
    </>
  );
}
