import React, {Component} from "react";
import "./LandingPage.css"
import background from "../../assets/images/wallhaven-0prd9n.jpg"
import bottom_background from "../../assets/images/waveFont_Trim.png"
import gallery_img1 from "../../assets/images/wallhaven-83dy9k.png"
import "./../../assets/fonts/font.css"
import Video from "../../videos/video.mp4";
import { Card, Col, Container, Row } from "react-bootstrap";
import background2 from "../../assets/images/wallhaven-01e2zg.png"


class LandingPage extends Component{

    
    render() {
        return (
            <div className = "back font-style-Alice backgroundsize" style = {{backgroundImage: `url(${background})`}}>
                    <div class="Video">
                        <video autoPlay loop muted >
                            <source src={Video}type = "video/mp4"/> 
                        </video>
                    </div> 
                <div className="layer1-left imgsize" style = {{backgroundImage: `url(${gallery_img1})`}}>
                </div>

                <div className="layer1-right" style = {{backgroundImage: `url(${background2})`}}>
                
                <h1>Welcome to ScheduleMester</h1>
                        <article style={{textAlign: 'justify', margin: 20, lineHeight: 2}}>
                            Schedulemester is an application for convenient planning of coursework by Users. 
                            We are dedicated to providing an application that can improve users' performance and efficiency. 
                            ScheduleMester will help to keep track of every event and task and plan out the efficient way to complete them. 
                            Users are able to see their most urgent tasks that need to be completed as well as a graph detailing their progress. 
                        </article>
                </div>
                <div className="layer2-left"  style = {{backgroundImage: `url(${background2})`}}>
                    <h3> CUNY 2021 FALL EVENTS</h3>
                    <Container>
                        <Row>
                            <Col>📝12/13/2021</Col>
                            <Col>Monday</Col>
                            <Col xs={7}>Last day to drop a course with a grade of W</Col>
                        </Row>
                        <Row>
                            <Col>📝12/14/2021</Col>
                            <Col>Tuesday</Col>
                            <Col xs={7}>Reading Day/Final Examinations</Col>
                        </Row>
                        <Row>
                            <Col>📝12/15/2021-12/21/2021</Col>
                            <Col>Wednesday-Tuesday</Col>
                            <Col xs={7}>Final Examinations</Col>
                        </Row>
                        <Row>
                            <Col>📝12/21/2021</Col>
                            <Col>Tuesday</Col>
                            <Col xs={7}>End of Fall Term</Col>
                        </Row>
                        <Row>
                            <Col>📝12/27/2021</Col>
                            <Col>Thursday</Col>
                            <Col xs={7}>Final Grade Submission Deadline*</Col>
                        </Row>
                        <Row>
                            <Col>📝01/01/2022</Col>
                            <Col>Saturday</Col>
                            <Col xs={7}>Fall 2021 Degree Conferral Date</Col>
                        </Row>
                    </Container>
                    <h3> CUNY 2021 WINTER EVENTS</h3>
                    <Container>
                        <Row>
                            <Col>📝12/20/2021</Col>
                            <Col>Monday</Col>
                            <Col xs={7}>Deadline to upload proof of COVID-19 vaccination documents to CUNYfirst</Col>
                        </Row>
                        <Row>
                            <Col>📝1/3/2022</Col>
                            <Col>Monday</Col>
                            <Col xs={7}>Start of Winter Session</Col>
                        </Row>
                        <Row>
                            <Col>📝1/24/2022</Col>
                            <Col>Monday</Col>
                            <Col xs={7}>End of Winter Session</Col>
                        </Row>
                    </Container>
                </div>
                <div className="layer2-right" style = {{backgroundImage: `url(${background2})`}}>
                    <h3>CUNY 2021 FALL Breaks</h3>
                    <Container>
                        <Row>
                            <Col>🎉11/25/2021-11/28/2021</Col>
                            <Col>Thursday-Sunday</Col>
                            <Col xs={7}>College Closed–No classes scheduled</Col>
                        </Row>
                        <Row>
                            <Col>🎉12/24/2021-12/25/2021</Col>
                            <Col>Friday-Saturday</Col>
                            <Col xs={7}>College Closed–No classes scheduled</Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}
export default LandingPage;
