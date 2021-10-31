import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./MyCalendar.css";

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const events = [
    {
        title: "Group meeting",
        allDay: true,
        start: new Date(2021, 9, 29),
        end: new Date(2021 ,9, 29),
        cName:"Event",
    },
    {
        title: "1st-iteration",
        allDay: true,
        start: new Date(2021, 10, 3),
        end: new Date(2021 ,10, 3),
        cName:"Event",
    },
    {
        title: "2st-iteration",
        allDay: true,
        start: new Date(2021, 10, 17),
        end: new Date(2021 ,10, 17),
        cName:"Event",
    },
];

function MyCalendar() {
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState(events);

    function handleAddEvent() {
        setAllEvents([...allEvents, newEvent]);
    }

    return (
            <div className="App">
                <div className="Container">
                    <div className="Cal_Header">
                        <h1 className="1_header">Calendar</h1>
                    </div>
                    <div className = "info">
                        <h2 className="2_header">Add New Event</h2>
                        <div className="menu">
                            <input className="DataPicker_1" type="text" placeholder="Add Title" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />                                <DatePicker className="DataPicker_1" placeholderText="Start Date" selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                            <DatePicker className="DataPicker_1" placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
                            <button className="Button" onClick={handleAddEvent}>
                                Add Event
                            </button>
                        </div>
                    </div>
                    <Calendar className="Calen" localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
                </div>
            </div>
    );
}

export default MyCalendar;