import React, {useState, useEffect, useRef} from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from 'recharts';
import {Button, Card, Form, Alert, Container} from "react-bootstrap"
import './Profile.css'
import picture from './../../assets/profile/default_profile_pic.jpg'
import Fire from '../../firebase'
import firebase from 'firebase/app';
import {useAuth} from '../../context/AuthContext'
import { Link, useHistory } from "react-router-dom"
import "./../../assets/fonts/font.css"
import Course from '../Course/Course'

export const db = Fire.db;
export const closeModal = (modalId) => {
    let modal = document.getElementById(modalId);
    modal.style.display = "none" 
}

export const openModal = (modalId) => {
    let modal = document.getElementById(modalId);
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

export const updateModal = (task, titleId, descId, dateId) => {
    //let title = document.getElementById(titleId)
    //let desc = document.getElementById(descId)
    //let date = document.getElementById(dateId)

    titleId.innerHTML = task.Title
    descId.innerHTML = task.Description
    dateId.innerHTML = "Deadline: " + task.Date

    openModal("modal")
}

export const updateCoursesModal = (course, courseTitleID, courseNumID) => {
    courseTitleID.innerHTML = course.Course_Name
    courseNumID.innerHTML = course.Course_id
    openModal("course-modal")
}
    
export const showTasks = (tasks) => {
    let arr = getTasksByHighestPriority(tasks)
    let title = document.getElementById("modal-title")
    let desc = document.getElementById("modal-description")
    let date = document.getElementById("modal-date")
    let jsx = []
    for (let i = 0; i < arr.length; i++) {
        jsx.push(
            <tr key = {"tr"+i}>
                <td> <button key = {"btn"+i} value = {i} className = 'task-btn' 
                onClick = { () => updateModal(arr[i], title, desc, date)} > {arr[i].Title} </button> </td>
                <td> <div key = {"div"+i} className = {evaluatePriority(arr[i].Priority)}> </div> </td>
            </tr> )
    }
    return (<tbody>{jsx}</tbody>)
}

export const printCoursesTable = (courseName) => {
    let courselength = courseName
    let courseTitle = document.getElementById("course-modal-title")
    let courseID = document.getElementById("course-modal-ID") 
    let list = []
    for (let z = 0; z < courselength.length; z++){
        list.push(
            <tr key = {"tr"+z}>
            <td> <button key = {"btn"+z} value = {z} className = 'courses-btn' 
            onClick = { () => updateCoursesModal(courselength[z], courseTitle, courseID)} > {courselength[z].Course_Name} - {courselength[z].Course_Name} </button> </td>
            </tr> )
    }
    return (<tbody>{list}</tbody>)
}

export const getTasksByHighestPriority = (tasks) => {
    let arr = []
    for (let i = 0; i < tasks.length; i++) arr.push(tasks[i])
    return arr.sort( (a, b) => {
        return b.Priority - a.Priority
    })
}

export default function Profile() {
    /* No need to test the initialization, useStates are empty to begin with */ 
    /* istanbul ignore next */
    const [error, setError] = useState("") /* istanbul ignore next */
    const [name, setName] = React.useState(""); /* istanbul ignore next */
    const [major, setMajor] = React.useState(""); /* istanbul ignore next */
    const [semester, setSemester] = React.useState(""); /* istanbul ignore next */
    const [courseName, setCourseName] = useState(""); /* istanbul ignore next */
    const {currentUser, logout} = useAuth(); /* istanbul ignore next */
    const [tasks, setTasks] = useState([]) /* istanbul ignore next */
    const history = useHistory();

    //consts here are for submission form to add courses to current users' document in Course collection.
    /* istanbul ignore next */
    const [loading, setLoading] = useState(false) /* istanbul ignore next */
    const courseNameRef = useRef(); /* istanbul ignore next */
    const courseIDRef = useRef(); /* istanbul ignore next */
    const examGRef = useRef(); /* istanbul ignore next */
    const homeworkGRef = useRef(); /* istanbul ignore next */
    const projectGRef = useRef(); /* istanbul ignore next */

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

    /* istanbul ignore next */
    const getData = async() =>{
        await db.getCollection("Course").get().then(snapshot => {
            const tempcourseName= [];
            snapshot.forEach(doc => {
                const data = doc.data();
                if (currentUser.email === doc.id){
                    let x =0;
                    for(x = 0; x < data.ListofCourses.length; x++){
                        tempcourseName.push(data.ListofCourses[x]);
                    }
                    
                }

            })
            setCourseName(tempcourseName);
        }).catch(error => console.log(error))
        }
        
    useEffect(() =>{
        getData()
    },[])

    
    // function printTable(){
    //     try{
    //     let courselength = courseName.length;
            
    //     const list = []
    //     let x;
    //     for(x = 0; x < courselength; x++){
    //         list.push(<li>{courseName[x].Course_id} - {courseName[x].Course_Name} </li>);
    //         //<Course key = {x} name = {courseName[x].Course_Name} data={"hello"} id = {courseName[x].Course_id}> </Course>
            
    //     }

    //     return(
    //         <div>
    //             {list}
    //             {/* <Course key = {x} name = {courseName[x].Course_Name} data={"hello"} id = {courseName[x].Course_id}> </Course> */}
    //         </div>
    //     )
    //     }catch(error){
    //         console.log(error)
    //     }
    // }

    function refreshPage() {
        window.location.reload(false);
    }

    /* istanbul ignore next */
    async function handleSubmit(e){
        e.preventDefault()
        try {
            setError('')
            setLoading(true)

            db.getCollection('Course').doc(currentUser.email).update({
                ListofCourses: firebase.firestore.FieldValue.arrayUnion(
                    {   
                        Course_Name: courseNameRef.current.value,
                        Course_id: courseIDRef.current.value,
                        Exams: examGRef.current.value,
                        Homeworks: homeworkGRef.current.value,
                        Projects: projectGRef.current.value
                        }
                    )
                }).then(function() {// went through
                    console.log("Document successfully written!");
                    refreshPage()
                })
                .catch(function(error) { //broke down somewhere
                    console.error("Error writing document: ", error);
                });
            history.push('/Profile')
        } catch{
            setError('Failed to add course')
        }
        setLoading(false)
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
                                    <Button onClick={handleLogout} className="btn-primary btn-outline-light">
                                        Log Out
                                    </Button>
                                </div>:
                                <div/>
                                }
                            </div>
                        </div>
                </div>
                
                
                <div id = 'courses-table' className='child'>
                    <thead>
                        <tr>
                            <th><h5>Courses</h5></th>
                        </tr>
                    </thead>
                    {printCoursesTable(courseName)}
                    <button onClick={ () => openModal("add-course-modal") }>Add a course</button>
                </div>
            </div>
            
            <div className = 'parent'>
                <table id = 'tasks-table' className='child'>
                    <thead>
                        <tr>
                            <th><h5>Upcoming Tasks</h5></th>
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
                    <span onClick = { () => closeModal("modal") } id='modal-close' className="close">&times;</span>
                    <b><span id = 'modal-title'> </span></b> <br/>
                    <b> <span id = 'modal-date'> </span></b>
                    <p id = 'modal-description'> </p> <br/> 
                    <a href='/Courses'> Go to Course</a>
                </div>
            </div>
        </div>

        <div id = 'courses-container'>
            <div id = 'course-modal' className = 'modal'> 
                <div id = 'modal-content'>
                    <span onClick = { () => closeModal("course-modal") } id='modal-close' className="close">&times;</span>
                    <b><span id = 'course-modal-ID'> </span> - <span id = 'course-modal-title'> </span></b> <br/>
                    {/* I think I should add grades somewhere around here
                    I also have to handle the issue of allowing user to delete courses and tasks here. Not sure how to do that yet*/}
                    <h5>Tasks</h5>
                    {/* <b> <span id = 'course-modal-ID'> </span></b> Add Tasks that are part of this course below
                    <p id = 'modal-description'> </p> <br/> */}
                </div>
            </div>
        </div>
        
        <div id = 'add-course-container' className ='child'>
            <div id = "add-course-modal" className='modal'>
                <div id = 'modal-content'>
                <span onClick = { () => closeModal("add-course-modal") } id='modal-close' className="close">&times;</span>
                    <Card>
                        <Card.Body>
                            <h2 className = "text-center mb-4">Add Course</h2>
                            {error && <Alert variant ="danger">{error}</Alert>}
                            <form onSubmit = {handleSubmit}>
                            <Form.Group id = "courseName">
                                <Form.Label>Course Name</Form.Label>
                                <Form.Control type = "text" ref={courseNameRef} required/>                 
                            </Form.Group>
                            <Form.Group id = "courseID">
                                <Form.Label>Course ID</Form.Label>
                                <Form.Control type = "text" ref={courseIDRef} required/>                 
                            </Form.Group>
                            <Form.Group id = "examsGrade">
                                <Form.Label>Exams Grade</Form.Label>
                                <Form.Control type = "number" ref={examGRef} required/>                 
                            </Form.Group>
                            <Form.Group id = "homeworksGrade">
                                <Form.Label>Homeworks Grade</Form.Label>
                                <Form.Control type = "number" ref={homeworkGRef} required/>                 
                            </Form.Group>
                            <Form.Group id = "projectsGrade">
                                <Form.Label>Projects Grade</Form.Label>
                                <Form.Control type = "number" ref={projectGRef} required/>                 
                            </Form.Group>
                        <Button data-testid="btn-test" disabled = {loading} className = "button-test w-100" type = "submit" >
                            Add Course
                        </Button>
                    </form>
                </Card.Body>
            </Card>
        </div> 
        </div>
    </div>

    </div>)
}
