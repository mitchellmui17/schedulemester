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

export const db = Fire.db;
export const closeModal = () => {
    let modal = document.getElementById("modal");
    modal.style.display = "none" 
}

export const openModal = () => {
    let modal = document.getElementById("modal");
    modal.style.display = 'block'
}

export const closeCourseModal = () => {
    let modal = document.getElementById("add-course-modal");
    modal.style.display = "none" 
}

export const openCourseModal = () => {
    let modal = document.getElementById("add-course-modal");
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

    /* No need to test the initialization, useStates are empty to begin with */ 
    /* istanbul ignore next */
    const [error, setError] = useState("") /* istanbul ignore next */
    const [name, setName] = React.useState(""); /* istanbul ignore next */
    const [major, setMajor] = React.useState(""); /* istanbul ignore next */
    const [semester, setSemester] = React.useState(""); /* istanbul ignore next */
    const [courseName, setCourseName] = useState(""); /* istanbul ignore next */
    const {currentUser, logout} = useAuth(); /* istanbul ignore next */
    const history = useHistory();

    /* istanbul ignore next */
    //consts here are for submission form to add courses to current users' document in Course collection.
    const [loading, setLoading] = useState(false)
    const courseNameRef = useRef();
    const courseIDRef = useRef();
    const examGRef = useRef();
    const homeworkGRef = useRef();
    const projectGRef = useRef();
    const courseList = [];

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
    async function handleLogout() {
        setError("")
        try {
            await logout()
            history.push("/Login")
        } catch {
            setError("Failed to log out")
        }
    }


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
        
    function pushContent(){
        courseList.push(courseNameRef)
        courseList.push(courseIDRef)
        courseList.push(examGRef)
        courseList.push(homeworkGRef)
        courseList.push(projectGRef)
    }
    
    useEffect(() =>{
        getData()
    },[])


    function printTable(){
        try{
        let courselength = courseName.length;
            
        const list = []
        let x;
        for(x = 0; x < courselength; x++){
            list.push(<li>{courseName[x].Course_id} - {courseName[x].Course_Name} </li>)
        }

        return(
            <div>
                {list}
            </div>
        )
        }catch(error){
            console.log(error)
        }
    }

    function refreshPage() {
        window.location.reload(false);
    }

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

                <div id = 'course-container'>
                    <table>
                        <thead>
                            <tr>
                                <th><h5>Courses</h5></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td><a href = '/Courses'>{printTable()}</a></td></tr>
                        </tbody>
                    </table>
                    <button onClick={ () => openCourseModal() }>Add a course</button>

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
                    <b><span> CSC33200 Lab 4</span></b>
                    <b> <span> Due 11/15</span></b>
                    <p> Write a special simple command interpreter that takes a command and its
                    arguments. This interpreter is a program where the main process creates a child
                    process to execute the command using exec() family functions. </p>
                    <br/> <br/>
                    <a href='/Courses'> Go to Course</a>
                </div>
            </div>
        </div>
        
        <div id = 'add-course-container' className ='child'>
            <div id = "add-course-modal" className='modal'>
                <div id = 'modal-content'>
                <span onClick = { () => closeCourseModal() } id='modal-close' className="close">&times;</span>
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