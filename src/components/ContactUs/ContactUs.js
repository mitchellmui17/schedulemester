import React, {Component} from "react";
import about from "../../assets/images/about.jpg"
import "./../../assets/fonts/font.css"
import background from "../../assets/images/wallhaven-0qpr1q.png"
import './ContactUs.css'

class ContactUs extends Component{
        render() {
            return (
                <div className = "back font-style-Alice" style = {{backgroundImage: `url(${background})`}}>
                    {/* <div className="left-half">
                        <img className="image_time" src={about} alt="about"/>
                    </div> */}
                    <div>
                        <article className="text-style" style = {{textAlign: "justify", margin: 70}}>
                            <h1>About Us</h1>
                            <p>Tracker (Murad) is keeping track of everyone progress status, and the documenting how the way how they measure and track.</p>
                            <p>Unit Tester (Daniel) is writing unit testing for the application and tutorial on how to use the unit testing.</p>
                            <p>Code Reviewer (Lucas) is responsible for the request pull from the github and making sure the review process and coding standard 
                            for the projects.</p>
                            <p>Continues Integrator (Mitchell) is to making sure every pull request is working successful and establishing the continuous integration.</p>
                            <p>Customer (Kenneth) is to making sure the user stories will be created  that define the prioritizing for each release</p>
                            <p>And coming up with acceptance criteria for each of the user stories.</p>
                            <p>Designed (Dongxin) is response for using Figma to keep track of the UI of the website and how we want to designed it.</p>
                            <h1>Contact Us</h1>
                            <p>Murad:</p>
                            <p>Daniel:</p>
                            <p>Lucas:</p>
                            <p>Mitchell:</p>
                            <p>Kenneth:</p>
                            <p>Dongxin:</p>
                        </article>
                    </div>
                </div>
            );
        }
    }
export default ContactUs;