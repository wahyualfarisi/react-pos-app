import React from 'react'
import { IoFastFood } from 'react-icons/io5';
import { DiGulp } from 'react-icons/di'
import { GiOpenedFoodCan } from 'react-icons/gi'

const Icon = ( { name , className  } ) => {
    switch(name.toLowerCase()){
        case 'minuman': return <DiGulp className={className} />

        case 'makanan': return <GiOpenedFoodCan className={className} />

        default:
            return <IoFastFood className={className} />
    }
}


const Categorys = ({ category, isActiveCategory, setActiveMenu, searchText, datapage }) => {

    let categories = (
        <ul className="Menu__categorys">
            {category.map((item, _) => {

                return (
                <li key={_} className="Menu__categorys-item">
                    <div
                        onClick={() => setActiveMenu(item.name)}
                        className={`Menu__categorys-btn ${isActiveCategory === item.name && `Menu__categorys-btn-active`}`}>
                        <Icon name={item.name} className="Menu__categorys-btn-icon" />
                        <div className="Menu__categorys-btn-name">
                            {item.name}
                        </div> 
                    </div>
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
