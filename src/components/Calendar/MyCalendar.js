import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, {useState, useEffect, useRef} from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./MyCalendar.css";
import {useAuth} from '../../context/AuthContext';
import Fire from '../../firebase';
import firebase from 'firebase/app';
import { Link, useHistory } from "react-router-dom"

export const db = Fire.db;


export default function MyCalendar() {

    const [ allTitle, setTitle ] = useState([])
	const [ allDescription, setDescription ] = useState([])
	const [ allProgress, setProgress ] = useState([])
    const [ allStart, setStart ] = useState([])
    const [ allEnd, setEnd ] = useState([])
    const [ allPriority, setPriority ] = useState([])
    const [ error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory();
    const [loading, setLoading] = useState(false)

    const allTitleRef = useRef();
    const allDescriptionRef = useRef();
    const allProgressRef = useRef();
    const allStartRef = useRef();
    const allEndRef = useRef();
    const allPriorityRef = useRef();
    const EventList = [];

    db.getCollection('Users').doc(currentUser.email).get().then((doc) => {
        if(doc.exists) {
            setTitle(doc.data().allTitle);
            setDescription(doc.data().allDescription);
            setPriority(doc.data().allPriority);   
            setStart(doc.data().allStart);  
            setEnd(doc.data().allEnd);  
        }
        else {
            return;
        }
    });

    const getEvents = async () => {
        await db.getCollection('Tasks').doc(currentUser.email).get().then((d) => {
            if (d.exists)  setTitle(d.data().allTitle)           
        })
    }

    useEffect(() => {
        getEvents()
    }, [])

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
            const tempEventName= [];
            snapshot.forEach(doc => {
                const data = doc.data();
                if (currentUser.email === doc.id){
                    let x =0;
                    for(x = 0; x < data.ListofEvents.length; x++){
                        tempEventName.push(data.ListofEvents[x]);
                    }
                    
                }

            })
            setTitle(tempEventName);
        }).catch(error => console.log(error))
        }
        
    function pushContent(){
        EventList.push(allTitleRef)
        EventList.push(allDescriptionRef)
        EventList.push(allProgressRef)
        EventList.push(allStartRef)
        EventList.push(allEndRef)
        EventList.push(allPriorityRef)
    }
    
    useEffect(() =>{
        getData()
    },[])

    /* bla bla*/

    function printTable(){
        try{
        let eventslength = EventList.length;
            
        const list = []
        let x;
        for(x = 0; x < eventslength; x++){
            list.push(<li>{EventList[x].Title} - {EventList[x].Description} </li>)
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
                        Description: allDescriptionRef.current.value,
                        End: allEndRef.current.value,
                        Priority: allPriorityRef.current.value,
                        Progress: allProgressRef.current.value,
                        Start: allStartRef.current.value,
                        Title: allTitleRef.current.value
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
            setError('Failed to add event')
        }
        setLoading(false)
    }

    return (
            <div className="App font-style-Alice">
                        <tbody>
                            <tr><td><a href = '/Courses'>{printTable()}</a></td></tr>
                        </tbody>
            </div>
    );
}

/*
                            <input className="DataPicker_1" type="text" placeholder="Add Title" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />                                <DatePicker className="DataPicker_1" placeholderText="Start Date" selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                            <DatePicker className="DataPicker_1" placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
                            <button className="Button" onClick={handleAddEvent}>
                                Add Event
                            </button>

                            <Calendar className="Calen" localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
                
*/