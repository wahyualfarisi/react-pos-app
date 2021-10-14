import React, { useContext, useEffect, useState, useMemo } from 'react';
import './Menu.scss';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';

//action
import { getMenu, clearMenu, setActiveMenu, loadMoreMenu, searchMenu, backState } from '../../store/actions/menu';
import { addToOrder } from './../../store/actions/orders';

//Component
import BottomOrder from '../../components/BottomOrder/BottomOrder';
import OpenOrderMobileContext from '../../context/open-order-mobile-context';
import Loader from '../../components/UI/Loader/Loader';
import ConfirmOrderModal from '../../components/Menu/Modal/ConfirmOrderModal/ConfirmOrderModal';
import Categorys from '../../components/Categorys/Categorys';
import MenuItem from '../../components/Menu/MenuItem/MenuItem';


const Menu = ({
    query,

    onLoadMenu,
    isLoading,
    error,
    data,
    datapage,
    //orders
    onAddOrder,
    onClearMenu,
    onSetActiveMenu,
    onLoadMore,
    onSearchMenu,
    onBackToState
}) => {
    const OpenOrderMobileCTX = useContext(OpenOrderMobileContext);

    const { page, searchText, isActiveCategory } = query;
  
    //menu when selected as order
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [isOpenConfirmMenu, setIsOpenConfirmMenu] = useState(false);

    const changeHandler = event => {
        onClearMenu();
        onSearchMenu(event.target.value)
    }

    const debounceChangeHandler = useMemo(() => {
        return debounce(changeHandler, 400)
    }, [  ])
    
    useEffect( () => {
        onBackToState()
    }, [ onBackToState ])

    useEffect( () => {
        
        onLoadMenu({
            isActiveCategory: isActiveCategory,
            page: page,
            searchText: searchText
        });
        
    
        return () => {
            debounceChangeHandler.cancel()
        }

    }, [ isActiveCategory, page, searchText, onLoadMenu, debounceChangeHandler ])


    const activeMenuHandler = (menuName) => {
        if(isActiveCategory !== menuName){
            onClearMenu()
            onSetActiveMenu(menuName);
        }
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
                isActiveCategory={isActiveCategory} 
                setActiveMenu={(name) => activeMenuHandler(name)}
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
                            onSelected={(obj) => onSelectMenuHandler(obj)} 
                        />
                    )
                }
               
                {isLoading && (<div className="Loader-center"><Loader /> </div>)}
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
        datapage: state.menu.page,
        query: state.menu.query
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadMenu: ( query ) => dispatch( getMenu(query)  ),
        onAddOrder: (items) => dispatch( addToOrder(items) ),
        onClearMenu: () => dispatch( clearMenu() ),
        onSetActiveMenu: (menuName) => dispatch( setActiveMenu(menuName) ),
        onLoadMore: () => dispatch( loadMoreMenu() ),
        onSearchMenu: (value) => dispatch( searchMenu(value) ),
        onBackToState: () => dispatch(backState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
