import React from 'react'

const MenuItem = ({ photo, menu_name, price, onSelected, id }) => {
    
    let image = <div className="imagePlaceholder"></div> 
    if(photo){
        image = (
            <img
                className="Menu__lists-item-img"
                src={photo} alt={menu_name} 
            />
        );
    }

    return (
        <div className="Menu__lists-item">
            <figure>
                {image}
            </figure>
            <div className="Menu__lists-item-info">
                <div>
                    <h4>{menu_name.length > 20 ? `${menu_name.slice(0, 20)}...` : menu_name }</h4>
                    <p>{price}</p>
                </div>
                <button onClick={() => onSelected({ photo, menu_name, price, id })}>ADD</button>
            </div>
        </div>
    )
}


export default MenuItem;
