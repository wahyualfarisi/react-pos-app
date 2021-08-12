import Axios from './AxiosInstance';

export const create = (formdata) => {
    return Axios.post('/pos/trx/create', formdata);
}

export const fetchTransaction = (query) => {
    let url = '/pos/trx';
    return Axios.get(url, query);
}