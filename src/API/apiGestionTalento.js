import axios from "axios";
const config = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
  },
};
export default axios.create({
  //baseURL: "http://tin-atlantis-03.ctransporta.com:44339/api", //local desarrollo
  baseURL: "http://tin-atlantis-03.ctransporta.com:7042/api",
  //baseURL: "http://gestiontalento.ctransporta.com:7042/api", // online pre-produccion
});
