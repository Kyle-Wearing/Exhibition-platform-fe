import { useEffect, useState } from "react";
import { get10ArtIds, getArt, getScience } from "../../api";
import { formatExhibitions } from "../../utils";

export function HomeScreen() {
  const [exhibitions, setExhibitions] = useState([]);

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
      });
  }, []);

  return (
    <div>
      <ul>
        {exhibitions.map((exhibition) => {
          return (
            <li key={exhibition.id}>
              <p>{exhibition.title}</p>
              <p>{exhibition.description}</p>
              <img src={exhibition.img} width={500} height={500} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
