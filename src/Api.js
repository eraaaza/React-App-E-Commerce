var axios = require('axios');

var axiosInstance = axios.create({
    baseURL: 'http://localhost:8000'
});

export default axiosInstance;
