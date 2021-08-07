import React, { useState } from 'react';
import Modal from '../../../UI/Modal/Modal';
import './ConfirmOrderModal.scss';

//hooks
import useQuantityCounter from '../../../../hooks/useQuantityCounter';

const ConfirmOrderModal = ({
    isOpen,
    onClose,
    onSubmit,
    selectedMenu
}) => {
    const { photo, menu_name, price } = selectedMenu;
    const [qty, changeQtyHandler] = useQuantityCounter(1);
    const [notes, setNotes] = useState('');
    
    const submitHandler = () => {
        const data = {
            photo,
            menu_name,
            price,
            qty,
            notes,
            showInput: false
        };

        onSubmit(data);
    }

    return (
        <Modal
            isShow={isOpen}
            onClose={onClose}
            title="Confirm Order"
            onSubmit={submitHandler}
        >
            <div className="ConfirmOrder">

                <div className="ConfirmOrder__info">
                    <img 
                        alt="confirmorder"
                        src={photo} 
                    />
                </div>
                <div className="ConfirmOrder__details">
                    <h6>Details Checkout</h6>
                    <div className="ConfirmOrder__details_title">
                        <h1>{menu_name}</h1>
                        <h3>Total: Rp. {price * qty}</h3>
                    </div>
                    
                    <div className="ConfirmOrder__details__control">
                        <button 
                            onClick={() => changeQtyHandler('-')} 
                            disabled={qty === 1}
                            >-
                        </button>
                        <span>{qty}</span>
                        <button 
                            onClick={() => changeQtyHandler('+')}
                            >+
                        </button>
                    </div>

                    <textarea 
                        rows="8"
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Add Notes in here ..."
                        value={notes}
                        >
                        
                    </textarea>
                </div>
            </div>
        </Modal>
    )
}

export default ConfirmOrderModal;
