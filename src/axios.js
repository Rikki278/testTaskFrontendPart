import axios from "axios";

// Create Axios instance with base URL for API requests
const instance = axios.create({
    baseURL: 'http://localhost:8080', // Base URL for API requests (change in production)
});


export default instance;