import React, {Component} from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from 'recharts';
import './Profile.css'
import picture from './../../assets/profile/default_profile_pic.jpg'

export const closeModal = () => {
    let modal = document.getElementById("modal");
    modal.style.display = "none" 
}

export const openModal = () => {
    let modal = document.getElementById("modal");
    modal.style.display = 'block'
}

export let username = "Student" // need to get from database
export let major = "Computer Science" // need to get from database
export let semester = "Fall 2021"// need to get from database
export const TASKS = 3; // change later to # of tasks we want to show up in table

class Profile extends Component{
    render(){
        /*
        let createTasks = () => {
            let table = document.getElementById('table-table');
            let row = document.createElement('tr');
            for (let i = 0; i < TASKS; i++) table.appendChild(row);
        }*/

        // takes in an id of an element and toggles its visiblity depending on its current display style
        let toggle = (elemId) => {
            let elem = document.getElementById(elemId)
            let style = window.getComputedStyle(elem);
            let display = style.getPropertyValue('display');
            elem.style.display = display === 'none' ? 'block' : 'none';

            let btn = document.getElementById('course-btn');
            btn.innerHTML = display === 'none' ? "Hide Courses" : "Show Courses";
        }

        const data = [
            { name: 'Sept', 'Task Completed': 7, 'Task Todo': 0 }, //Template data table for graph.
            { name: 'Oct', 'Task Completed': 5, 'Task Todo': 3 },  //Waiting on making table on firebase to see what 
            { name: 'Nov', 'Task Completed': 2, 'Task Todo': 8 },  //fields the Courses table. Should have it done
            { name: 'Dec', 'Task Completed': 0, 'Task Todo': 10 }, //upon next meeting.
        ];
        
        return(
            <div>
                <div id = 'student-info'>
                    <img className='profile-pic'src = {picture} alt='pfp'/> <br/>
                    <span id = 'username'>Welcome, {username}</span>
                    <span> Major: {major} </span> <br/>
                    <span> Current Semester: {semester} </span> 
                </div>
                <br/> <br/>
                <button id='course-btn' onClick={ () => toggle('course-container') }>Show Courses</button>
                <div id = 'bar-graph-container'>
                    <BarChart id='bar-graph' width={500} height={500} data={data} >
                        <CartesianGrid />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Bar dataKey="Task Completed" stackId="a" fill="#8884d8" />
                        <Bar dataKey="Task Todo" stackId="a" fill="#82ca9d" />
                        <Tooltip />
                        <Legend />
                    </BarChart> 
                </div>
                <div id = 'course-container'>
                    <table>
                        <tbody>
                            <tr><td><a href = '/Courses'>CSC44800 - Artificial Intelligence</a></td></tr>
                            <tr><td><a href = '/Courses'>CSC30100 - Numerical Issues in Scientific Programming</a></td></tr>
                            <tr><td><a href = '/Courses'>CSC30400 - Introduction to Theoretical Computer Science</a></td></tr>
                            <tr><td><a href = '/Courses'>Chem10301 - General Chemistry 1</a></td></tr>
                        </tbody>
                    </table>
                </div>
                <br/><br/><br/>

                <table id = 'tasks-table'>
                    <thead>
                        <tr>
                            <th>Tasks</th>
                        </tr>
                    </thead>
                    <tbody>
                            <tr>
                            <td><button onClick={ () => openModal() } id='sample-task'> Chem10301 Lab 4 </button></td>
                            <td><div className = 'priorityHigh'> </div></td>
                        </tr>
                        <tr> 
                            <td><button id='sample-task'> CSC44800 Midterm </button></td>
                            <td><div className = 'priorityMid'> </div></td>
                        </tr>
                        <tr>
                            <td><button id='sample-task'> CSC30100 Midterm </button></td>
                            <td><div className = 'priorityLow'> </div></td>
                        </tr>
                    </tbody>
                </table>
                
                <div id = 'tasks-container'>
                    <div id = 'modal' className='modal'>
                        <div id = 'modal-content'>
                            <span onClick = { () => closeModal() } id='modal-close' className="close">&times;</span>
                            <b><span> Chem10301 Lab 4</span></b>
                            <b> <span> Due 11/15</span></b>
                            <p> Write a special simple command interpreter that takes a command and its
                            arguments. This interpreter is a program where the main process creates a child
                            process to execute the command using exec() family functions. </p>
                            <br/> <br/>
                            <a href='/Courses'> Go to Course</a>
                        </div>
                    </div>
                </div>
            </div>  
        )
    }
}


export default Profile;