import { Link } from "react-router-dom";
import Uttarakhand from "./DestinationDetails/Uttarakhand";
import Kedarnath from "./DestinationDetails/Kedarnath";
import Meghalaya from "./DestinationDetails/Meghalaya";
import TajMahal from "./DestinationDetails/TajMahal";
import Sikkim from "./DestinationDetails/Sikkim";
import Ooty from "./DestinationDetails/Ooty";
import Manali from "./DestinationDetails/Manali";
import Ladakh from "./DestinationDetails/Ladakh";
import React, { useEffect, useState } from 'react';

const Destination = () => {
  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 2 seconds, replace with your actual loading logic
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

    return (
        <>
        {loading ? (
        <div id="spinner" className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" style={{
    width: '3rem',
    height: '3rem',
  }} role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
    ) : (
            <div className="container-fluid bg-primary py-5 mb-5 hero-header">
                <div className="container py-5">
                    <div className="row justify-content-center py-5">
                        <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
                            <h1 className="display-3 text-white animated slideInDown">Destination</h1>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb justify-content-center">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item text-white active" aria-current="page">Destination</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
             )}
        <div className="container-xxl py-5 destination">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Destination
            </h6>
            <h1 className="mb-5">Popular Destination</h1>
          </div>
            {/* Destination 1 - Uttarakhand */}
            <div className="row g-3 wow zoomIn">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="position-relative overflow-hidden">
                <Link
                  className="position-relative d-block overflow-hidden"
                  to="/packages"
                  onClick={handleLinkClick}
                >
                  <img
                    className="img-fluid rounded"
                    
                    src="assets/img/uttarakhand.jpg"
                    alt=""
                  />
                  <div className="bg-white text-primary fw-bold position-absolute bottom-0 start-0 m-3 py-1 px-2">
                    Uttarakhand
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="bg-white p-3">
                <h3 className="text-primary">Uttarakhand</h3>
                <Uttarakhand />
              </div>
            </div>
          </div>
          <br/>
          <hr />   
            <br/>
            <div className="row g-3 wow zoomIn">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="position-relative overflow-hidden">
                <Link
                  className="position-relative d-block overflow-hidden"
                  to="/packages"
                  onClick={handleLinkClick}
                >
                  <img
                    className="img-fluid rounded"
                    src="assets/img/tajmahal1.jpg"
                    alt=""
                  />
                  <div className="bg-white text-primary fw-bold position-absolute bottom-0 start-0 m-3 py-1 px-2">
                  Taj Mahal
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="bg-white p-3">
                <h3 className="text-primary">Taj Mahal</h3>
                <TajMahal />
              </div>
            </div>
        </div>
        <br/>
          <hr />   
            <br/>
            <div className="row g-3 wow zoomIn">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="position-relative overflow-hidden">
                  <Link
                    className="position-relative d-block overflow-hidden"
                    to="/packages"
                    onClick={handleLinkClick}
                  >
                    <img
                      className="img-fluid"
                      src="assets/img/kedarnath.jpg"
                      alt=""
                    />
                    <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">
                      Kedarnath
                    </div>
                  </Link>
                  </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="bg-white p-3">
                    <h3 className="text-primary">Kedarnath</h3>
                    <Kedarnath/>
                </div>
            </div>
          </div>
          <br/>
          <hr />   
            <br/>        
          <div className="row g-3 wow zoomIn">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="position-relative overflow-hidden">
                <Link
                  className="position-relative d-block overflow-hidden"
                  to="/packages"
                  onClick={handleLinkClick}
                >
                  <img
                    className="img-fluid rounded"
                    src="assets/img/meghalaya.jpg"
                    alt=""
                  />
                  <div className="bg-white text-primary fw-bold position-absolute bottom-0 start-0 m-3 py-1 px-2">
                  Meghalaya
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="bg-white p-3">
                <h3 className="text-primary">Meghalaya</h3>
                <Meghalaya />
              </div>
            </div>
        </div>
        <br/>
          <hr />   
            <br/>
        <div className="row g-3 wow zoomIn">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="position-relative overflow-hidden">
                <Link
                  className="position-relative d-block overflow-hidden"
                  to="/packages"
                  onClick={handleLinkClick}
                >
                  <img
                    className="img-fluid rounded"
                    src="assets/img/manali1.jpg"
                    alt=""
                  />
                  <div className="bg-white text-primary fw-bold position-absolute bottom-0 start-0 m-3 py-1 px-2">
                  Manali
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="bg-white p-3">
                <h3 className="text-primary">Manali</h3>
                <Manali />
              </div>
            </div>
        </div>
        <br/>
          <hr />   
            <br/>
        <div className="row g-3 wow zoomIn">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="position-relative overflow-hidden">
                <Link
                  className="position-relative d-block overflow-hidden"
                  to="/packages"
                  onClick={handleLinkClick}
                >
                  <img
                    className="img-fluid rounded"
                    src="assets/img/sikkim.jpg"
                    alt=""
                  />
                  <div className="bg-white text-primary fw-bold position-absolute bottom-0 start-0 m-3 py-1 px-2">
                  Sikkim
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="bg-white p-3">
                <h3 className="text-primary">Sikkim</h3>
                <Sikkim />
              </div>
            </div>
        </div>
        <br/>
          <hr />   
            <br/>
        <div className="row g-3 wow zoomIn">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="position-relative overflow-hidden">
                <Link
                  className="position-relative d-block overflow-hidden"
                  to="/packages"
                  onClick={handleLinkClick}
                >
                  <img
                    className="img-fluid rounded"
                    src="assets/img/ooty.jpg"
                    alt=""
                  />
                  <div className="bg-white text-primary fw-bold position-absolute bottom-0 start-0 m-3 py-1 px-2">
                  Ooty
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="bg-white p-3">
                <h3 className="text-primary">Ooty</h3>
                <Ooty />
              </div>
            </div>
        </div>
        <br/>
          <hr />   
            <br/>
        <div className="row g-3 wow zoomIn">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="position-relative overflow-hidden">
                <Link
                  className="position-relative d-block overflow-hidden"
                  to="/packages"
                  onClick={handleLinkClick}
                >
                  <img
                    className="img-fluid rounded"
                    src="assets/img/ladakh1.jpg"
                    alt=""
                  />
                  <div className="bg-white text-primary fw-bold position-absolute bottom-0 start-0 m-3 py-1 px-2">
                  Ladakh
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="bg-white p-3">
                <h3 className="text-primary">Ladakh</h3>
                <Ladakh />
              </div>
            </div>
        </div>
            </div>
        </div>
   
        </>
    )
}

export default Destination;