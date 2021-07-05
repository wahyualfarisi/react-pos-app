import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getMenu } from '../../store/actions/menu';
import './Menu.scss';
import BottomOrder from '../../components/BottomOrder/BottomOrder';
import OpenOrderMobileContext from '../../context/open-order-mobile-context';
import Loader from '../../components/UI/Loader/Loader';
import ConfirmOrderModal from '../../components/Menu/Modal/ConfirmOrderModal/ConfirmOrderModal';
import Categorys from '../../components/Categorys/Categorys';
import MenuItem from '../../components/Menu/MenuItem/MenuItem';

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

    const [selectedMenu, setSelectedMenu] = useState(null);
    const [isOpenConfirmMenu, setIsOpenConfirmMenu] = useState(false);
 

    useEffect( () => {

        onLoadMenu({
            page: query.page,
            size: query.size
        });

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

    const onSelectMenuHandler = ( item ) => {
        const { imgUrl, name, price } = item;
        setIsOpenConfirmMenu(true);
        setSelectedMenu({ imgUrl, name, price });
    }

    const onCancelOrderHandler = () => {
        setIsOpenConfirmMenu(false)
    }

    const onSubmitOrderHandler = () => {}

    return (
        <div className="Menu">

            <section className="Menu__heading">
                <h1>Menu</h1>
                <input 
                    placeholder="Search Makanan, Minuman, dll"
                />
            </section>

            {/* Category List start  */}
            <Categorys 
                category={query.category} 
                isActiveCategory={query.isActiveCategory} 
                setActiveMenu={(name) => setActiveMenu(name)}
            />
            {/* Category List end  */}

            {/*  Menu items Start  */}
            <section className="Menu__lists">
                {!isLoading && data && data.length > 0 && data.map((item, i) => <MenuItem key={i} {...item} onSelected={(obj) => onSelectMenuHandler(obj)} />)}
                {isLoading && (
                <div className="Loader-center">
                    <Loader />
                </div>
                )}
                {error && <p>Something went wrong!</p>}
            </section>
            {/*  Menu items End  */}
            

            {/* Modal Confirm start  */}
            <ConfirmOrderModal
                isOpen={isOpenConfirmMenu}
                onClose={onCancelOrderHandler}
                onSubmit={onSubmitOrderHandler}
            />
            {/* Modal Confirm end  */}
     
            
            <BottomOrder onClick={OpenOrderMobileCTX.onToggle} />
        </div>
    );
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
