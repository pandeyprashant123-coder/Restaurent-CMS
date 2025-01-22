import axios from "axios";

let token = null;

if (typeof window !== "undefined") {
  // Ensure we're in the client-side
  token =
    window.localStorage.getItem("authToken") ||
    window.sessionStorage.getItem("authToken");
}
// console.log(token);

export default axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});
