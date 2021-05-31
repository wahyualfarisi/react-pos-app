import React from 'react';
import './Aside.scss';
import { FiEdit  } from 'react-icons/fi';

function Aside() {
    return (
        <div className="Aside">
            <div className="Order">
                <div className="Order__heading">
                    <h1>Order List (1)</h1>
                </div>

                <div className="Order__lists">
                    <div className="Order__lists-item">
                        <div className="Order__Menu">
                            <h3>Roti Bakar Spesial</h3>
                            <p>Rp. 130.000</p>
                            <button>
                                <FiEdit />
                                Add Notes
                            </button>
                        </div>
                        <div className="Order__Action">
                            <button>-</button>
                            <span>2</span>
                            <button>+</button>
                        </div>
                    </div>
                    <div className="Order__lists-item">
                        <div className="Order__Menu">
                            <h3>Pisang Goreng Spesial</h3>
                            <p>Rp. 30.000</p>
                            <button>
                                <FiEdit />
                                Add Notes
                            </button>
                        </div>
                        <div className="Order__Action">
                            <button>-</button>
                            <span>2</span>
                            <button>+</button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Aside
