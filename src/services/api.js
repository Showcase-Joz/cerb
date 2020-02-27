import axios from "axios"
export default axios.create({
  baseURL: "https://typhon-api.sst-l.com/",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }
})