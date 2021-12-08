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
                            <p>Tracker (Murad) is keeping track of everyone's progress, and documenting how their work over time.</p>
                            <p>Unit Tester (Daniel) is setting up unit testing for the application and writing tutorials on how to use it.</p>
                            <p>Code Reviewer (Lucas) is responsible for setting the review standard for the pull requests on GitHub as well as determining the coding standards 
                            for the project.</p>
                            <p>Continuous Integrator (Mitchell) is to making sure every pull request is working successful and managing the deployment process.</p>
                            <p>Customer (Kenneth) is making sure the user stories of the project are being worked on in order of priority for each release,</p>
                            <p>as well as determining the way to go about the implementation process.</p>
                            <p>Designer/Documenter (Dongxin) is responsible for using Figma to design the UI of the website and documenting the progress of the project </p>
                            <h1>Contact Us</h1>
                            <p>Murad: <a className = "links" href='https://github.com/MuradAle'>Github</a></p>
                            <p>Daniel: <a className = "links" href='https://github.com/DD155'>Github</a></p>
                            <p>Lucas: <a className = "links" href='https://github.com/chunxianlin'>Github</a></p>
                            <p>Mitchell: <a className = "links" href='https://github.com/mitchellmui17'>Github</a></p>
                            <p>Kenneth: <a className = "links" href='https://github.com/Primagon'>Github</a></p>
                            <p>Dongxin: <a className = "links" href='https://github.com/dxliang001'>Github</a></p>
                        </article>
                    </div>
                </div>
            );
        }
    }
export default ContactUs;