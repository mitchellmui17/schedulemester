import React, {useState, useEffect} from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from 'recharts';
import {Button} from "react-bootstrap"
import './Profile.css'
import picture from './../../assets/profile/default_profile_pic.jpg'
import Fire from '../../firebase'
import {useAuth} from '../../context/AuthContext'
import { Link, useHistory } from "react-router-dom"
import "./../../assets/fonts/font.css"

export const db = Fire.db;
export const closeModal = () => {
    let modal = document.getElementById("modal");
    modal.style.display = "none" 
}

export const openModal = () => {
    let modal = document.getElementById("modal");
    modal.style.display = 'block'
}

// 0 = priorityLow
// 1 = priorityMid
// 2 = priorityHigh
export const evaluatePriority = (priority) => {
    if (priority === 0) return "priorityLow"
    else if (priority === 1) return "priorityMid"
    else return "priorityHigh"        
}

export const DATA = [
    { name: 'Sept', 'Task Completed': 7, 'Task Todo': 0 }, //Template data table for graph.
    { name: 'Oct', 'Task Completed': 5, 'Task Todo': 3 },  //Waiting on making table on firebase to see what 
    { name: 'Nov', 'Task Completed': 2, 'Task Todo': 8 },  //fields the Courses table. Should have it done
    { name: 'Dec', 'Task Completed': 0, 'Task Todo': 10 }, //upon next meeting.
];

export const updateModal = (task) => {
    let title = document.getElementById('modal-title')
    let desc = document.getElementById('modal-description')
    let date = document.getElementById('modal-date')

    title.innerHTML = task.Title
    desc.innerHTML = task.Description
    date.innerHTML = "Deadline: " + task.Date

    openModal()
}
    
export const showTasks = (tasks) => {
    let jsx = []
    for (let i = 0; i < tasks.length; i++) {
        jsx.push(
            <tr>
                <td> <button value = {i} className = 'task-btn' onClick = { () => updateModal(tasks[i])} > {tasks[i].Title} </button> </td>
                <td> <div className = {evaluatePriority(tasks[i].Priority)}> </div> </td>
            </tr> )
    }
    return (<tbody>{jsx}</tbody>)
}


export default function Profile() {

    /* No need to test the initialization, useStates are empty to begin with */ 
    /* istanbul ignore next */
    const [error, setError] = useState("") /* istanbul ignore next */
    const [name, setName] = React.useState(""); /* istanbul ignore next */
    const [major, setMajor] = React.useState(""); /* istanbul ignore next */
    const [semester, setSemester] = React.useState(""); /* istanbul ignore next */
    const {currentUser, logout} = useAuth(); /* istanbul ignore next */
    const [tasks, setTasks] = useState([]) /* istanbul ignore next */
    const history = useHistory();

    /* istanbul ignore next */ 
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
    
    /* istanbul ignore next */
    const getTasks = async () => {
        await db.getCollection('Tasks').doc(currentUser.email).get().then((d) => {
            if (d.exists)  setTasks(d.data().Tasks)           
        })
    }

    /* istanbul ignore next */
    useEffect(() => {
        getTasks()
    }, [])

    /*
    function showTasks() {
        let jsx = []
        for (let i = 0; i < tasks.length; i++ ) {
            jsx.push(
                <tr>
                    <td> <button value = {i} className = 'task-btn' onClick = { () => updateModal(tasks[i])} > {tasks[i].Title} </button> </td>
                    <td> <div className = {evaluatePriority(tasks[i].Priority)}> </div> </td>
                </tr> )
        }
        return (<tbody>{jsx}</tbody>)
    } */


    /* istanbul ignore next */
    async function handleLogout() {
        setError("")
        try {
            await logout()
            history.push("/Login")
        } catch {
            setError("Failed to log out")
        }
    }
    
    return( 
        <div className="profile-page font-style-Alice">
            <div className="main main-raised">
                <div className="profile-content">
                        <div className="profile">
                            <img src={picture} id = 'pic' className="rounded-circle"/>
                            <div className="description">
                                <h3 id="name">{name}</h3>
                                <h5>Major: {major}</h5>
                                <h5>Semester: {semester}</h5>
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
                    {showTasks(tasks)}
                </table>

                {/* BAR GRAPH HERE */}
                <table id = 'bar-table'>
                    <thead>
                        <tr>
                            <th><h5>Tasks Progress</h5></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <BarChart id='bar-graph' className = 'child' width={500} height={500} data={DATA} >
                                    <CartesianGrid />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Bar dataKey="Task Completed" stackId="a" fill="#8884d8" />
                                    <Bar dataKey="Task Todo" stackId="a" fill="#82ca9d" />
                                    <Tooltip />
                                    <Legend />
                                </BarChart> 
                            </td>
                        </tr> 
                    </tbody>
                </table>
            </div>
        
        <div id = 'tasks-container' className='child'>
            <div id = 'modal' className='modal'>
                <div id = 'modal-content'>
                    <span onClick = { () => closeModal() } id='modal-close' className="close">&times;</span>
                    <b><span id = 'modal-title'> </span></b> <br/>
                    <b> <span id = 'modal-date'> </span></b>
                    <p id = 'modal-description'> </p> <br/> 
                    <a href='/Courses'> Go to Course</a>
                </div>
            </div>
        </div>
    </div>)
}
