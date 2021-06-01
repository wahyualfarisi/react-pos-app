import React from 'react';
import './Nav.scss';
import { NavLink } from 'react-router-dom';
import data from './NavData';
import { FiArrowRightCircle } from 'react-icons/fi';

function Nav() {
    return (
        <div className="Nav">
            <div className="Navigation">
                <h1 className="Navigation__heading mb-medium">Transaction List</h1>
                <ul className="Navigation__items">
                    {data.map( (item, i) => {
                        return (
                            <li key={i} className="Navigation__items_item">
                                <NavLink to="/" className="Navigation__items_item_link active">
                                    <h3>{item.data}</h3>
                                    <h4>{item.invoiceNumber}</h4>
                                    <p>{item.total}</p>
                                    <button>
                                        Lihat Detail
                                        <FiArrowRightCircle className="btn_icon" />
                                    </button>
                                </NavLink>
                            </li>
                        )
                    })}
                    
                </ul>
            </div>
        </div>
    )
}

export default Nav
