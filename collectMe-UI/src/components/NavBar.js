import { Link } from 'react-router-dom';

function NavBar () {
    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#home"><h1 className="text-white">M.A.D. Collectibles</h1></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsible" aria-controls="collapsible" aria-expanded="false"
            aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsible">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        
                        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/add">Add Item</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/categories">Categories</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/items">Items</Link></li>

                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;