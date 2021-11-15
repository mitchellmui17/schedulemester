import React, {useState} from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from 'recharts';
import {Button} from "react-bootstrap"
import './Profile.css'
import picture from './../../assets/profile/default_profile_pic.jpg'
import Fire from '../../firebase'
import {useAuth} from '../../context/AuthContext'
import { Link, useHistory } from "react-router-dom"

export const db = Fire.db;
export const closeModal = () => {
    let modal = document.getElementById("modal");
    modal.style.display = "none" 
}

export const openModal = () => {
    let modal = document.getElementById("modal");
    modal.style.display = 'block'
}

export const DATA = [
    { name: 'Sept', 'Task Completed': 7, 'Task Todo': 0 }, //Template data table for graph.
    { name: 'Oct', 'Task Completed': 5, 'Task Todo': 3 },  //Waiting on making table on firebase to see what 
    { name: 'Nov', 'Task Completed': 2, 'Task Todo': 8 },  //fields the Courses table. Should have it done
    { name: 'Dec', 'Task Completed': 0, 'Task Todo': 10 }, //upon next meeting.
];
export const TASKS = 3; // change later to # of tasks we want to show up in table
    
export default function Profile() {
    const [error, setError] = useState("")
    const [name, setName] = React.useState("");
    const [major, setMajor] = React.useState("");
    const [semester, setSemester] = React.useState("");
    const {currentUser, logout} = useAuth();
    const history = useHistory()

    db.getCollection('Users').doc(currentUser.email).get().then((doc) => {
            if(doc.exists) {
                setName(doc.data().name);
                setMajor(doc.data().major);
                setSemester(doc.data().semester);
            }
            else {
                return;
            }
    });

    async function handleLogout() {
        setError("")
    
        try {
          await logout()
          history.push("/Login")
        } catch {
          setError("Failed to log out")
        }
      }
    
    /*
    let createTasks = () => {
        let table = document.getElementById('table-table');
        let row = document.createElement('tr');
        for (let i = 0; i < TASKS; i++) table.appendChild(row);
    }*/


    return( 
        <div className="profile-page">
            <div className="main main-raised">
                <div className="profile-content">
                        <div className="profile">
                            <img src={picture} id = 'pic' className="rounded-circle"/>
                            <div className="description">
                                <h3 id="name">{name}</h3>
                                <h5>Major: {major}</h5>
                                <h5>Semester: {semester}</h5>
                                {console.log(currentUser.email)}
                                {currentUser !== null?
                                <div> 
                                    <Button onClick={handleLogout} className="btn-primary">
                                        Log Out
                                    </Button>
                                </div>:
                                <div/>
                                }
                            </div>
                        </div>
                </div>

                <div id = 'course-container'>
                    <table>
                        <thead>
                            <tr>
                                <th><h5>Courses</h5></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td><a href = '/Courses'>CSC44800 - Artificial Intelligence</a></td></tr>
                            <tr><td><a href = '/Courses'>CSC30100 - Numerical Issues in Scientific Programming</a></td></tr>
                            <tr><td><a href = '/Courses'>CSC30400 - Introduction to Theoretical Computer Science</a></td></tr>
                            <tr><td><a href = '/Courses'>Chem10301 - General Chemistry 1</a></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className = 'parent'>
                <table id = 'tasks-table' className='child'>
                    <thead>
                        <tr>
                            <th><h5>Tasks</h5></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><button onClick={ () => openModal() } className='task-btn'> Chem10301 Lab 4 </button></td>
                            <td><div className = 'priorityHigh'> </div></td>
                        </tr>
                        <tr> 
                            <td><button className='task-btn'> CSC44800 Midterm </button></td>
                            <td><div className = 'priorityMid'> </div></td>
                        </tr>
                        <tr>
                            <td><button className='task-btn'> CSC30100 Midterm </button></td>
                            <td><div className = 'priorityLow'> </div></td>
                        </tr>
                    </tbody>
                </table>


                {/* BAR GRAPH HERE */}
                <table id = 'bar-table'>
                    <thead>
                        <tr>
                            <th><h5>Tasks Progress</h5></th>
                        </tr>
                    </thead>
                    <tbody>
                        <BarChart id='bar-graph' className = 'child' width={500} height={500} data={DATA} >
                        <CartesianGrid />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Bar dataKey="Task Completed" stackId="a" fill="#8884d8" />
                        <Bar dataKey="Task Todo" stackId="a" fill="#82ca9d" />
                        <Tooltip />
                        <Legend />
                        </BarChart> 
                    </tbody>
                </table>
            </div>
        
        <div id = 'tasks-container' className='child'>
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
    </div>)
}
