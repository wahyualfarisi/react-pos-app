import React from 'react';
import Aside from '../components/Aside/Aside';
import Header from '../components/Header/Header';
import Nav from '../components/Nav/Nav';
import './Layout.scss';

function Layout( { children } ) {
    return (
        <div className="Layout">
            <Header />
            <Nav />
            <main className="Main">
                {children}
            </main>
            <Aside />
        </div>
    )
}

export default Layout
