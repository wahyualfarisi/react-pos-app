import React from 'react'
import { formatRupiah } from './../../../utils/index';

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
            <figure className="Menu__lists-item-figure">
                {image}
                <button
                    className="Menu__lists-item-btnAdd" 
                    onClick={() => onSelected({ photo, menu_name, price, id })}>ADD
                </button>
            </figure>
            <div className="Menu__lists-item-info">
                <div>
                    <h4>{menu_name.length > 20 ? `${menu_name.slice(0, 20)}...` : menu_name }</h4>
                    <p>{formatRupiah(price.toString())}</p>
                </div>
            </div>
        </div>
    )
}


export default MenuItem;
