import React, {Component} from "react";
import "./LandingPage.css"
import background from "../../assets/images/wallhaven-g8zvv3.png"
import bottom_background from "../../assets/images/waveFont_Trim.png"
import gallery_img1 from "../../assets/images/wallhaven-83dy9k.png"
import "./../../assets/fonts/font.css"
import Video from "../../videos/video.mp4";



class LandingPage extends Component{

    
    render() {
        return (
            <div className = "back font-style-JosefinSans backgroundsize" style = {{backgroundImage: `url(${background})`}}>
                <div class="Video">
                     <video autoPlay loop muted >
                         <source src={Video}type = "video/mp4"/> 
                     </video>
                </div>
                <div className="layer1-left imgsize" style = {{backgroundImage: `url(${gallery_img1})`}}>

                </div>
                <div className="layer1-right">
                
                <h1>Welcome to the ScheduleMester</h1>
                        <p> Schedulemester is an application for convenient planning of coursework by Users.</p>
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
