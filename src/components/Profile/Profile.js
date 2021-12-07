import React, {useState, useEffect, useRef} from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from 'recharts';
import {Button, Card, Form, Alert} from "react-bootstrap"
import './Profile.css'
import Fire from '../../firebase'
import firebase from 'firebase/app';
import {useAuth} from '../../context/AuthContext'
import { useHistory } from "react-router-dom"
import "./../../assets/fonts/font.css"
import background from "../../assets/images/wallhaven-0prd9n.jpg"


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

export const updateModal = (task, elems) => {
    elems[0].innerHTML = task.Title + " (" + task.Course + ")"
    elems[1].innerHTML = task.Description
    elems[2].innerHTML = "Deadline: " + task.Date
    openModal("modal")
}

export const updateCoursesModal = (tasks, course, courseTitleID, courseNumID, elems) => {
    courseTitleID.innerHTML = course.Course_Name
    courseNumID.innerHTML = course.Course_id
    showTasksByCourse(tasks, course.Course_id, elems)
    openModal("course-modal")
}

export const getIndexOfTask = (tasks, task) => {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].Title === task.Title && tasks[i].Description === task.Description && tasks[i].Course === task.Course) {
            return i
        }
    }
}
    
// onclick function for marking a task as complete. takes in the email to search for it in db 
/* istanbul ignore next */
const markTaskAsComplete = (email, task) => {    
    db.getCollection('Tasks').doc(email).get().then((d) => {
        if (d.exists) {
            let tasks = d.data().Tasks
            let idx = getIndexOfTask(tasks, task)
            let data = {
                Title: task.Title,
                Description: task.Description, 
                Course: task.Course,
                Date: task.Date,
                isComplete: true,
                Priority: task.Priority
            }
            tasks[idx] = data
            if (window.confirm("Are you sure that you want to mark this task as completed?")) {
                d.ref.update({Tasks: tasks})
                setTimeout(() => {window.location.reload(false)},500);
            }
        }                               
    }) 
}

/* istanbul ignore next */
const deleteTask = (email, task) => {
    db.getCollection('Tasks').doc(email).get().then((d) => {
        if (d.exists) {
            let tasks = d.data().Tasks
            let idx = getIndexOfTask(tasks, task)
            tasks.splice(idx, 1) // remove the index of where the desired task to delete is from the data array
            if (window.confirm("Are you sure that you want to delete this task? This cannot be reversed!")) {
                d.ref.update({Tasks: tasks})
                setTimeout(() => {window.location.reload(false)},500);
            }
        }
    })
}

export const showTasks = (tasks, email) => {
    let arr = getTasksByHighestPriority(tasks)
    if(arr != undefined){
        let elems = [document.getElementById("modal-title"), document.getElementById("modal-description"), document.getElementById("modal-date")]
        let jsx = []
        for (let i = 0; i < arr.length; i++) {
            jsx.push(
                <tr key = {"tr"+i}>
                    <td> <button key = {"btn"+i} value = {i} className = 'task-btn' 
                    onClick = { () => updateModal(arr[i], elems)}> {arr[i].Title }<br/>({arr[i].Course}) </button> </td>
                    <td> <div key = {"div"+i} className = {evaluatePriority(arr[i].Priority)}> </div> </td>
                    <td><button className='task-btn' onClick = {() => markTaskAsComplete(email, arr[i])} id='complete-task'>Complete</button> <br/> 
                    <button className='task-btn' onClick = {() => deleteTask(email, arr[i])} id='remove-task'>Delete</button></td>
                </tr> )
        }
        return (<tbody>{jsx}</tbody>)
    }
    return
}

export const printCoursesTable = (tasks, courseName) => {
    let courselength = courseName
    let courseTitle = document.getElementById("course-modal-title")
    let courseID = document.getElementById("course-modal-ID") 
    let elems = [document.getElementById("modal-title"), document.getElementById("modal-description"),
    document.getElementById("modal-date"), document.getElementById("course-tasks")]
    let list = []
    for (let z = 0; z < courselength.length; z++){
        list.push(
            <tr key = {"tr"+z}>
            <td> <button key = {"btn"+z} value = {z} className = 'courses-btn' 
            onClick = { () => updateCoursesModal(tasks, courselength[z], courseTitle, courseID, elems)} > {courselength[z].Course_id} - {courselength[z].Course_Name} </button> </td>
            </tr> )
    }
    return (<tbody>{list}</tbody>)
}

export const getTasksByHighestPriority = (tasks) => {
    let arr = []
    if(tasks != undefined){
        for (let i = 0; i < tasks.length; i++) arr.push(tasks[i])
        return arr.sort( (a, b) => {
            return b.Priority - a.Priority
        })
    }
    return
}

