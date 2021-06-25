import React from 'react';
import Modal from '../../../UI/Modal/Modal';
import './ConfirmOrderModal.scss';

const ConfirmOrderModal = ({
    isOpen,
    onClose,
    onSubmit
}) => {
    return (
        <Modal
            isShow={isOpen}
            onClose={onClose}
            title="Confirm Order"
        >
            <div className="ConfirmOrder">
                <img 
                    alt="confirmorder"
                    src={`https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60`} 
                />
                <div className="ConfirmOrder__details">
                    <div className="ConfirmOrder__details_title">
                        <h1>Burger Lezat</h1>
                        <h3>120.000</h3>
                    </div>
                    
                    <div className="ConfirmOrder__details__control">
                        <button>-</button>
                        <span>100</span>
                        <button>+</button>
                    </div>

                    <textarea 
                        rows="8"
                        placeholder="Tambahkan catatan disini ..."
                        >
                    </textarea>
                </div>
            </div>
        </Modal>
    )
}

export default ConfirmOrderModal;
