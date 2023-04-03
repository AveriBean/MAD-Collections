import { Link } from "react-router-dom";

function Category ({ category }) {
    return (
        <div className="d-flex jusitfy-content-end">
            <Link to="/category/{category.categoryId}">{category.categoryName}</Link>
        </div>
    );
}

export default Category;