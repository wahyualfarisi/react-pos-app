import React, { useEffect } from 'react'
import './DetailTransaction.scss';
import { Link , useParams} from 'react-router-dom';
import { connect } from 'react-redux';
import { FiArrowRight } from 'react-icons/fi'
import {
    getDetail
} from './../../../store/actions/transaction';
import { formatRupiah } from './../../../utils/index';

function DetailTransaction({

    onLoadDetail,
    isLoading,
    data,
    error

}) {

    const { id } = useParams();

    useEffect( () => {
        onLoadDetail(id)
    }, [id, onLoadDetail])

    let total = 0;
    const DisplayItem = !isLoading && data && data.get_items.map((item, i) => {

        total += item.qty * item.get_menu.price
        
        

        return (
            <li key={i} className="DetailTrx_item">
                <figure> 
                    <img src={item.get_menu.photo} alt="Item" />
                </figure>
                <h5>{item.get_menu.menu_name}</h5>
                <p>{item.qty} x</p>
                <p>{formatRupiah(item.get_menu.price.toString()) }</p>
            </li>
        )
    })

    return (
        <div className="DetailTrx">
            <section className="DetailTrx_heading">
                <h1>Detail Transaction</h1>
                <Link to="/">
                    <span>Back to Menu</span> 
                    <FiArrowRight />
                </Link>
            </section>
            {isLoading && <p>Loading...</p>}

            {!isLoading && data && (
                <section className="DetailTrx_Info">
                    <div className="DetailTrx_Info-member">
                        <h3>{data.no_trx}</h3>
                        <h4>{data.created_at}</h4>
                        <h4>{data.name} - {data.email}</h4>
                        <h4>{data.phone_number}</h4>
                    </div>
    
                    <div className="DetailTrx_Info-orders">
                        <h4>Order List</h4>
    
                        <ul className="DetailTrx_lists">
                            {DisplayItem}
                        </ul>
    
                        <div className="DetailTrx_total">
                            <h1>Total</h1>
                            <p>{ formatRupiah(total.toString())} </p>
                        </div>
    
                        <div className="DetailTrx_thx">
                            <h6>Thank You : )</h6>
                            <p>I Hope You Are Happy</p>
                            <Link to="/">Order Again</Link>
                        </div>
                    </div>
    
                </section>
            )}

        </div>
    )
}

const mapStateToProps = state => {
    return {
        data: state.transaction.detail_transaction,
        isLoading: state.transaction.isLoadDetail,
        error: state.transaction.errorDetail
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadDetail: ( id ) => dispatch( getDetail(id) ) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailTransaction)
