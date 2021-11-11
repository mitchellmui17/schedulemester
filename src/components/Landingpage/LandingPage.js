import React, {Component} from "react";
import "./LandingPage.css"

import bottom_background from "../../assets/images/waveFont_Trim.png"
import "./../../assets/fonts/font.css"


class LandingPage extends Component{

    
    render() {
        return (
            <div className = "back font-style-JosefinSans">
                <div class="app-description">
                <article>
                        <h1>Welcome to the ScheduleMester</h1>
                        <p> Schedulemester is an application for convenient planning of coursework by Users.</p>
                </article>
                </div>
                <div class="layer1-left">
                    
                </div>
                <div class="layer1-right">
                    
                </div>
                <div class="layer2-left">
                    
                </div>
                <div class="layer2-right">
                    
                </div>
                <div class="bottom" style = {{backgroundImage: `url(${bottom_background})`}}>
                    
                </div>
            </div>
        );
    }
}
export default LandingPage;