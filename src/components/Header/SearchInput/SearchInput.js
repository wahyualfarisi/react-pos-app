import React from 'react'
import './SearchInput.scss';

function SearchInput() {
    return (
        <div className="SearchInput">
            <input 
                className="SearchInput__item"
                placeholder="Cari makanan, minuman dll"
            />
        </div>
    )
}

export default SearchInput
