import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Footer = () => {
  // Get the current location object from React Router
  const location = useLocation();

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  // Check if the current route is the "Register" page
  const isRegisterPage = location.pathname === "/register";
  const isLoginPage = location.pathname === "/login";
  const isPaymentPage = location.pathname === "/payment";

  // Render null if it's the "Register", "Login", or "Payment" page
  if (isRegisterPage || isLoginPage || isPaymentPage) {
    return null;
  }
  return (
    <>
      <div
        className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              <h4 className="text-white mb-3">Company</h4>
              <Link
                className="btn btn-link"
                to="/about"
                onClick={handleLinkClick}
              >
                About Us
              </Link>
              <Link
                className="btn btn-link"
                to="/contact"
                onClick={handleLinkClick}
              >
                Contact Us
              </Link>
              <Link className="btn btn-link" to="" onClick={handleLinkClick}>
                Privacy Policy
              </Link>
              <Link className="btn btn-link" to="" onClick={handleLinkClick}>
                Terms & Condition
              </Link>
              <Link className="btn btn-link" to="" onClick={handleLinkClick}>
                FAQs & Help
              </Link>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-white mb-3">Contact</h4>
              <p className="mb-2">
                <i className="fa fa-map-marker-alt me-3"></i>123 Street,
                Gujarat, India
              </p>
              <p className="mb-2">
                <i className="fa fa-phone-alt me-3"></i>+91 34532 67890
              </p>
              <p className="mb-2">
                <i className="fa fa-envelope me-3"></i>info@example.com
              </p>
              <div className="d-flex pt-2">
                <Link className="btn btn-outline-light btn-social" to="">
                  <i className="fab fa-twitter"></i>
                </Link>
                <Link className="btn btn-outline-light btn-social" to="">
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link className="btn btn-outline-light btn-social" to="">
                  <i className="fab fa-youtube"></i>
                </Link>
                <Link className="btn btn-outline-light btn-social" to="">
                  <i className="fab fa-linkedin-in"></i>
                </Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-white mb-3">Gallery</h4>
              <div className="row g-2 pt-2">
                <div className="col-4">
                  <img
                    className="img-fluid bg-light p-1"
                    src="assets/img/package-1.jpg"
                    alt=""
                  />
                </div>
                <div className="col-4">
                  <img
                    className="img-fluid bg-light p-1"
                    src="assets/img/package-2.jpg"
                    alt=""
                  />
                </div>
                <div className="col-4">
                  <img
                    className="img-fluid bg-light p-1"
                    src="assets/img/package-3.jpg"
                    alt=""
                  />
                </div>
                <div className="col-4">
                  <img
                    className="img-fluid bg-light p-1"
                    src="assets/img/package-4.jpg"
                    alt=""
                  />
                </div>
                <div className="col-4">
                  <img
                    className="img-fluid bg-light p-1"
                    src="assets/img/package-5.jpg"
                    alt=""
                  />
                </div>
                <div className="col-4">
                  <img
                    className="img-fluid bg-light p-1"
                    src="assets/img/package-6.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-white mb-3">Newsletter</h4>
              <p>
                Stay updated on the latest news and offers. Subscribe to our
                newsletter today!
              </p>
              <div
                className="position-relative mx-auto"
                style={{ maxWidth: "400px" }}
              >
                <input
                  className="form-control border-primary w-100 py-3 ps-4 pe-5"
                  type="text"
                  placeholder="Your email"
                />
                <button
                  type="button"
                  className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2"
                >
                  SignUp
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="copyright">
            <div className="row">
              <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                &copy;{" "}
                <Link
                  className="border-bottom"
                  to="/"
                  onClick={handleLinkClick}
                >
                  Destiny Tour - Your Ultimate Travel Experience
                </Link>
                , All Right Reserved.
                {/*/*** This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. */}
                Designed By
              </div>
              <div className="col-md-6 text-center text-md-end">
                <div className="footer-menu">
                  <Link to="/" onClick={handleLinkClick}>
                    Home
                  </Link>
                  <Link to="">Cookies</Link>
                  <Link to="">Help</Link>
                  <Link to="">FQAs</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* Back to Top */}
      <Link
        className="btn btn-lg btn-primary btn-lg-square back-to-top"
        
        onClick={handleLinkClick}
        >
        <i className="bi bi-arrow-up"></i>
      </Link>
        </div>
    </>
  );
};

export default Footer;