export const getTasksByCourse = (tasks, course) => {
    let arr = getTasksByHighestPriority(tasks)
    let idx = 0
    let courseArr = []
    for (let i = 0; i < tasks.length; i++) 
        if (arr[i].Course === course)  courseArr[idx++] = arr[i]
    return courseArr
}

export const getUncompletedTasks = (tasks) => {
    let arr = []
    if(tasks != undefined){
    for (let i = 0; i < tasks.length; i++) 
        if (!tasks[i].isComplete) arr.push(tasks[i])
    return arr
    }
}

export const getCompletedTasks = (tasks) => {
    let arr = []
    if(tasks != undefined){
    for (let i = 0; i < tasks.length; i++) 
        if (tasks[i].isComplete) arr.push(tasks[i])
    return arr
    }
}

export const uncompletedTasksData = (tasks) => {
    if(tasks != undefined){
    let arr = getUncompletedTasks(tasks);
    var shortMonthName = new Intl.DateTimeFormat("en-US", { month: "short" }).format;

    let unComformatMonths = []
    for (let z = 0; z < arr.length; z++)
    {
        unComformatMonths.push(new Date(arr[z].Date));
    }
    //console.log(unformatMonths)

    var uncomTasksData = [];
    for (let i = 0; i < unComformatMonths.length; i++){
        uncomTasksData.push(shortMonthName(unComformatMonths[i]))
    }
    console.log(uncomTasksData)
    return uncomTasksData;   
}
}

export const completedTasksData = (tasks) => {
    if(tasks != undefined){
    let arr2 = getCompletedTasks(tasks);
    var shortMonthName = new Intl.DateTimeFormat("en-US", { month: "short" }).format;

    let unformatMonths = []
    for (let z = 0; z < arr2.length; z++)
    {
        unformatMonths.push(new Date(arr2[z].Date));
    }
    //console.log(unformatMonths)

    var comTasksData = [];
    for (let i = 0; i < unformatMonths.length; i++){
        comTasksData.push(shortMonthName(unformatMonths[i]))
    }
    console.log(comTasksData)
    return comTasksData;
}
}

export const graphDATA = (tasks) => {
    if(tasks != undefined){
    let uTasksData = uncompletedTasksData(tasks);
    let cTasksData = completedTasksData(tasks);
    let chartdata = [
        { name: 'Jan', 'Task Completed': cTasksData.filter(x => x === "Jan").length, 'Task Todo': uTasksData.filter(x => x === "Jan").length },
        { name: 'Feb', 'Task Completed': cTasksData.filter(x => x === "Feb").length, 'Task Todo': uTasksData.filter(x => x === "Feb").length },
        { name: 'Mar', 'Task Completed': cTasksData.filter(x => x === "Mar").length, 'Task Todo': uTasksData.filter(x => x === "Mar").length },
        { name: 'Apr', 'Task Completed': cTasksData.filter(x => x === "Apr").length, 'Task Todo': uTasksData.filter(x => x === "Apr").length },
        { name: 'May', 'Task Completed': cTasksData.filter(x => x === "May").length, 'Task Todo': uTasksData.filter(x => x === "May").length },
        { name: 'Jun', 'Task Completed': cTasksData.filter(x => x === "Jun").length, 'Task Todo': uTasksData.filter(x => x === "Jun").length },
        { name: 'Jul', 'Task Completed': cTasksData.filter(x => x === "Jul").length, 'Task Todo': uTasksData.filter(x => x === "Jul").length },
        { name: 'Aug', 'Task Completed': cTasksData.filter(x => x === "Aug").length, 'Task Todo': uTasksData.filter(x => x === "Aug").length },
        { name: 'Sept', 'Task Completed': cTasksData.filter(x => x === "Sept").length, 'Task Todo': uTasksData.filter(x => x === "Sept").length },
        { name: 'Oct', 'Task Completed': cTasksData.filter(x => x === "Oct").length, 'Task Todo': uTasksData.filter(x => x === "Oct").length },  
        { name: 'Nov', 'Task Completed': cTasksData.filter(x => x === "Nov").length, 'Task Todo': uTasksData.filter(x => x === "Nov").length },  
        { name: 'Dec', 'Task Completed': cTasksData.filter(x => x === "Dec").length, 'Task Todo': uTasksData.filter(x => x === "Dec").length }, 
    ]
    console.log(chartdata)
    return chartdata
}
}

