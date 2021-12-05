import React from "react";
import {Link} from 'react-router-dom';
import "./Footer.css"
import background from "../../assets/images/wallhaven-0prd9n.jpg"

function Footer(){
    return (
        <section className="section footer bg-dark text-white font-style-Alice" style = {{backgroundImage: `url(${background})`}}>
            <div className ="container">
                <div className ="row">
                    <div className ="col-md-4">
                        <h6> Project Information</h6>
                        <hr/>
                        <p>
                            Version: 3rd release BETA Version
                        </p>
                    </div>

                    <div className ="col-md-4">
                        <h6>Quick Link</h6>
                        <hr/>
                        <div><Link to ="/">Home</Link></div>
                        <div><Link to ="/ContactUs">About Us</Link></div>
                        <div><Link to ="/SignUp">SignUp</Link></div>
                    </div> 

                    <div className ="col-md-4">
                        <h6>Contact Information</h6>
                        <hr/>
                        <div><p className = "texxt-white mb-1"> Adress blablabla. New York</p></div>
                        <div><p className = "texxt-white mb-1"> 1-234-5678901</p></div>
                        <div><p className = "texxt-white mb-1"> ScheduleMester@gmail.com</p></div>
                    </div>    
                </div>
            </div>
        </section>
    )
}

export default Footer;