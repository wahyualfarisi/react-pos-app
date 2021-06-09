import Axios from './AxiosInstance';

export const fetchMenu = ( query ) => Axios.post('/product/getAll', query);