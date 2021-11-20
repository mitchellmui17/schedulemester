import React from 'react';
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function AddEvents() {

    const [ allTitle, setAllTitle ] = useState([])
	const [ allDescription, setAllDescription ] = useState([])
	const [ allProgress, setAllProgress ] = useState([])
    const [ allStart, setAllStart ] = useState([])
    const [ allEnd, setAllEnd ] = useState([])
    const [ allPriority, setPriority ] = useState([])
    //const { currentUser, logout } = useAuth()
    const [email, setEmail] = useState('')

    let database = Fire.db;


const getData = async() =>{
    const Event = []
    tests.getCollection('Events').get()
    .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
            allTitle.push(doc.data())
        });
        // setFoodItems(foodItems)
        // this.setState({show: false});
    }).catch(function(error){
        console.log(error)
    })
}


async function addFooditem(){
    
    let id="d"+foodNameValue.split(" ").join("")
    await tests.getCollection('Events').doc(id).set(
        {name: foodNameValue, 
            price: foodPriceValue, 
            description: foodDescriptionValue, 
            id: id, 
            Chef: username, 
            url: url, 
            rating:[], 
            count:0, 
            vip:vip, 
            email:email })
    .then(() =>{
        console.log("Added Event to DB")
    })
    .catch(function(error) { //broke down somewhere
        console.error("Error: ", error);
    });
        
    
    setAllTitle("")
    setAllDescription("")
    setAllProgress(false)
    setAllStart("") //change it to timestamp
    setAllEnd("") //change it to timestamp
    setPriority("")


    getData()
}

export default AddEvents;

/* 
async function deleteEventItem(fooditem){
    if(fooditem.id[0] == ("d")){
        await tests.getCollection('Drink').doc(fooditem.id).delete()
        .then(() =>{
            console.log("Removed drink item from Database")
            getData()

        })
        .catch(function(error) { //broke down somewhere
            console.error("Error: ", error);
        });

    }
   
} */