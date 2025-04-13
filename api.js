import axios from "axios";

const sciApi = axios.create({
  baseURL: "https://collection.sciencemuseumgroup.org.uk/search",
  timeout: 10000,
  headers: { Accept: "application/json" },
});

const artApi = axios.create({
  baseURL: "https://collectionapi.metmuseum.org/public/collection/v1/",
});

export async function getScience(page) {
  return sciApi
    .get(`/objects?q=&page[size]=10&page[number]=${page}`)
    .then((response) => {
      return response.data.data;
    })
    .catch((err) => {
      console.log("getScience", err);
    });
}

export async function get10ArtIds(page) {
  const pageStart = (Number(page) - 1) * 10;
  const pageEnd = pageStart + 10;

  return artApi
    .get("/search?hasImages=true&isHighlight=true&q=a")
    .then((response) => {
      const tenResponse = response.data.objectIDs.slice(pageStart, pageEnd);
      return tenResponse.map((id) => {
        return `objects/${id}`;
      });
    })
    .catch((err) => {
      console.log("get10ArtIds", err);
    });
}

export async function getArt(id) {
  return artApi
    .get(id)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log("getArt", err);
    });
}
