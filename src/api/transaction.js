import Axios from './AxiosInstance';

export const create = (formdata) => {
    return Axios.post('/pos/trx/create', formdata);
}