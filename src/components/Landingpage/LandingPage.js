import React, {Component} from "react";
import "./LandingPage.css"
import time from "../../images/time.jpg"

class LandingPage extends Component{

    
    render() {
        return (
            <div className = "back">
                <div class="left-half">
                    <img className="image_time" src={time} alt="time"/>
                </div>
                <div class="right-half">
                    <article>
                        <h1>Welcome to the ScheduleMester</h1>
                        <p> Schedulemester is an application for convenient planning of coursework by Users.</p>
                    </article>
                </div>
            </div>
        );
    }
}
export default LandingPage;