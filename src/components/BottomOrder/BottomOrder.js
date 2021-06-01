import React from 'react'
import './BottomOrder.scss';

function BottomOrder({ onClick }) {
    return (
        <div className="BottomOrder">
            <div className="BottomContainer">
                <div className="BottomContainer__info">
                    <p>3 Items</p>
                    <h1>Rp, 1.230.000</h1>
                </div>
                <button onClick={onClick} className="BottomContainer__btn">SHOW DETAIL</button>
            </div>
            
        </div>
    )
}

export default BottomOrder
