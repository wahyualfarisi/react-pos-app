import React, { useContext, useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';

//action
import { getMenu, clearMenu } from '../../store/actions/menu';
import { addToOrder } from './../../store/actions/orders';

import './Menu.scss';
import BottomOrder from '../../components/BottomOrder/BottomOrder';
import OpenOrderMobileContext from '../../context/open-order-mobile-context';
import Loader from '../../components/UI/Loader/Loader';
import ConfirmOrderModal from '../../components/Menu/Modal/ConfirmOrderModal/ConfirmOrderModal';
import Categorys from '../../components/Categorys/Categorys';
import MenuItem from '../../components/Menu/MenuItem/MenuItem';


const Menu = ({
    onLoadMenu,
    isLoading,
    error,
    data,
    datapage,
    //orders
    onAddOrder,
    onClearMenu
}) => {

    const [query, setQuery] = useState({
        category: [ 
            { name: 'All' }, 
            { name: 'Makanan' }, 
            { name: 'Minuman' } 
        ],
        isActiveCategory: 'All',
        searchText: null,
        page: 1
    });
  
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [isOpenConfirmMenu, setIsOpenConfirmMenu] = useState(false);
    const OpenOrderMobileCTX = useContext(OpenOrderMobileContext);

    const changeHandler = event => {
        onClearMenu();
        setQuery(prevState => {
            return {
                ...prevState,
                searchText: event.target.value,
                page: 1,
                isActiveCategory: 'All'
            }
        })
    }

    const debounceChangeHandler = useMemo(() => {
        return debounce(changeHandler, 400)
    }, [  ])
    

    useEffect( () => {
        
        onLoadMenu({
            isActiveCategory: query.isActiveCategory,
            page: query.page,
            searchText: query.searchText
        });
        

        return () => {
            debounceChangeHandler.cancel()
        }

    }, [ query, onLoadMenu, debounceChangeHandler ])


    const setActiveMenu = (menuName) => {
        onClearMenu()
        setQuery(prevState => {
            return {
                ...prevState,
                isActiveCategory: menuName,
                page: 1
            }
        });
    }

    const onSelectMenuHandler = ( item ) => {
        setIsOpenConfirmMenu(true);
        setSelectedMenu(item);
    }

    const onCancelOrderHandler = () => {
        setIsOpenConfirmMenu(false)
    }

    const onSubmitOrderHandler = (items) => {
        onAddOrder(items)
        setSelectedMenu(null);
        setIsOpenConfirmMenu(false);
    }

    const onLoadMore = () => {
        setQuery(prevState => {
            return {
                ...prevState,
                page: prevState.page + 1
            }
        })
    }

   

   

    return (
        <div className="Menu">

            <section className="Menu__heading">
                <h1>Menu</h1>
                <input 
                    placeholder="Search Makanan, Minuman, dll"
                    onChange={debounceChangeHandler}
                />
            </section>

            {/* Category List start  */}
            <Categorys 
                category={query.category} 
                isActiveCategory={query.isActiveCategory} 
                setActiveMenu={(name) => setActiveMenu(name)}
                searchText={query.searchText}  
                datapage={datapage}              
            />
            {/* Category List end  */}

            {/*  Menu items Start  */}
            <section className="Menu__lists">
                {data 
                    && data.length > 0 
                    && data.map((item, i) => 
                    <MenuItem 
                    key={i} 
                    {...item} 
                    onSelected={(obj) => 
                        onSelectMenuHandler(obj)} 
                    />
                    )
                }
               
                {isLoading && (
                <div className="Loader-center">
                    <Loader />
                </div>
                )}
                {error && <p>Something went wrong!</p>}
            </section>
            {/*  Menu items End  */}
            
            <div className="Menu__action">
                {!isLoading && datapage && datapage.last_page > query.page && <button className="Menu_btn_loadmore" onClick={onLoadMore}> Load More </button> } 
            </div>
            {/* Modal Confirm start  */}
            {selectedMenu && (
                <ConfirmOrderModal
                    isOpen={isOpenConfirmMenu}
                    selectedMenu={selectedMenu}
                    onClose={onCancelOrderHandler}
                    onSubmit={onSubmitOrderHandler}
                />
            )}
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
        error: state.menu.error,
        datapage: state.menu.page
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadMenu: ( query ) => dispatch( getMenu(query)  ),
        onAddOrder: (items) => dispatch( addToOrder(items) ),
        onClearMenu: () => dispatch( clearMenu() )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
