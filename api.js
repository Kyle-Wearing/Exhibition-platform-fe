import axios from "axios";

const sciApi = axios.create({
  baseURL: "https://collection.sciencemuseumgroup.org.uk/search",
  timeout: 10000,
  headers: { Accept: "application/json" },
});

const artApi = axios.create({
  baseURL: "https://collectionapi.metmuseum.org/public/collection/v1/",
});

export async function getScience() {
  return sciApi
    .get("/objects?q=&page[size]=10")
    .then((response) => {
      return response.data.data;
      // response.data.data[0].attributes.multimedia[0]["@processed"].large_thumbnail.location;
    })
    .catch((err) => {
      console.log("getScience", err);
    });
}

export async function get10ArtIds() {
  return artApi
    .get("search?q=&isHighlight=true&hasImages=true")
    .then((response) => {
      const tenResponse = response.data.objectIDs.slice(0, 10);
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
