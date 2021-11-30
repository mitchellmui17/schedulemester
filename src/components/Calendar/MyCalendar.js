import React, {useState, useEffect, useRef} from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import "./MyCalendar.css";
import {useAuth} from '../../context/AuthContext';
import firebase from 'firebase/app';
import { Link, useHistory } from "react-router-dom"
import Fire from '../../firebase';

export const db = Fire.db;

export const printEventsTable = (EventName) => {
  let eventlength = EventName
  let list = []
  let Title = document.getElementById("course-modal-title")
  let Description = document.getElementById("course-modal-ID") 
  for (let z = 0; z < eventlength.length; z++){
      list.push(
        <div>          
          Event - {eventlength[z].Title} Description - {eventlength[z].Description} 
        </div>
      )
  }
  return (<tbody>{list}</tbody>)
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
	const [ allDescription, setDescription ] = useState([])
	const [ allProgress, setProgress ] = useState([])
  const [ allStart, setStart ] = useState([])
  const [ allEnd, setEnd ] = useState([])
  const [ allPriority, setPriority ] = useState([])
  const { currentUser } = useAuth()

  const localizer = momentLocalizer(moment);

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

  return (
    <div>
      <div>
        <thead>
          <tr>
            <th><h5>Events</h5></th>
          </tr>
        </thead>
        {printEventsTable(allTitle)}
        <button onClick={ () => openModal("add-course-modal") }>Add a event</button>
      </div>
      
      <div>
      </div>
    </div>
  );
}
/* 
      <div>
        <Calendar
          localizer={localizer}
          events={allTitle}
          defaultDate={new Date()}
          style={{ height: 500 }}
        />
      </div>
*/