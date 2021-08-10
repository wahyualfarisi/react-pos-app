import React from 'react';
import Modal from '../../UI/Modal/Modal';
import './CheckoutOrder.scss';


function CheckoutOrder({
    isOpen,
    onClose,
    onSubmit,
    formData,
    changeHandler
}) {

    const formIsValid =  Object.values(formData).every(item => item.isValid === true );
    
    const submitHandler = () => {
        if(formIsValid){
            onSubmit()
        }
    }

    
    return (
       <Modal
            isShow={isOpen}
            onClose={onClose}
            title="Checkout Confirmation"
            onSubmit={submitHandler}
            isDisabledSubmit={!formIsValid}
       >
            <div className="CheckoutOrder">
                {Object.keys(formData).map((item, i) => {
                    return (
                        <div className="form-group" key={i}>
                            <label htmlFor="email">{formData[item].label}</label>
                            <input 
                                type={formData[item].type} 
                                name={item} 
                                id={item} 
                                placeholder={formData[item].placeholder} 
                                spellCheck="false"
                                value={formData[item].value}
                                required={formData[item].required}
                                onChange={changeHandler}
                            />
                            <div>{formData[item].error}</div>
                        </div>
                    )
                })}
            </div>
       </Modal>
    )
}

export default CheckoutOrder
