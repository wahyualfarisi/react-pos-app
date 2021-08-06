import Axios from './AxiosInstance';

export const fetchMenu = ( query ) => {
    let url = `/pos/menu?page=${query.page}`;

    if(query.isActiveCategory !== 'All'){
        url += `&query&category=${query.isActiveCategory}`;
    }

    return Axios.get(url, query);
}