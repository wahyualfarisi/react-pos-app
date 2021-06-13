import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getMenu } from './../../store/actions/menu';
import './Menu.scss';
import BottomOrder from '../../components/BottomOrder/BottomOrder';
import OpenOrderMobileContext from './../../context/open-order-mobile-context';
import Loader from '../../components/UI/Loader/Loader';


const  Menu = ({
    onLoadMenu,
    isLoading,
    error,
    data
}) => {

    const [query, setQuery] = useState({
        category: [ 
            { name: 'All' }, 
            { name: 'Makanan' }, 
            { name: 'Minuman' } 
        ],
        isActiveCategory: 'All',
        searchText: null,
        page: 0,
        size: 100
    });
 

    useEffect( () => {
        onLoadMenu({
            page: query.page,
            size: query.size
        })
    }, [ query, onLoadMenu ])

    const OpenOrderMobileCTX = useContext(OpenOrderMobileContext);

    const setActiveMenu = (menuName) => {
        setQuery(prevState => {
            return {
                ...prevState,
                isActiveCategory: menuName
            }
        })
    }

    return (
        <div className="Menu">
            <div className="Menu__heading">
                <h1>Menu</h1>
                <input 
                    placeholder="Search Makanan, Minuman, dll"
                />
            </div>
            <ul className="Menu__categorys">
                {query.category.map((item, _) => {
                    return (
                    <li key={_} className="Menu__categorys-item">
                        <button 
                            onClick={() => setActiveMenu(item.name)}
                            className={`Menu__categorys-btn ${query.isActiveCategory === item.name && `Menu__categorys-btn-active`}`}>
                            {item.name}
                        </button>
                    </li>
                    )
                })}
            </ul>

            <div className="Menu__lists">
                {!isLoading && data && data.products.length > 0 && data.products.map((item, i) => {
                    return (
                        <div key={i} className="Menu__lists-item">
                            <figure>
                                <img 
                                    className="Menu__lists-item-img"
                                    src={`http://139.162.23.206:8080/${item.imgUrl}`} alt={item.name} 
                                />
                            </figure>
                            <div className="Menu__lists-item-info">
                                <div>
                                    <h4>{item.name.length > 20 ? `${item.name.slice(0, 20)}...` : item.name }</h4>
                                    <p>{item.price}</p>
                                </div>
                                <button>ADD</button>
                            </div>
                        </div>
                    );
                })}
                {isLoading && (
                <div className="Loader-center">
                    <Loader />
                </div>
                )}

                {error && <p>Something went wrong!</p>}
            </div>

            <BottomOrder onClick={OpenOrderMobileCTX.onToggle} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        //Menu
        isLoading: state.menu.isLoading,
        data: state.menu.data,
        error: state.menu.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadMenu: ( query ) => dispatch( getMenu(query)  )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
