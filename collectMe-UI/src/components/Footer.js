import "../styles/Footer.css";

function Footer () {
    return (

        <footer className="site-footer">
            <div className="container">
                <div className="row">
                <div className="col-sm-12 col-md-6">
                    <h6>About</h6>
                    <p className="text-justify">M.A.D. Collection developed this site to finalize our Capstone Project as part of Cohort 46 of Dev-10 Training.  This site was developed as a mix between a Social Networking site with benefits of merchandising.   Browse the existing categories that may interest you. See was members are sharing with us and which items are all the rave.  If you want, go head and create a membership account so you can also share any collectible items you are proud of.</p>
                </div>

                <div className="col-xs-6 col-md-3">
                    <h6>Categories</h6>
                    <ul className="footer-links">
                    <li><a href="http://scanfcode.com/category/c-language/">C</a></li>
                    <li><a href="http://scanfcode.com/category/front-end-development/">UI Design</a></li>
                    <li><a href="http://scanfcode.com/category/back-end-development/">PHP</a></li>
                    <li><a href="http://scanfcode.com/category/java-programming-language/">Java</a></li>
                    <li><a href="http://scanfcode.com/category/android/">Android</a></li>
                    <li><a href="http://scanfcode.com/category/templates/">Templates</a></li>
                    </ul>
                </div>

                <div className="col-xs-6 col-md-3">
                    <h6>Quick Links</h6>
                    <ul class="footer-links">
                    <li><a href="http://scanfcode.com/about/">About Us</a></li>
                    <li><a href="http://scanfcode.com/contact/">Contact Us</a></li>
                    <li><a href="http://scanfcode.com/contribute-at-scanfcode/">Contribute</a></li>
                    <li><a href="http://scanfcode.com/privacy-policy/">Privacy Policy</a></li>
                    <li><a href="http://scanfcode.com/sitemap/">Sitemap</a></li>
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
                    <ul class="social-icons">
                    <li><a className="facebook" href="#"><i class="fa fa-facebook"></i></a></li>
                    <li><a className="twitter" href="#"><i class="fa fa-twitter"></i></a></li>
                    <li><a className="dribbble" href="#"><i class="fa fa-dribbble"></i></a></li>
                    <li><a className="linkedin" href="#"><i class="fa fa-linkedin"></i></a></li>   
                    </ul>
                </div>
                </div>
            </div>
        </footer>

    )
}

export default Footer;

        {/* <div className="footer container-fluid">
            <div>
                <p>Site Creation by M.A.D. Developers</p>
                <p>backed by</p>
                <p>Dev-10 Company</p>
            </div>

            <div>
                Address:<br></br>
                100 Genesis Corp Way<br></br>
                Atlanta, GA 30001
            </div>

            <div>
                <ul>
                    <li>Facebook<span>F</span></li>
                    <li>Twitter<span>T</span></li>
                    <li>Instagram<span>I</span></li>
                    <li>LinkedIn<span>L</span></li>
                </ul>
                
            </div>

        </div> */}