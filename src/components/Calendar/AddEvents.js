import React from 'react';
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function AddEvents() {

    const [ allTitle, setAllTitle ] = useState([])
	const [ allDescription, setAllDescription ] = useState([])
	const [ allProgress, setAllProgress ] = useState([])
    const [ allStart, setAllStart ] = useState([])
    const [ allEnd, setAllEnd ] = useState([])
    const [ allPriority, setPriority ] = useState([])
    const { currentUser, logout } = useAuth()

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

    
}

export default AddEvents;

/*
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

    const getData = async() =>{
        await db.getCollection("Events").get().then(snapshot => {
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


    async function addFooditem(){
        
        let id="d"+foodNameValue.split(" ").join("")
        await tests.getCollection('Events').doc(id).set(
            {   allTitle: alltitleValue,               
                alldescription: allDescriptionValue, 
                allStart: allStartValue,
                allEnd: timestampeValue, 
                allPriority: allPriorityValue, 
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
}

<Modal show={show} onHide={handleClose}>
    <Modal.Header>
        <Modal.Title>Food</Modal.Title>
    </Modal.Header>
        <Modal.Body>
            <Form onSubmit={addFooditem}>
                 <div>
                      <h6>Item Name:</h6>
                         <input type="text" className="post-modal-input" onChange={e => setFoodName(e.target.value)} value={foodNameValue}/>
                      <h6>Price:</h6>
                         <input type="number" className="post-modal-input" onChange={e => setFoodPrice(e.target.value)} value={foodPriceValue}/>
                      <h6>Description:</h6>
                         <input type="text" className="post-modal-input" onChange={e => setFoodDescription(e.target.value)} value={foodDescriptionValue}/>
                      <h6>Type:</h6>
                <select value={typeValue} onChange={e => setFoodType(e.target.value)}>
                    <option value="food">Food</option>
                    <option value="drink">Drink</option>
                </select>
                <h6>Url:</h6>
                <input type="text" className="post-modal-input" onChange={e => setURL(e.target.value)} value={url}/>
                <h6>Only for VIP:</h6>
                <input type="checkbox" style={{marginLeft:"-45%"}} className="post-modal-input" onChange={e => setVIP(e.target.checked)}/>

        </div>
    </Form>
</Modal.Body>
<Modal.Footer>
<Button variant="secondary post-modal-button" onClick={handleClose}>
    Close
</Button>
<Button variant="primary post-modal-button" onClick={addFooditem}>
    Save Changes
</Button>
</Modal.Footer>
</Modal>
*/