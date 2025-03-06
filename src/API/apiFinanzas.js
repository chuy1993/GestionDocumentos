import axios from "axios";
// const config = {
//   headers: {
//     "Content-Type": "application/json;charset=UTF-8",
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
//     "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
//   },
// };
// 59810
export default axios.create({
  //baseURL: "http://tin-atlantis-03.ctransporta.com:44339/api", //local desarrollo
  baseURL: "http://tin-atlantis-03.ctransporta.com:59811/api",
  // config,
  //baseURL: "http://gestiontalento.ctransporta.com:7042/api", // online pre-produccion
});
