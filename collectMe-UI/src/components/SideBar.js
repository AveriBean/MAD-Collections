import { useEffect, useState } from "react";
import { findAll } from "../services/categoryService";
import "../styles/SideBar.css";
import Category from "./Category";

function SideBar () {

    const [categories, setCategories] = useState([]);
    const [filteredList, setFilteredList] = new useState(categories);

    const filterBySearch = (event) => {
      // Access input value
      const query = event.target.value;
      // Create copy of item list
      var updatedList = [...categories];
      // Include all elements which includes the search query
      updatedList = updatedList.filter((item) => {
        return item.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      });
      // Trigger render with updated values
      setFilteredList(updatedList);
    };

    useEffect(() => {
        findAll()
            .then(setCategories)
            .catch(alert);
    }, []);

    return (
    <div id="mySidenav" className="sidenav border container-fluid">

        <div className="row">
            <div>
                <div className="search-header">
                    <div className="search-text">Search:</div>
                    <input id="search-box" onChange={filterBySearch} />
                </div>
                <div id="item-list">
                    <ol>
                    {filteredList.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                    </ol>
                </div>
            </div>

            <div className="col">
            <a className="list-group-item" href="#">{categories.map(c => <Category key={c.categoryId} category={c} />)}</a>
            </div>
        </div>
        
    </div>
    )
}

export default SideBar;