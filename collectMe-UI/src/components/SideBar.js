import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { findAll } from "../services/categoryService";
import "../styles/SideBar.css";

function SideBar () {

    const [categories, setCategories] = useState([]);
    const [search, setNewSearch] = useState("");

    useEffect(() => {
        findAll()
            .then(setCategories)
            .catch(alert);
    }, []);


    const handleSearchChange = (e) => {
      setNewSearch(e.target.value);
    };
  
    const filtered = !search
      ? categories
      : categories.filter((category) =>
          category.categoryName.toLowerCase().includes(search.toLowerCase())
        );


    return (
    <div id="mySidenav" className="sidenav border container-fluid">

        <div>
            <h2 className="text-white">Category: </h2>
                {" "}
                <input type="text" value={search} onChange={handleSearchChange} />
            <p></p>
            {filtered.map(f => <Link key={"category-"+f.categoryId} to={`category/${f.categoryId}`}>{f.categoryName}</Link>)}
        </div>
        
    </div>
    )
}

export default SideBar;