import React from 'react';
import Aside from '../components/Aside/Aside';
import Header from '../components/Header/Header';
import Nav from '../components/Nav/Nav';
import './Layout.scss';

import { OrderMenuProvider } from './../context/open-order-mobile-context';

function Layout( { children } ) {
    return (
        <OrderMenuProvider>
            <div className="Layout">
                <Header />
                <Nav />
                <main className="Main">
                    {children}
                </main>
                <Aside />
            </div>
        </OrderMenuProvider>
    )
}

export default Layout
