import React from "react";
import {Link} from 'react-router-dom';
import "./Footer.css"

function Footer(){
    return (
        <section className="section footer bg-dark text-white">
            <div className ="container">
                <div className ="row">
                    <div className ="col-md-4">
                        <h6> Project Information</h6>
                        <hr/>
                        <p>
                            blablablabla  blablablabla blablablabla blablablabla blablablabla blablablabla
                            blablablabla blablablabla blablablabla blablablabla blablablabla blablablabla
                        </p>
                    </div>

                    <div className ="col-md-4">
                        <h6>Quick Link</h6>
                        <hr/>
                        <div><Link to ="/">Home</Link></div>
                        <div><Link to ="/ContactUs">about</Link></div>
                        <div><Link to ="/ContactUs">ContactUs</Link></div>
                        <div><Link to ="/SignUp">SignUp</Link></div>
                    </div> 

                    <div className ="col-md-4">
                        <h6>Contact Information</h6>
                        <hr/>
                        <div><p className = "texxt-white mb-1"> Adress blablabla. New York</p></div>
                        <div><p className = "texxt-white mb-1"> 1-718-8888888</p></div>
                        <div><p className = "texxt-white mb-1"> gmail@gmail.com</p></div>
                    </div>    
                </div>
            </div>
        </section>
    )
}

export default Footer;