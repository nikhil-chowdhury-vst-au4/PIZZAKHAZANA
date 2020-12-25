import React from 'react'
import { Footer } from 'mdbreact'
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import PinterestIcon from '@material-ui/icons/Pinterest';

const FooterComponent = () => (
  <div >
    <br />
    <br />
    <br />
    <br />
    <Footer   >

      <footer className="page-footer deep-purple center-on-small-only pt-0">

          <div className="container">

                <div className="row pt-5 mb-3 text-center d-flex justify-content-center">

                    <div className="col-md-2 mb-3">
                        <h6 className="title font-bold"><a href="/aboutus">About us</a></h6>
                    </div>
                  
                    <div className="col-md-2 mb-3">
                        <h6 className="title font-bold"><a href="/menu">Products</a></h6>
                    </div>
                  
                    <div className="col-md-2 mb-3">
                        <h6 className="title font-bold"><a href="/contactus">Contact</a></h6>
                    </div>

                </div>

                <hr className="rgba-white-light" style={{margin: "0 15%"}}/>


                <hr className="clearfix d-md-none rgba-white-light" style={{margin: "10% 15% 5%"}}/>

                <div className="row pb-3">

                    <div className="col-md-12">

                        <div className="footer-socials mb-5 flex-center">
                            <a href="https://www.facebook.com/zomato/" rel="noopener noreferrer" target="_blank">
                            <FacebookIcon  fontSize="large" />
                            </a>
                            <a href="https://twitter.com/zomato" rel="noopener noreferrer" target="_blank">
                            <TwitterIcon  fontSize="large" />
                            </a>
                            <a href="https://www.linkedin.com/company/zomato" rel="noopener noreferrer" target="_blank">
                            <LinkedInIcon  fontSize="large" />
                            </a>
                            <a href="https://www.instagram.com/zomato/" rel="noopener noreferrer" target="_blank">
                            <InstagramIcon  fontSize="large"/>
                            </a>
                            <a href="https://in.pinterest.com/zomato/" rel="noopener noreferrer" target="_blank">
                            <PinterestIcon  fontSize="large"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-copyright">
                <div className="container-fluid text-center">
                    © 2016 Copyright: <a href="/"> pizzaKhazana </a>
                </div>
            </div>

        </footer>

    </Footer>
  </div>
  
)

export default FooterComponent
