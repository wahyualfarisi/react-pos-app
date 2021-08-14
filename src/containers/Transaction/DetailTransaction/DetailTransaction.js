import React, { useEffect } from 'react'
import './DetailTransaction.scss';
import { Link , useParams} from 'react-router-dom';
import { connect } from 'react-redux';
import {
    getDetail
} from './../../../store/actions/transaction';

function DetailTransaction({

    onLoadDetail
}) {

    const { id } = useParams();

    useEffect( () => {
        onLoadDetail(id)
    }, [id, onLoadDetail])

    return (
        <div className="DetailTrx">
            <section className="DetailTrx_heading">
                <h1>Detail Transaction</h1>
            </section>

            <section className="DetailTrx_Info">
                <div className="DetailTrx_Info-member">
                    <h3>INV-002</h3>
                    <h4>2020-08-12 13:00:34</h4>
                    <h4>Wahyu Alfarisi - Wahyualfarisi30@gmail.com</h4>
                    <h4>081317726873</h4>
                </div>

                <div className="DetailTrx_Info-orders">
                    <h4>Order List</h4>

                    <ul className="DetailTrx_lists">
                        <li className="DetailTrx_item">
                            <figure> 
                                <img src="https://mmc.tirto.id/image/2019/08/12/nasi-goreng-kambing-istock_ratio-16x9.jpg" alt="Item" />
                            </figure>
                            <h5>Nasi Goreng lorem lorem</h5>
                            <p>1 x</p>
                            <p>23.000</p>
                        </li>
                    </ul>

                    <div className="DetailTrx_total">
                        <h1>Total</h1>
                        <p>124.000</p>
                    </div>

                    <div className="DetailTrx_thx">
                        <h6>Thank You : )</h6>
                        <p>I Hope You Are Happy</p>
                        <Link to="/">Order Again</Link>
                    </div>
                </div>

            </section>

        </div>
    )
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadDetail: ( id ) => dispatch( getDetail(id) ) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailTransaction)
