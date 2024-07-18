import axios from "./axios";

class records {
    getCountries() {
        return axios.get("v3.1/all");
      }
}

export default new records();
