import React, { useContext } from 'react';
import './Aside.scss';
import { FiEdit, FiTrash  } from 'react-icons/fi';
import OpenOrderMobileContext from './../../context/open-order-mobile-context';
import { connect } from 'react-redux';
import { removeItemOrder } from './../../store/actions/orders'

function Aside({
    order_data,

    onRemoveItem
}) {

    const OrderMenuMobileCtx = useContext(OpenOrderMobileContext);

    const subTotalArr = order_data.map(item => item.price * item.qty);

    const total = subTotalArr.reduce((a, b) => a + b , 0);

    const removeItemHandler = index => {
        onRemoveItem(index)
    }

    return (
        <div className={OrderMenuMobileCtx.isOpen ? 'Aside Aside__open' : 'Aside'}>
            <div className="Order">
                <div className="Order__heading">
                    <h1>Order List ({order_data.length}) Item</h1>
                    {OrderMenuMobileCtx.isOpen && <button onClick={OrderMenuMobileCtx.onToggle}>Close</button>}
                </div>

                <div className="Order__lists">
                    {order_data.map( (item, i) => {
                        return (
                        <div key={i} className="Order__lists-item">
                            <img src={item.photo} alt="Makanan" className="Order__Menu_img" />
                            <div className="Order__Menu">
                                <div className="Order__Menu_title">
                                    <FiTrash className="Icon" onClick={() => removeItemHandler(i)} />
                                    <h3>{item.menu_name}</h3>
                                </div>
                                <p className="mb-small">{item.price}</p>
                                {!item.notes && (
                                    <button>
                                        <FiEdit />
                                        Add Notes
                                    </button>
                                )}
                                {item.notes && (
                                    <>
                                        <p>{item.notes}</p>
                                        <button><FiEdit /> Edit Notes</button>
                                    </>
                                )}
                            </div>
                            <div className="Order__Action">
                                <button>-</button>
                                <span>{item.qty}</span>
                                <button>+</button>
                            </div>
                        </div>
                        )
                    })}
                </div>
                <div className="Order__totals">
                    <div>
                        <h3>Total</h3>
                        <h1>Rp. {total}</h1>
                        <p>{order_data.length} Items</p>
                    </div>
                    <button className="Order__btncancel">CANCEL</button>
                    <button className="Order__gopay">ORDER NOW</button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        order_data: state.orders.data
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRemoveItem: (i) => dispatch( removeItemOrder(i) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Aside)
