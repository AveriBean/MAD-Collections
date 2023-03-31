import {Link} from "react-router-dom"
import notFound from "../utilities/images/404.webp"

function NotFound() {
    return (
      <main>
        <h2 className="textNotFound text-center">Oops, Page Not Found!</h2>
        <div className="text-center">
        <img src={notFound} alt="not found" />
        </div>
        <div className="text-center">
            <Link to="/" className="btn btn-outline-primary me-2">Click Here to Return to Home Page</Link>
        </div>
      </main>
    );
  }
  
  export default NotFound;