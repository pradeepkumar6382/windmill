import axios from 'axios';

const server = axios.create({
    // baseURL: 'http://148.66.135.245:8001/' 
    baseURL:"http://localhost:7000/"  
});

export default server;
