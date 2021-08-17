import React from 'react'
import './BottomOrder.scss';
import { connect } from 'react-redux';
import { formatRupiah } from './../../utils/index';

function BottomOrder({ onClick, order_data }) {

    const subTotalArr = order_data.map(item => item.price * item.qty);

    const total = subTotalArr.reduce((a, b) => a + b , 0);


    return (
        <div className="BottomOrder">
            <div className="BottomContainer">
                <div className="BottomContainer__info">
                    <p>{order_data.length} Items</p>
                    <h1>Rp, {formatRupiah(total.toString())}</h1>
                </div>
                <button 
                    disabled={order_data.length === 0}
                    onClick={onClick} 
                    className="BottomContainer__btn">
                    SHOW DETAIL
                </button>
            </div>
            
        </div>
    )
}

const mapStateToProps = state => {
    return {
        order_data: state.orders.data
    }
}

export default connect(mapStateToProps, null) (BottomOrder)
