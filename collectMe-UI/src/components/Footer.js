import "../styles/Footer.css";
import faceBook from "../images/icons/facebook.png";
import twitter from "../images/icons/twitter.png";
import instagram from "../images/icons/instagram.png";
import linkedIn from "../images/icons/linkedin.png";

function Footer () {
    return (

        <footer className="site-footer">
            <div className="d-flex">
                <div className="row">
                    <div className="col-xs-6 col-md-6 text-center">
                        <h6>About</h6>
                        <p className="text-justify">M.A.D. Collection developed this site to finalize our Capstone Project as part of Cohort 46 of Dev-10 Training.  This site was developed as a mix between a Social Networking site with benefits of merchandising.   Browse the existing categories that may interest you. See what members are sharing with us and which items are all the rave.  If you want, go head and create a membership account so you can also share any collectible items you are proud of.</p>
                    </div>

                    <div className="col-xs-6 col-md-3 text-center">
                        <h6>Categories</h6>
                        Site Creation by M.A.D. Developers
                        backed by
                        <p></p>
                        Dev-10 Company
                        Address:<br></br>
                        100 Genesis Corp Way<br></br>
                        Atlanta, GA 30001
                    </div>

                <div className="col-xs-6 col-md-3">
                    <h6>Quick Links</h6>
                    <ul className="footer-links">
                    <li><a href="">About Us</a></li>
                    <li><a href="">Contact Us</a></li>
                    <li><a href="" target="_blank">Attribution</a></li>
                    <li><a href="">Privacy Policy</a></li>
                    <li><a href="">Sitemap</a></li>
                    </ul>
                </div>
                </div>
                <hr></hr>
            </div>
            <div className="container">
                <div className="row">
                <div className="col-md-8 col-sm-6 col-xs-12">
                    <p className="copyright-text">Copyright &copy; 2023 All Rights Reserved by<span> </span>
                <a href="#">M.A.D. Collective</a>.
                    </p>
                </div>

                <div className="col-md-4 col-sm-6 col-xs-12">
                    <ul className="social-icons">
                    <li><a className="facebook" href="#" target="_blank"><i className="fa fa-facebook"><img style={{height: "30px"}} src={faceBook} /></i></a></li>
                    <li><a className="twitter" href="#" target="_blank"><i className="fa fa-twitter"><img style={{height: "30px"}} src={twitter} /></i></a></li>
                    <li><a className="instagram" href="#" target="_blank"><i className="fa fa-instagram"><img style={{height: "30px"}} src={instagram} /></i></a></li>
                    <li><a className="linkedin" href="#" target="_blank"><i className="fa fa-linkedin"><img style={{height: "30px"}} src={linkedIn} /></i></a></li>   
                    </ul>
                </div>
                </div>
            </div>
        </footer>

    )
}

export default Footer;