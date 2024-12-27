import axios from "axios"

const axiosinstance=axios.create({
    baseURL:"https://api.themoviedb.org/3",
});

export default axiosinstance;