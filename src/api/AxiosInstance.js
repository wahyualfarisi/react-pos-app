import Axios from 'axios';

const instance = Axios.create({
    baseURL: 'https://api.alfarisilab.com/api'
});

export default instance;