// elems is an array of the elements: title, desc, date, and tbody
// need this parameter for unit testing
export const showTasksByCourse = (tasks, currentCourse, elems) => {
    let arr = getTasksByCourse(tasks, currentCourse)
    elems[3].innerHTML = ''
    console.log(arr.length)

    arr.forEach(task => {
        let row = createTaskRow(task, createTaskButton(task, elems))
        elems[3].appendChild(row)
    })
}

export const createTaskRow = (task, taskBtn) => {
    let row = document.createElement('tr')
    let div = document.createElement('div')
    let td1 = document.createElement('td')
    let td2 = document.createElement('td')
    td1.appendChild(taskBtn)
    td2.appendChild(div)
    row.appendChild(td1)
    row.appendChild(td2)
    div.className = evaluatePriority(task.Priority)
    return row
}

export const createTaskButton = (task, elems) => {
    let btn = document.createElement('button')
    btn.className = "task-btn"
    btn.innerHTML = task.Title
    btn.addEventListener('click', () => updateModal(task, elems))
    return btn
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
    const history = useHistory(); /* istanbul ignore next */
    const {updateProfilePicture } = useAuth(); /* istanbul ignore next */ 
    const [profilePicture, setProfilePicture] = useState(null); /* istanbul ignore next */
    const [file, setFile] = useState(null); /* istanbul ignore next */
    const [ success, setSuccess] = useState("");

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
        
    /* istanbul ignore next */
    useEffect(() =>{
        getData()
    },[])

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
                    window.location.reload(false);
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


    /* istanbul ignore next */
    const handleChange = e => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
            setProfilePicture(URL.createObjectURL(e.target.files[0]));
        }
    }

    /* istanbul ignore next */
    const handleUpload = () => {
        console.log(file);
        if (file === null) {
            setError("No file selected");
        } else {
            firebase.storage().ref('users/' + currentUser.uid + '/profile.jpg').put(file).then(function () {
                console.log('successfully uploaded to firebase');
                updateProfilePicture('users/' + currentUser.uid + '/profile.jpg');
                setError("");
            })
        }
    }

    /* istanbul ignore next */
    useEffect(() => {
        //load avatar from storage
        if (currentUser.photoURL) {
            firebase.storage().ref('users/' + currentUser.uid + '/profile.jpg').getDownloadURL().then(url => {
                setProfilePicture(url);
            })
        } else {
            return;
        }


    }, [currentUser.photoURL, currentUser.uid]) // loadProfilePicture


    return(
        <div className="profile-page font-style-Alice backgroundsize" style = {{backgroundImage: `url(${background})`}}>
            <div className="main main-raised">
                <div className="profile-content">
                        <div className="profile">
                        <img
                                    id="output"
                                    src={profilePicture || "https://icon-library.com/images/cool-anime-icon/cool-anime-icon-9.jpg"}
                                    className="rounded-circle"
                                    width="200px"
                                    height="150px"
                                    alt="profilePic"
                                />
            
                            <div className="description">
                                <h3 id="name">{name}</h3>
                                <h5>Major: {major}</h5>
                                <h5>Semester: {semester}</h5>

                                {currentUser !== null?
                                <div> 
                                    <input type="file" accept="image/*" onChange={handleChange} />
                                    <Button className="btn-primary btn-outline-light" onClick={handleUpload}>Update Profile Picture</Button>
                                    <Button onClick={handleLogout} className="btn-primary btn-outline-light">
                                        Log Out
                                    </Button>
                                </div>:
                                <div/>
                                }
                            </div>
                        </div>
                </div>
                
                <table id = 'courses-table' className='child'>
                    <thead>
                        <tr>
                            <th><h5>Courses</h5></th>
                        </tr>
                    </thead>
                    {printCoursesTable(tasks, courseName)}
                    <button onClick={ () => openModal("add-course-modal") } className="buttonsize">Add a course</button>
                </table>
            </div>
            
            <div className = 'parent'>
                <table id = 'tasks-table' className='child'>
                    <thead>
                        <tr>
                            <th><h5>Upcoming Tasks</h5></th>
                        </tr>
                    </thead>
                    {showTasks(getUncompletedTasks(tasks), currentUser.email)}
                    {/* {uncompletedTasksData(tasks)}
                    {completedTasksData(tasks)} */}
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
                                <BarChart id='bar-graph' className = 'child' width={500} height={500} data={graphDATA(tasks)} >
                                    <CartesianGrid />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Bar dataKey="Task Completed" stackId="a" fill="#8884d8" />
                                    <Bar dataKey="Task Todo" stackId="a" fill="#d3d3d3" />
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
                    
                    <table id = 'course-task-table'>
                        <thead>
                            <tr><th><h5>Tasks</h5></th></tr>
                        </thead>
                        <tbody id = 'course-tasks'>
                        </tbody>
                    </table>
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
