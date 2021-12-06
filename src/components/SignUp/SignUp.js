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
    const nameRef = useRef();
    const userRef = useRef();
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
                    username: userRef.current.value,
                    password: passwordRef.current.value,
                    name: nameRef.current.value,
                    email: emailRef.current.value,
                    Grades: 0,
                    Homeworks: 0,
                    Projects: 0,
                    Participation: 0
                    
                    }).then(function() {// went through
                        console.log("Document successfully written!");
                        
                    })
                    .catch(function(error) { //broke down somewhere
                        console.error("Error writing document: ", error);
                    });
            history.push('/Login');
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
                        <Form.Group id = "user">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type = "text" ref={userRef} required/>                 
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
                        {/* <Form.Group id = "name-confirm">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type = "text" ref={nameRef} required/>                 
                        </Form.Group> */}
                        {/* <Button data-testid="btn-test" disabled = {loading} className = "button-test w-100" type = "submit" >
                            Sign Up
                        </Button> */}
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
