import React from 'react';
import './Nav.scss';
import { FiCircle } from 'react-icons/fi';

function Nav() {
    return (
        <div className="Nav">
            <div className="Navigation">
                <h1 className="mb-medium">Menu</h1>
                <ul className="Navigation__items">
                    <li className="Navigation__items_item">
                        <a href="#" className="Navigation__items_item_link">
                            <FiCircle className="Navigation__items_item_icon"  />
                            <p>Makanan</p>
                        </a>
                    </li>
                    <li className="Navigation__items_item">
                        <a href="#" className="Navigation__items_item_link">
                            <FiCircle className="Navigation__items_item_icon" />
                            <p>Minuman</p>
                        </a>
                    </li>
                    <li className="Navigation__items_item">
                        <a href="#" className="Navigation__items_item_link">
                            <FiCircle className="Navigation__items_item_icon" />
                            <p>Cemilan</p>
                        </a>
                    </li>
                    <li className="Navigation__items_item">
                        <a href="#" className="Navigation__items_item_link">
                            <FiCircle className="Navigation__items_item_icon" />
                            <p>Lain - lain</p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Nav
