import Axios from 'axios';

const instance = Axios.create({
    baseURL: 'http://139.162.23.206:8080'
});

export default instance;