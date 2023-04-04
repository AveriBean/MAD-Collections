import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { findAll } from "../services/categoryService";
import "../styles/SideBar.css";

function SideBar () {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        findAll()
            .then(setCategories)
            .catch(alert);
    }, []);

    return (
    <div id="mySidenav" className="sidenav border container-fluid">

        <div className="row">
        {categories.map(c => <Link key={"category-"+c.categoryId} to={`category/${c.categoryId}`}>{c.categoryName}</Link>)}
        </div>
        
    </div>
    )
}

export default SideBar;