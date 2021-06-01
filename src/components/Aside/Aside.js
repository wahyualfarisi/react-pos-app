import React from 'react';
import './Aside.scss';
import { FiEdit  } from 'react-icons/fi';
import AsideData from './AsideData';

function Aside() {
    return (
        <div className="Aside">
            <div className="Order">
                <div className="Order__heading">
                    <h1>Order List (1)</h1>
                </div>

                <div className="Order__lists">
                    {AsideData.map( (item, i) => {
                        return (
                        <div key={i} className="Order__lists-item">
                            <div className="Order__Menu">
                                <h3>{item.name}</h3>
                                <p className="mb-small">{item.price}</p>
                                {!item.notes && (
                                    <button>
                                        <FiEdit />
                                        Add Notes
                                    </button>
                                )}
                                {item.notes && (
                                    <>
                                    <p>{item.notes}</p>
                                    <button><FiEdit /> Edit Notes</button>
                                    </>

                                )}
                            </div>
                            <div className="Order__Action">
                                <button>-</button>
                                <span>{item.qty}</span>
                                <button>+</button>
                            </div>
                        </div>
                        )
                    })}
                </div>
                <div className="Order__totals">
                    <div>
                        <h3>Total</h3>
                        <h1>Rp. 530,000</h1>
                    </div>
                    <button>BAYAR</button>
                </div>
            </div>
        </div>
    )
}

export default Aside
