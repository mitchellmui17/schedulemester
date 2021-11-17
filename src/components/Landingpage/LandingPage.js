import React, {Component} from "react";
import "./LandingPage.css"
import background from "../../assets/images/wallhaven-g8zvv3.png"
import bottom_background from "../../assets/images/waveFont_Trim.png"
import gallery_img1 from "../../assets/images/wallhaven-83dy9k.png"
import "./../../assets/fonts/font.css"


class LandingPage extends Component{

    
    render() {
        return (
            <div className = "back font-style-Alice backgroundsize" style = {{backgroundImage: `url(${background})`}}>
                <div class="app-description">
                <article>
                        <h1>Welcome to the ScheduleMester</h1>
                        <p> Schedulemester is an application for convenient planning of coursework by Users.</p>
                </article>
                </div>
                <div className="layer1-left imgsize" style = {{backgroundImage: `url(${gallery_img1})`}}>
                    Image gallery
                </div>
                <div className="layer1-right">
                    Undecided
                </div>
                <div className="layer2-left">
                    Events from the CUNY/SUNY
                </div>
                <div className="layer2-right">
                    Breaks/Days off
                </div>
                <div className="bottom" style = {{backgroundImage: `url(${bottom_background})`}}>
                </div>
            </div>
        );
    }
}
export default LandingPage;