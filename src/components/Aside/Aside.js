import React, { useContext} from 'react';

import './Aside.scss';
import { FiEdit, FiTrash, FiCheck  } from 'react-icons/fi';
import OpenOrderMobileContext from './../../context/open-order-mobile-context';
import { connect } from 'react-redux';
import { 
        removeItemOrder, 
        removeNoteItem, 
        showInputItem,
        changeInput
} from './../../store/actions/orders'

function Aside({
    order_data,

    onRemoveItem,
    onRemoveNote,
    onShowInput,
    onChangeInput
}) {

    const OrderMenuMobileCtx = useContext(OpenOrderMobileContext);

    const subTotalArr = order_data.map(item => item.price * item.qty);

    const total = subTotalArr.reduce((a, b) => a + b , 0);

    const selectedItem = (index, type) => {
       
        switch(type)
        {
            case 'remove_item':
                onRemoveItem(index)
            return;

            case 'remove_note':
                onRemoveNote(index)
            return;

            case 'show_input':
                onShowInput(index)
            return;

            default:
                return false;
        }
    }

    const changeInputHandler = (i, value) => {
        onChangeInput(i, value)
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
                                    <FiTrash 
                                        className="Icon" 
                                        onClick={() => selectedItem(i, 'remove_item')} 
                                    />
                                    <h3>{item.menu_name}</h3>
                                </div>
                                <p className="mb-small">{item.price}</p>
                                {!item.notes && !item.showInput && (
                                    <button 
                                        className="Order__Menu_notes_btn"
                                        onClick={() => selectedItem(i, 'show_input')}
                                        >
                                        <FiEdit className="Order__Menu_notes_icon" />
                                        Add Notes
                                    </button>
                                )}
                                {item.showInput && (
                                    <div>
                                        <textarea 
                                            className="Order__Menu_notes_input"
                                            placeholder="Set some notes"
                                            spellCheck="false"
                                            value={item.notes}
                                            onChange={(event) => changeInputHandler(i, event.target.value)}
                                        />
                                        <div className="Order__Menu_notes_action">
                                            <button 
                                                onClick={() => selectedItem(i, 'show_input') }
                                                className="Order__Menu_notes_btn">
                                                <FiCheck 
                                                    className="Order__Menu_notes_icon" 
                                                /> Done
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {item.notes && !item.showInput && (
                                    <div className="Order__Menu_notes">
                                        <p>{item.notes.slice(0, 100)}</p>
                                        <div className="Order__Menu_notes_action">
                                            <button 
                                                className="Order__Menu_notes_btn"
                                                onClick={() => selectedItem(i, 'show_input')}
                                            >
                                                <FiEdit className="Order__Menu_notes_icon" /> Edit Note
                                            </button>
                                            <button 
                                                onClick={() => selectedItem(i, 'remove_note') }
                                                className="Order__Menu_notes_btn">
                                                <FiTrash 
                                                    className="Order__Menu_notes_icon" 
                                                /> Remove Note
                                            </button>
                                        </div>
                                    </div>
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
        onRemoveItem: (i) => dispatch( removeItemOrder(i) ),
        onRemoveNote: (i) => dispatch( removeNoteItem(i) ),
        onShowInput: (i) => dispatch( showInputItem(i) ),
        onChangeInput: (i, value) => dispatch( changeInput(i, value) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Aside)
