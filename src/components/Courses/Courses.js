import React, {Component, useState} from "react"
import { Container, Card, Button, Alert } from "react-bootstrap"
import { useAuth } from '../../context/AuthContext'
import { Link, useHistory } from "react-router-dom"
import Fire from '../../firebase'
import './Courses.css';


export default function Courses() {
//Getting the data from firebase.
    let database = Fire.db

    const [error, setError] = useState("") /* istanbul ignore next */
    const {currentUser} = useAuth() /* istanbul ignore next */
    const [courseID, setCourseID] = useState("") /* istanbul ignore next */
    const [semester, setSemester] = useState("") /* istanbul ignore next */
    const [courseName, setCourseName] = useState(""); /* istanbul ignore next */
    const [examsGrade, setExamGrade] = useState(""); /* istanbul ignore next */
    const [homeworksGrade, setHomeworkGrade] = useState("") /* istanbul ignore next */
    const [projectsGrade, setProjectGrade] = useState("") /* istanbul ignore next */


    //const history = useHistory();

    /*
    db.getCollection('Users').doc(currentUser.email).get().then((doc) => {
        if(doc.exists) {
            setName(doc.data().name);
            setSemester(doc.data().semester);
        }
        else {
            return;
        }
    });
    */
    async function GetCourses(){
        await database.getCollection('Course').doc(currentUser.email).get().then(function(doc){
            if(doc.exists) {
                const data = doc.data();
                console.log(data);
                setCourseName(data.Course_Name);
                setExamGrade(data.Exams);
                setHomeworkGrade(data.Homeworks);
                setProjectGrade(data.Projects);
                setSemester(data.semester);
                
            }
            else {
                return;
            }
        });
    }
   

//React elements start here
    GetCourses();
    return (
    <div className="course-page">
        <div className="main main-raised">
            <div className="course-content">
                {console.log()}
            hello test
            </div>

        </div>

    </div>
    
    )
}
