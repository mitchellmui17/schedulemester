import React, {useState, useEffect, useRef} from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import {Button, Card, Form, Alert} from "react-bootstrap"
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "./MyCalendar.css";
import {useAuth} from '../../context/AuthContext';
import Fire from '../../firebase';
import firebase from 'firebase/app';
import { useHistory } from "react-router-dom"

export const db = Fire.db;

export const formatDate = (date_time) => {
  var timestamp = date_time;
  var date = new Date(timestamp.seconds * 1000);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  
  return (year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds)
}

export const Event_List = (EventName, TaskName) => {
  let eventlength = EventName
  let Tasklength = TaskName
  let list = []
  for (let z = 0; z < eventlength.length; z++){
    list.push(
      {
        title: eventlength[z].Title,
        start: eventlength[z].Start,
        end: eventlength[z].End,
      }
    )
  }
  for (let z = 0; z < Tasklength.length; z++){
    list.push(
      {
        title: Tasklength[z].Title,
        start: Tasklength[z].Date,
        end: Tasklength[z].Date,
      }
    )
  }
  return (list)
}

export const closeModal = (modalId) => {
  let modal = document.getElementById(modalId);
  modal.style.display = "none" 
}

export const openModal = (modalId) => {
  let modal = document.getElementById(modalId);
  modal.style.display = 'block'
}

export const updateEventModal = (event, eventTitle, eventDescription) => {
  eventTitle.innerHTML = event.Title
  eventDescription.innerHTML = event.Description
  openModal("course-modal")
}

