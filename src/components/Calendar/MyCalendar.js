import React, {useState, useEffect, useRef} from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import {Button, Card, Form, Alert} from "react-bootstrap"
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "./MyCalendar.css";
import background from "../../assets/images/wallhaven-0prd9n.jpg"
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

export const Event_List = (EventName) => {
  let eventlength = EventName
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

  const [ allTitle, setTitle ] = useState([])
  const { currentUser } = useAuth()
  const [error, setError] = useState("")
  const localizer = momentLocalizer(moment);
  const [loading, setLoading] = useState(false)
  const history = useHistory();

  const TitleRef = useRef();
  const DescriptionRef = useRef();
  const PriorityRef = useRef();
  const StartRef = useRef();
  const EndRef = useRef();

  const getData = async() =>{
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
      setTitle(tempEventName);
    }).catch(error => console.log(error))
  }
  useEffect(() =>{
      getData()
  },[])

  async function handleSubmit(e){
    e.preventDefault()
    try {
        setError('')
        setLoading(true)

        db.getCollection('Events').doc(currentUser.email).update({
            ListOfEvents: firebase.firestore.FieldValue.arrayUnion(
                {   
                    Title: TitleRef.current.value,
                    Description: DescriptionRef.current.value,
                    Priority: PriorityRef.current.value,
                    Progress: false,
                    Start: StartRef.current.value,
                    End: EndRef.current.value
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

  return (
    <div style = {{backgroundImage: `url(${background})`}}>
      <div>
        <Calendar
          views={['month', 'agenda']}
          localizer={localizer}
          events={Event_List(allTitle)}
          defaultView="month"
          defaultDate={new Date()}
          style={{ height: 500 }}
        />
      </div>
      <div id = 'modal-content'>
        <Card>
          <Card.Body>
              <h2 className = "text-center mb-4">Add Event</h2>
              {error && <Alert variant ="danger">{error}</Alert>}
              <form onSubmit = {handleSubmit}>
                <Form.Group id = "courseName">
                    <Form.Label>Title Name</Form.Label>
                    <Form.Control type = "text" ref={TitleRef} required/>                 
                </Form.Group>
                <Form.Group id = "courseID">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type = "text" ref={DescriptionRef} required/>                 
                </Form.Group>
                <Form.Group id = "examsGrade">
                    <Form.Label>Priority</Form.Label>
                    <Form.Control type = "number" ref={PriorityRef} required/>                 
                </Form.Group>
                <Form.Group id = "projectsGrade">
                    <Form.Label>Start of Event</Form.Label>
                    <Form.Control type = "datetime-local" ref={StartRef} required/>                 
                </Form.Group>
                <Form.Group id = "projectsGrade">
                    <Form.Label>End of Event</Form.Label>
                    <Form.Control type = "datetime-local" ref={EndRef} required/>                 
                </Form.Group>
                <Button data-testid="btn-test" disabled = {loading} className = "button-test w-100" type = "submit" >
                    Add Course
                </Button>
              </form>
            </Card.Body>
          </Card>
        </div> 
      </div>
  );
}
