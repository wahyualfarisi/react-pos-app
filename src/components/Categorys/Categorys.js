import React from 'react'

const Categorys = ({ category, isActiveCategory, setActiveMenu }) => {
    return (
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
}

export default Categorys;
