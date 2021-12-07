/* istanbul ignore file */
import React, {useRef, useState} from 'react'
import {Card, Form, Button, Container, Alert} from 'react-bootstrap'
import Fire from '../../firebase'
import {useAuth} from '../../context/AuthContext'
import {Link, useHistory} from 'react-router-dom'
import "./SignUp.css"
import background from '../../assets/images/wallhaven-nme3w9.png';

export const SignUpButton = () => (
    <Button data-testid="btn-test"  className = "button-test w-100" type = "submit" >Sign Up</Button>
  );
  
export default function SignUp() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const majorRef = useRef();
    const nameRef = useRef();
    const semesterRef = useRef();
    const {signup} = useAuth();
    const [error, setError] = useState('');
   // const [loading, setLoading] = useState(false)
    const history = useHistory();
    let db = Fire.db;

    async function handleSubmit(e){
        e.preventDefault()
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords do not match')
        }
        

        try{
            setError('')
           // setLoading(true) //prevents users from creating multiple accounts on submit
            await signup(emailRef.current.value, passwordRef.current.value)
                db.getCollection('Users').doc(emailRef.current.value).set({
                    password: passwordRef.current.value,
                    name: nameRef.current.value,
                    email: emailRef.current.value,
                    major: majorRef.current.value,
                    semester: semesterRef.current.value
  
                    
                    }).then(function() {// went through
                        console.log("Document successfully written for Users collection!");
                        
                    })
                    .catch(function(error) { //broke down somewhere
                        console.error("Error writing document for Users collection!: ", error);
                    });

                db.getCollection('Tasks').doc(emailRef.current.value).set({      
                    }).then(function() {// went through
                        console.log("Document successfully written for Tasks collection!");
                        
                    })
                    .catch(function(error) { //broke down somewhere
                        console.error("Error writing document for Tasks collection!: ", error);
                    });
                db.getCollection('Course').doc(emailRef.current.value).set({      
                }).then(function() {// went through
                    console.log("Document successfully written for Course collection!");
                    
                })
                .catch(function(error) { //broke down somewhere
                    console.error("Error writing document for Course collection!: ", error);
                });
                db.getCollection('Events').doc(emailRef.current.value).set({      
                }).then(function() {// went through
                    console.log("Document successfully written for Events collection!");
                    
                })
                .catch(function(error) { //broke down somewhere
                    console.error("Error writing document for Events collection!: ", error);
                });
                
            history.push('/Profile');
        } catch(error){
            console.log(error)
        
        }
        //setLoading(false)

       
    }
    return (

        <div className = "font-style-Alice" style = {{backgroundImage: `url(${background})`}}>
        <Container className = "d-flex align-items-center justify-content-center" style ={{minHeight: "100vh"}}>
          <div className ="w-100" style = {{ maxWidth: '400px'}}>
            <Card>
                <Card.Body>
                    <h2 className = "text-center mb-4">Sign Up</h2>
                         {error && <Alert variant ="danger">{error}</Alert>} 
                    <Form  onSubmit ={handleSubmit} className = "form">
                        <Form.Group id = "email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type = "email" ref={emailRef} required/>                 
                        </Form.Group>
                        <Form.Group id = "Name">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type = "text" ref={nameRef} required/>                 
                        </Form.Group>
                        <Form.Group id = "password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type = "password" ref={passwordRef} required/>                 
                        </Form.Group>
                        <Form.Group id = "password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type = "password" ref={passwordConfirmRef} required/>                 
                        </Form.Group>
                        <Form.Group id = "Major">
                            <Form.Label>Major</Form.Label>
                            <Form.Control type = "text" ref={majorRef} required/>                 
                        </Form.Group>
                        <Form.Group id = "Semester ">
                            <Form.Label>Current Semester</Form.Label>
                            <Form.Control type = "text" ref={semesterRef} required/>                 
                        </Form.Group>
                        {SignUpButton()}
                        <div className="w-100 text-center mt-2">
                            <Link className="links" to='/Login'>》Login Here《</Link>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
            </div>
        </Container>
        </div>
    )
}