export default function MyCalendar() {

  const [ allEventTitle, setEventTitle ] = useState([])
  const [ allTaskTitle, setTaskTitle ] = useState([])
  const { currentUser } = useAuth()
  const [error, setError] = useState("")
  const localizer = momentLocalizer(moment);
  const [loading, setLoading] = useState(false)
  const history = useHistory();

  const TitleERef = useRef();
  const DescriptionERef = useRef();
  const PriorityERef = useRef();
  const StartERef = useRef();
  const EndERef = useRef();

  const TitleTRef = useRef();
  const DescriptionTRef = useRef();
  const PriorityTRef = useRef();
  const CourseTRef = useRef();
  const EndTRef = useRef();

  const getEventData = async() =>{
    await db.getCollection("Events").get().then(snapshot => {
      const tempEventName= [];
      snapshot.forEach(doc => {
        const data = doc.data();
        if (currentUser.email === doc.id){
          let x =0;
          for(x = 0; x < data.ListOfEvents.length; x++){
            tempEventName.push(data.ListOfEvents[x]);
          }
        }
      })
      setEventTitle(tempEventName);
    }).catch(error => console.log(error))
  }

  useEffect(() =>{
    getEventData()
  },[])

  const getTasksData = async() =>{
    await db.getCollection("Tasks").get().then(snapshot => {
      const tempTaskName= [];
      snapshot.forEach(doc => {
        const data = doc.data();
        if (currentUser.email === doc.id){
          let x =0;
          for(x = 0; x < data.Tasks.length; x++){
            tempTaskName.push(data.Tasks[x]);
          }
        }
      })
      setTaskTitle(tempTaskName);
    }).catch(error => console.log(error))
  }


  useEffect(() =>{
    getTasksData()
  },[])

  async function handleSubmitEvent(e){
    e.preventDefault()
    try {
        setError('')
        setLoading(true)

        db.getCollection('Events').doc(currentUser.email).update({
            ListOfEvents: firebase.firestore.FieldValue.arrayUnion(
                {   
                    Title: TitleERef.current.value,
                    Description: DescriptionERef.current.value,
                    Priority: PriorityERef.current.value,
                    Progress: false,
                    Start: StartERef.current.value,
                    End: EndERef.current.value
                    }
                )
            }).then(function() {// went through
                console.log("Document successfully written!");
                window.location.reload(false);
            })
            .catch(function(error) { //broke down somewhere
                console.error("Error writing document: ", error);
            });
        history.push('/Calendar')
    } catch{
        setError('Failed to add event')
    }
    setLoading(false)
  }

  async function handleSubmitTask(e){
    e.preventDefault()
    try {
        setError('')
        setLoading(true)

        db.getCollection('Tasks').doc(currentUser.email).update({
          Tasks: firebase.firestore.FieldValue.arrayUnion(
                {   
                    Title: TitleTRef.current.value,
                    Description: DescriptionTRef.current.value,
                    Priority: parseInt(PriorityTRef.current.value),
                    Course: CourseTRef.current.value,
                    isComplete: false,
                    Date: EndTRef.current.value,

                    }
                )
            }).then(function() {// went through
                console.log("Document successfully written!");
                window.location.reload(false);
            })
            .catch(function(error) { //broke down somewhere
                console.error("Error writing document: ", error);
            });
        history.push('/Calendar')
    } catch{
        setError('Failed to add tasks')
    }
    setLoading(false)
  }

  return (
    <div className ="back">
      <div class = "left-half">
        <Calendar
          views={['month', 'agenda']}
          localizer={localizer}
          events={Event_List(allEventTitle, allTaskTitle)}
          defaultView="month"
          defaultDate={new Date()}
          style={{ height: 500 }}
        />
      </div>
      <div class = "right-half">
        <div class="dropdown">
        <button class="dropbtn">Add Event</button>
          <div className = "dropdown-content">
            <Card>
              <Card.Body>
                <h2 className = "text-center mb-4">Add Event</h2>
                <form onSubmit = {handleSubmitEvent}>
                  <Form.Group id = "TitleName">
                    <Form.Label>Title Name</Form.Label>
                    <Form.Control type = "text" ref={TitleERef} required/>                 
                  </Form.Group>
                  <Form.Group id = "Desciptiom">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type = "text" ref={DescriptionERef} required/>                 
                  </Form.Group>
                  <Form.Group id = "Priority">
                    <Form.Label>Priority</Form.Label>
                    <Form.Control type = "number" ref={PriorityERef} required/>                 
                  </Form.Group>
                  <Form.Group id = "StartTime">
                    <Form.Label>Start of Event</Form.Label>
                    <Form.Control type = "datetime-local" ref={StartERef} required/>                 
                  </Form.Group>
                  <Form.Group id = "EndTime">
                    <Form.Label>End of Event</Form.Label>
                    <Form.Control type = "datetime-local" ref={EndERef} required/>                 
                  </Form.Group>
                  <Button data-testid="btn-test" disabled = {loading} className = "button-test w-100" type = "submit" >
                    Add Course
                  </Button>
                </form>
              </Card.Body>
            </Card>
          </div>
        </div> 
        <div class="dropdown">
        <button class="dropbtn">Add Tasks</button>
          <div className = "dropdown-content">
            <Card>
              <Card.Body>
                <h2 className = "text-center mb-4">Add Tasks</h2>
                <form onSubmit = {handleSubmitTask}>
                <Form.Group id = "TitleName">
                    <Form.Label>Course Name</Form.Label>
                    <Form.Control type = "text" ref={CourseTRef} required/>                 
                  </Form.Group>
                  <Form.Group id = "TitleName">
                    <Form.Label>Title Name</Form.Label>
                    <Form.Control type = "text" ref={TitleTRef} required/>                 
                  </Form.Group>
                  <Form.Group id = "Desciptiom">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type = "text" ref={DescriptionTRef} required/>                 
                  </Form.Group>
                  <Form.Group id = "Priority">
                    <Form.Label>Priority</Form.Label>
                    <Form.Control type = "number" ref={PriorityTRef} required/>                 
                  </Form.Group>
                  <Form.Group id = "EndTime">
                    <Form.Label>End of Event</Form.Label>
                    <Form.Control type = "datetime-local" ref={EndTRef} required/>                 
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
    </div>
  );
}
