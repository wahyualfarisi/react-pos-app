import Axios from './AxiosInstance';

export const fetchMenu = ( query ) => Axios.get('/pos/menu', query);