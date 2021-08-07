import React from 'react'

const Categorys = ({ category, isActiveCategory, setActiveMenu, searchText, datapage }) => {

    let categories = (
        <ul className="Menu__categorys">
            {category.map((item, _) => {
                return (
                <li key={_} className="Menu__categorys-item">
                    <button 
                        onClick={() => setActiveMenu(item.name)}
                        className={`Menu__categorys-btn ${isActiveCategory === item.name && `Menu__categorys-btn-active`}`}>
                        {item.name}
                    </button>
                </li>
                )
            })}
        </ul>
    )

    if(searchText){
        categories = (
            <div className="Menu__results_search">
                <h2>Search : {searchText} </h2>
                <h3>Result : {datapage && datapage.total} Item </h3>
            </div>
        )
    }

    return categories;
}

export default Categorys;
