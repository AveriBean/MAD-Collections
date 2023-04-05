import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { findAll } from "../services/categoryService";

import "../styles/Category.css";

function Category () {
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
    <div className="catnav container text-center">

        <div className="">
            <h2 className="">Category: </h2>
            <div className="searchText">{" "}</div>
            <input type="text" value={search} onChange={handleSearchChange} />
            <p></p>
        </div>

        <div>
            {filtered.map(f => <Link key={"category-"+f.categoryId} to={`category/${f.categoryId}`}>{f.categoryName}</Link>)}
        </div>
        
    </div>
    )
}

export default Category;