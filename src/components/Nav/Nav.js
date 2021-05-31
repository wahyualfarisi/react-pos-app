import React from 'react';
import './Nav.scss';
import { FiCircle } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

function Nav() {
    return (
        <div className="Nav">
            <div className="Navigation">
                <h1 className="Navigation__heading mb-medium">Transaction List</h1>
                <ul className="Navigation__items">
                    <li className="Navigation__items_item">
                        <NavLink to="/" className="Navigation__items_item_link">
                            <FiCircle className="Navigation__items_item_icon"  />
                            <p>INV-0001</p>
                        </NavLink>
                    </li>
                    <li className="Navigation__items_item">
                        <NavLink to="/" className="Navigation__items_item_link">
                            <FiCircle className="Navigation__items_item_icon" />
                            <p>INV-0002</p>
                        </NavLink>
                    </li>
                    <li className="Navigation__items_item">
                        <NavLink to="/" className="Navigation__items_item_link">
                            <FiCircle className="Navigation__items_item_icon" />
                            <p>INV-0003</p>
                        </NavLink>
                    </li>
                    <li className="Navigation__items_item">
                        <NavLink to="/" className="Navigation__items_item_link">
                            <FiCircle className="Navigation__items_item_icon" />
                            <p>INV-0004</p>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Nav
