import React from 'react'

const MenuItem = ({ photo, menu_name, price, onSelected }) => {
    
    return (
        <div className="Menu__lists-item">
            <figure>
                <img
                    className="Menu__lists-item-img"
                    src={photo} alt={menu_name} 
                />
            </figure>
            <div className="Menu__lists-item-info">
                <div>
                    <h4>{menu_name.length > 20 ? `${menu_name.slice(0, 20)}...` : menu_name }</h4>
                    <p>{price}</p>
                </div>
                <button onClick={() => onSelected({ photo, menu_name, price })}>ADD</button>
            </div>
        </div>
    )
}


export default MenuItem;
