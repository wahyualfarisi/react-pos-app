import { useState } from 'react'

function useQuantityCounter( initialValue ) {

    const [qty, setQty] = useState( initialValue );

    const changeQtyHandler = (operation) => {
        if( operation === '+'){
            setQty(prevState => prevState += 1)
        }else {
            if(qty > 1){
                setQty(prevState => prevState -= 1)
            }
        }
    }

    return [qty, changeQtyHandler];
}

export default useQuantityCounter
