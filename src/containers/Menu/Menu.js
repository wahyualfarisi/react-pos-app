import React from 'react';
import MenuData from './MenuData';
import './Menu.scss';


function Menu() {
    return (
        <div className="Menu">
            <h1>Menu</h1>
            <ul className="Menu__categorys">
                <li className="Menu__categorys-item">
                    <button className="Menu__categorys-btn Menu__categorys-btn-active">All</button>
                </li>
                <li className="Menu__categorys-item">
                    <button className="Menu__categorys-btn">Makanan</button>
                </li>
                <li className="Menu__categorys-item">
                    <button className="Menu__categorys-btn">Minuman</button>
                </li>
            </ul>

            <div className="Menu__lists">
                {MenuData.map((item, i) => {
                    return (
                        <div key={i} className="Menu__lists-item">
                            <figure>
                                <img 
                                    className="Menu__lists-item-img"
                                    src={item.photo} alt={item.menu_name} 
                                />
                            </figure>
                            <div className="Menu__lists-item-info">
                                <div>
                                    <h4>{item.menu_name.length > 20 ? `${item.menu_name.slice(0, 20)}...` : item.menu_name }</h4>
                                    <p>{item.price}</p>
                                </div>
                                <button>ADD</button>
                            </div>
                        </div>
                    );
                })}
                
            </div>
        </div>
    )
}

export default Menu
