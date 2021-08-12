import React,  { useEffect, useState } from 'react';
import './Nav.scss';
import { NavLink } from 'react-router-dom';
import data from './NavData';
import { FiArrowRightCircle } from 'react-icons/fi';
import { connect } from 'react-redux';
import {
    getTransaction
} from './../../store/actions/transaction';

function Nav({
    transaction,
    isLoading,
    error,
    onLoadTransaction
}) {

    const [query] = useState({
        page: 1
    })

    useEffect( () => {
        onLoadTransaction(query)
    }, [ query, onLoadTransaction ])


    return (
        <div className="Nav">
            <div className="Navigation">
                <h1 className="Navigation__heading mb-medium">Transaction History</h1>
                {data.length === 0 && (
                <div className="EmptyTransaction">
                    <h3>You have not made any transaction yet</h3>
                </div>
                )}
                <ul className="Navigation__items">
                    {!isLoading && transaction && transaction.map( (item, i) => {

                        let total = 0;
                        item.get_items.forEach(k => {
                            total += k.qty * k.get_menu.price;
                        })

                        return (
                            <li key={i} className="Navigation__items_item">
                                <NavLink to={`/${item.sc_key}`} className="Navigation__items_item_link active">
                                    <h3>{item.created_at}</h3>
                                    <h4>{item.no_trx}</h4>
                                    <p>{total}</p>
                                    <button>
                                        Detail
                                        <FiArrowRightCircle className="btn_icon" />
                                    </button>
                                </NavLink>
                            </li>
                        )
                    })}
                    
                </ul>
                
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        transaction: state.transaction.data,
        isLoading: state.transaction.isLoading,
        error: state.transaction.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadTransaction: (query) => dispatch( getTransaction(query) ) 
    }
}

export default connect(mapStateToProps , mapDispatchToProps) (Nav)
