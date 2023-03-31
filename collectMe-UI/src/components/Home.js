import { Link } from 'react-router-dom';

function Home () {
    return (
        <div className="d-flex justify-content-center">
          <button className="nav-item text-dark d-flex justify-content-center"><Link className="nav-link" to="/add">Add Item</Link></button>
        </div>
    )
}

export default Home;