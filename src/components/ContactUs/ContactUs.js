import React, {Component} from "react";
import about from "../../assets/images/about.jpg"


class ContactUs extends Component{
        render() {
            return (
                <div className = "back">
                    <div class="left-half">
                        <img className="image_time" src={about} alt="about"/>
                    </div>
                    <div class="right-half">
                        <article>
                            <h1>About Us</h1>
                            <p>Tracker is keeping track of everyone progress status, and the documenting how the way how they measure and track.</p>
                            <p>Unit Tester is writing unit testing for the application and tutorial on how to use the unit testing.</p>
                            <p>Code Reviewer is responsible for the request pull from the github and making sure the review process and coding standard 
                            for the projects.</p>
                            <p>Continues Integrator is to making sure every pull request is working successful and establishing the continuous integration.</p>
                            <p>Customer is to making sure the user stories will be created  that define the prioritizing for each release</p>
                            <p>And coming up with acceptance criteria for each of the user stories.</p>
                            <p>Designed is response for using Figma to keep track of the UI of the website and how we want to designed it.</p>
                        </article>
                    </div>
                </div>
            );
        }
    }
export default ContactUs;