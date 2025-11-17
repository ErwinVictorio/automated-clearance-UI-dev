import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000"; // same as APP_URL
axios.defaults.withCredentials = true;
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

export default axios;
