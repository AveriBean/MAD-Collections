import { Link } from "react-router-dom";

function Category ({ category }) {

    
    return (
        <div className="d-flex jusitfy-content-end">
            {category.categoryName}
        </div>
    );
}

export default Category;