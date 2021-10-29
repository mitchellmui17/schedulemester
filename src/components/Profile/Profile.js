import React, {Component} from "react";
import './Profile.css'
import picture from './../../assets/profile/default_profile_pic.jpg'

class Profile extends Component{
    render(){
        let username = "Student" // need to get from database
        let major = "Computer Science" // need to get from database
        let semester = "Fall 2021"// need to get from database

        // takes in an id of an element and toggles its visiblity depending on its current display style
        let toggle = (elemId) => {
            let elem = document.getElementById(elemId)
            let isVisible = elem.style.display;
            elem.style.display = isVisible === 'none' ? 'block' : 'none';
        }
        
        return(
            <div>
                <div id = 'student-info'>
                    <img className='profile-pic'src = {picture} alt='pfp'/> <br/>
                    <span id = 'username'>Welcome, {username}</span>
                    <span> Major: {major} </span> <br/>
                    <span> Current Semester: {semester} </span> 
                </div>
                <button id='course-btn' onClick={ () => toggle('course-container') }>Show Courses</button> 
                <div id = 'course-container'>
                    EXAMPLE
                </div>
            </div>
        )
    }
}


export default Profile;