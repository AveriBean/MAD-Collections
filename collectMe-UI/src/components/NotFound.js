import {Link} from "react-router-dom"
import '../styles/NotFound.css'
import notFound from "../utilities/NotFoundPhoto/MADCollectionsNotFound.avif"

function NotFound() {
    return (
      <div style={{minHeight: "100vh"}} className="container-fluid">
        <div className="bgNotFound">
          <h2 className="textNotFound text-center">Sorry, Page Not Found. . .</h2>

          <div className="text-center">
          <img className="rounded-5 my-1" src={notFound} alt="not found" />
          </div>

          <div className="text-center">
              <Link to="/" className="btn btn-outline-light my-2">Click Here to Return to Home Page</Link>
          </div>
        </div>
      </div>
    );
  }
  
  export default NotFound;