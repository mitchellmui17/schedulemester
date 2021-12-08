import React from "react";
import {Link} from 'react-router-dom';
import "./Footer.css"
import background from "../../assets/images/wallhaven-0prd9n-trim.png"

function Footer(){
    return (
        <section className="section footer bg-dark text-white font-style-Alice" style = {{backgroundColor:"gray", paddingTop: '1%', paddingBottom:'1%'}}>
            <div className ="container">
                <div className ="row">
                    <div className ="col-md-4">
                        <h6> Project Information</h6>
                        <hr/>
                        <p className="links">
                            Version: 3rd release BETA Version
                        </p>
                    </div>

                    <div className ="col-md-4">
                        <h6>Quick Links</h6>
                        <hr/>
                        <div><Link className="links" to ="/">Home</Link></div>
                        <div><Link className="links"to ="/ContactUs">About Us</Link></div>
                        <div><Link className="links"to ="/SignUp">SignUp</Link></div>
                    </div> 

                    <div className ="col-md-4">
                        <h6>Contact Information</h6>
                        <hr/>
                        <div className="links"><p className = "texxt-white mb-1"> Address: 160 Convent Ave, New York, NY 10031</p></div>
                        <div className="links"><p className = "texxt-white mb-1"> Number: 1-234-8901</p></div>
                        <div className="links"><p className = "texxt-white mb-1"> Email: ScheduleMester@gmail.com</p></div>
                    </div>    
                </div>
            </div>
        </section>
    )
}

export default Footer;