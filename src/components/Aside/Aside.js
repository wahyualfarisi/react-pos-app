import React, { useContext, useState } from 'react';

import './Aside.scss';
import { FiEdit, FiTrash, FiCheck  } from 'react-icons/fi';
import OpenOrderMobileContext from './../../context/open-order-mobile-context';
import ModalCheckout from './Modal/CheckoutOrder';
import { formatRupiah } from './../../utils/index';
import { connect } from 'react-redux';
import { 
        removeItemOrder, 
        removeNoteItem, 
        showInputItem,
        changeInput,
        changeQtyItem,
        clearItem
} from './../../store/actions/orders'
import {
    createTransaction
} from './../../store/actions/transaction';

function Aside({
    order_data,

    //Order
    onRemoveItem,
    onRemoveNote,
    onShowInput,
    onChangeInput,
    onChangeQty,
    onClearItem,

    //Transaction
    onCreateTransaction,
    isLoadingSubmited
}) {

    const [ form_checkout, setFormCheckout ] = useState({
        email: {
            value: '',
            isValid: false,
            required: true,
            type: 'email',
            placeholder: 'Enter an email',
            label: 'Email',
            pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        },
        phone_number: {
            value: '',
            isValid: false,
            required: true,
            type: 'text',
            placeholder: 'Enter a phone number',
            label: 'Phone number',
            pattern: /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/,
            error: ''
        },
        name: {
            value: '',
            isValid: false,
            required: true,
            type: 'text',
            placeholder: 'Enter an name',
            label: 'Name',
            error: ''
        }
    });
    const [isOpenModal, setIsOpenModal] = useState(false);

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

            case 'increase':
                case 'decrease':
                onChangeQty(index, type);
            return;

            default:
                return false;
        }
    }

    const changeInputHandler = (i, value) => {
        onChangeInput(i, value)
    }

    const submitCheckoutHandler = () => {
       
        const { email, phone_number, name } = form_checkout
        const form_data = new FormData();
        form_data.append('email', email.value);
        form_data.append('phone_number', phone_number.value);
        form_data.append('name', name.value);

        order_data.forEach((item, i) => {
            form_data.append(`menu_id[${i}]`, item.id);
            form_data.append(`qty[${i}]`, item.qty);
            form_data.append(`notes[${i}]`, item.notes)
        })
        
        onCreateTransaction(form_data, res => {

            if(res.status) {
                toggleModalHandler();
                clearForm()
                window.location.hash = `/transaction/${res.sc_key}`

                if( OrderMenuMobileCtx.isOpen ){
                    OrderMenuMobileCtx.onToggle();
                }
            }
        });
    }

    const toggleModalHandler = () => {
        setIsOpenModal(prevState => !prevState);
    }

    const changeFormCheckoutHandler = (e) => {
        const form = { ...form_checkout };
        const getField = form[e.target.name];
        getField.value = e.target.value;
      

        if(getField.value === '' && getField.required){
            getField.error = 'Field is Required'
            getField.isValid = false;
        }else{
            getField.error = ''
            getField.isValid = true;
        }
    
        if(getField.pattern){
            if(getField.pattern.test(getField.value)){
                getField.error = ''
                getField.isValid = true;
            }else{
                getField.error = `${getField.label} is not valid`
                getField.isValid = false;
            }
        }

        setFormCheckout(prevState => ({
            ...prevState,
            [e.target.name]: getField
        }))
    }

    const clearForm = () => {
        setFormCheckout(prevState => ({
            ...prevState,
            email: {
                ...prevState.email,
                isValid: false,
                value: ''
            },
            phone_number: {
                ...prevState.phone_number,
                isValid: false,
                value: ''
            },
            name: {
                ...prevState.name,
                isValid: false,
                value: ''
            }
        }))

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
                                    <h3>{item.menu_name}</h3>
                                </div>
                                <p className="mb-small">{formatRupiah(item.price.toString())}</p>
                               
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
                                <button 
                                    className="Order__Action_Remove" 
                                    onClick={() => selectedItem(i, 'remove_item')} 
                                >
                                    <FiTrash />
                                </button>
                                <button 
                                    className="Order__Action_Decrease"
                                    onClick={() => selectedItem(i, 'decrease')}
                                    disabled={item.qty === 1}
                                    >-
                                </button>
                                <span>{item.qty}</span>
                                <button 
                                    className="Order__Action_Increase"
                                    onClick={() => selectedItem(i, 'increase')}
                                    >+
                                </button>
                            </div>
                        </div>
                        )
                    })}
                </div>
                <div className="Order__totals">
                    <div>
                        <h3>Total</h3>
                        <h1>Rp. {formatRupiah(total.toString())}</h1>
                        <p>{order_data.length} Items</p>
                    </div>
                    <button 
                        className="Order__btncancel"
                        disabled={order_data.length === 0}
                        onClick={onClearItem}
                    >CANCEL</button>
                    <button 
                        className="Order__gopay"
                        disabled={order_data.length === 0}
                        onClick={toggleModalHandler}
                        >ORDER NOW
                    </button>
                </div>
            </div>


            <ModalCheckout 
                isOpen={isOpenModal}
                onSubmit={submitCheckoutHandler}
                onClose={toggleModalHandler}
                formData={form_checkout}
                changeHandler={changeFormCheckoutHandler}
                isLoading={isLoadingSubmited}
            />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        order_data: state.orders.data,
        isLoadingSubmited: state.orders.isLoadingSubmited
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRemoveItem: (i) => dispatch( removeItemOrder(i) ),
        onRemoveNote: (i) => dispatch( removeNoteItem(i) ),
        onShowInput: (i) => dispatch( showInputItem(i) ),
        onChangeInput: (i, value) => dispatch( changeInput(i, value) ),
        onChangeQty: (i, type_of) => dispatch( changeQtyItem(i, type_of) ),
        onCreateTransaction: (form_data, cb) => dispatch( createTransaction(form_data, cb) ),
        onClearItem: () => dispatch( clearItem() )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Aside)
