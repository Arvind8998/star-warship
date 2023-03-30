import axios from "axios";

const instance = axios.create({
  baseURL: "https://swapi.dev/api/",
  headers: { "Content-type": "application/json" },
});

export default instance;
