import { useEffect, useState } from "react";
import { findAll } from "../services/categoryService";
import "../styles/SideBar.css";
import Category from "./Category";

function SideBar () {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        findAll()
            .then(setCategories)
            .catch(alert);
    }, []);

    return (
    <div id="mySidenav" className="sidenav border container-fluid h-100">

        <div className="row h-100">
            <a className="list-group-item" href="#">{categories.map(c => <Category key={c.categoryId} category={c} />)}</a>
        </div>
        
    </div>
    )
}

export default SideBar;