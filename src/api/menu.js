import Axios from './AxiosInstance';

export const fetchMenu = ( query ) => {
    let url = `/pos/menu?page=${query.page}`;

    if(query.isActiveCategory !== 'All'){
        url += `&query&category=${query.isActiveCategory}`;
    }

    if(query.searchText){
        url += `&search=${query.searchText}`
    }

    return Axios.get(url, query);
}