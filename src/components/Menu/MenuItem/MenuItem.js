import React from 'react'

const MenuItem = ({ imgUrl, name, price, onSelected }) => {
    
    return (
        <div className="Menu__lists-item">
            <figure>
                <img
                    className="Menu__lists-item-img"
                    src={`http://139.162.23.206:8080/${imgUrl}`} alt={name} 
                />
            </figure>
            <div className="Menu__lists-item-info">
                <div>
                    <h4>{name.length > 20 ? `${name.slice(0, 20)}...` : name }</h4>
                    <p>{price}</p>
                </div>
                <button onClick={() => onSelected({ imgUrl, name, price })}>ADD</button>
            </div>
        </div>
    )
}


export default MenuItem;
