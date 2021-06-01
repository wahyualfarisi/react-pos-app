import React, { useState } from 'react';

const OrderMenuOnMobileContext = React.createContext({
    isOpen: false,
    onToggle: () => {}
});

export const OrderMenuProvider = ({ children }) => {

    const [isOpen, setIsOpen] = useState(false);

    const onToggleHandler = () => {
        setIsOpen(prevState => !prevState);
    }


    return (
        <OrderMenuOnMobileContext.Provider value={{
            isOpen: isOpen,
            onToggle: onToggleHandler
        }}>
            {children}
        </OrderMenuOnMobileContext.Provider>
    )
}



export default OrderMenuOnMobileContext;