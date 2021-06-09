import React, { useContext, useEffect } from 'react';
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
 

    useEffect( () => {
        onLoadMenu({
            page: 0,
            size: 100
        })
    }, [ onLoadMenu ])

    const OpenOrderMobileCTX = useContext(OpenOrderMobileContext);

    return (
        <div className="Menu">
            <div className="Menu__heading">
                <h1>Menu</h1>
                <input 
                    placeholder="Search Makanan, Minuman, dll"
                />
            </div>
            <ul className="Menu__categorys">
                <li className="Menu__categorys-item">
                    <button className="Menu__categorys-btn Menu__categorys-btn-active">All</button>
                </li>
                <li className="Menu__categorys-item">
                    <button className="Menu__categorys-btn">Makanan</button>
                </li>
                <li className="Menu__categorys-item">
                    <button className="Menu__categorys-btn">Minuman</button>
                </li>
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
