import React, {useState} from 'react';
import {Link} from "react-router-dom";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ProductSearch from "../Products/ProductSearch";

function ShopSidebar() {

    const [categorymenu,setcategoryMenu] = useState<any[]>([
    {id:'1', status: false}
    ])

    const handleCategoryMenu = (id:string)=>{
        const menu = categorymenu.filter(x=>x.id === id)
        menu[0].status === false ?  menu[0].status = true : menu[0].status = false;
        setcategoryMenu([...categorymenu,menu])
    }

    return (
        <>

                <ProductSearch/>
                <div className="shop__sidebar--widget widget__area d-md-none">
                    <div className="single__widget widget__bg">
                        <h2 className="widget__title position__relative h3">Categories</h2>
                        <ul className="widget__categories--menu">
                            <li className="widget__categories--menu__list">
                                <label onClick={()=>handleCategoryMenu('1')} className="widget__categories--menu__label d-flex align-items-center">
                                    <Link to='#adasd'>
                                    <img className="widget__categories--menu__img"
                                         src="https://bit.ly/3JOzYtm" alt="categories-img"/>
                                        <span className="widget__categories--menu__text">Denim Jacket</span>
                                    </Link>
                                    <KeyboardArrowDownIcon/>
                                </label>
                                <ul style={
                                    categorymenu.filter(x=>x.id==='1')[0].status === true ?
                                        {display:'block'}: {display:'none'}
                                     }
                                    className="widget__categories--sub__menu">
                                    <li className="widget__categories--sub__menu--list">
                                        <a className="widget__categories--sub__menu--link d-flex align-items-center"
                                           href="shop.html">
                                                <span className="widget__categories--sub__menu--text">Mini Dresss</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
        </>
    );
}

export default ShopSidebar;