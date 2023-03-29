import axios from "axios";

const instance = axios.create({
  baseURL: "https://swapi.dev/api/",
  timeout: 1000,
  headers: { "Content-type": "application/json" },
});

export default instance;
