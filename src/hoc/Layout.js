import React from 'react';
import Aside from '../components/Aside/Aside';
import Header from '../components/Header/Header';
import SearchInput from '../components/Header/SearchInput/SearchInput';
import Nav from '../components/Nav/Nav';
import './Layout.scss';

function Layout( { children } ) {
    return (
        <div className="Layout">
            <Header />
            <SearchInput />
            <Nav />
            <main className="Main">
                {children}
            </main>
            <Aside />
        </div>
    )
}

export default Layout
