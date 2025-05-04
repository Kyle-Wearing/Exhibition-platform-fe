import axios from "axios";

const sciApi = axios.create({
  baseURL: "https://collection.sciencemuseumgroup.org.uk",
  timeout: 10000,
  headers: { Accept: "application/json" },
});

const artApi = axios.create({
  baseURL: "https://collectionapi.metmuseum.org/public/collection/v1/",
});

const backEnd = axios.create({
  baseURL: "https://apex.oracle.com/pls/apex/oracleworkspace2/api",
});

export async function getScience(page, searchTerm) {
  let query = `search/objects?page[size]=10&page[number]=${page}`;
  if (searchTerm) {
    query += `&q=${searchTerm}`;
  }

  return sciApi
    .get(query)
    .then((response) => {
      return response.data.data;
    })
    .catch((err) => {
      console.log("getScience", err);
    });
}

export async function getSingleScience(id) {
  return sciApi
    .get(`/objects/${id}`)
    .then((response) => {
      console.log(response);
      return response.data.data;
    })
    .catch((err) => {
      console.log("getSingleScience", err);
    });
}

export async function get10ArtIds(page, searchTerm) {
  const pageStart = (Number(page) - 1) * 10;
  const pageEnd = pageStart + 10;

  return artApi
    .get(`/search?hasImages=true&isHighlight=true&q=${searchTerm || "a"}`)
    .then((response) => {
      let tenResponse = [];
      if (response.data.total === 0) {
        tenResponse = [];
      } else if (response.data.total < 10) {
        tenResponse = response.data.objectIDs;
      } else {
        tenResponse = response.data.objectIDs.slice(pageStart, pageEnd);
      }
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
      return {
        title: "Oops Something went wrong",
      };
    });
}

export async function userLogin(username, password) {
  return backEnd
    .post("/login", {
      username: username,
      password: password,
    })
    .then((response) => {
      return response.headers.user_id;
    })
    .catch((err) => {
      console.log("loginUser", err);
    });
}

export function getCollections(userId) {
  return backEnd
    .get(`collections/user/${userId}`)
    .then((response) => {
      return response.data.items;
    })
    .catch((err) => {
      console.log("getCollections", err);
    });
}

export function createCollection(userId, collectionName) {
  return backEnd
    .post(`/collections/user/${userId}`, {
      collection_name: collectionName,
    })
    .then((response) => {
      console.log("created");
    })
    .catch((err) => {
      console.log("createCollection", err);
    });
}

export function getCollectionbyId(collectionId) {
  return backEnd
    .get(`/collections/${collectionId}`)
    .then((response) => {
      return response.data.items;
    })
    .catch((err) => {
      console.log("getCollectionById", err);
    });
}
