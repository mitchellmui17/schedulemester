/* istanbul ignore file */
import React, {useRef, useState} from 'react'
import {Card, Form, Button, Container} from 'react-bootstrap'
import {useAuth} from '../../context/AuthContext'
import {Link, useHistory} from 'react-router-dom'
import "./Login.css"
import Fire from '../../firebase'
import logo from '../../assets/images/ScheduleMester-logo/default_Stroke.png';
import background from '../../assets/images/wallhaven-nme3w9.png';
import "./../../assets/fonts/font.css"


export default function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const {login} = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    let database = Fire.db;

    async function checkUser(){
        await database.getCollection('Users').doc(emailRef.current.value).get().then(function(doc){
            try{
                if(doc.exists){
                    console.log("Signed in!")
                    history.push("/Profile")
                }
            }catch(error){
                console.log(error);

            }
        })
        
    }

    async function handleSubmit(e){
        e.preventDefault()

        try{
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            checkUser()
        }catch(error){
            console.log(error)
        }
        setLoading(false)
    }


    return (
        <div style = {{backgroundImage: `url(${background})`}}>
        <div className= "grid-container font-style-Alice">
            <div className = "grid-child first"> 
                <Container className = "d-flex justify-content-center" style ={{minHeight: "100vh"}}>
                    <div  className= 'd-flex  align-items-center justify-content-center'>
                    <img src ={logo} width= "500" height ="500"></img>
                    </div>
                    <div  className= 'd-flex align-items-center'>
                    <p>This was just placeholder text</p>
                    </div>
                </Container>
            </div>
            <div className="test">
                <Container className = "grid-child second d-flex align-items-right justify-content-center" style ={{minHeight: "100vh"}}>
                    <div className ="w-100 div" style = {{ maxWidth: '400px'}}>
                        <Card>
                            <Card.Body>
                                <h2 className = "text-center mb-4">Login</h2>
                                    {/* {error && <Alert variant ="danger">{error}</Alert>} */}
                                <Form className = "form" onSubmit = {handleSubmit}>
                                    <Form.Group id = "email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type = "email" ref = {emailRef} required />
                                    </Form.Group>
                                    <Form.Group id = "password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type = "password" ref={passwordRef} required/>
                                    </Form.Group>
                                    <Button className = "button-test w-100" type = "submit" disabled={loading}>
                                        Login
                                    </Button>
                                    <div className = "w-100 text-center mt-2">
                                        <Link className="links" to = '/SignUp'>Don't have an account yet?</Link>    
                                    </div>
                                    <div className = "w-100 text-center mt-2">
                                        <Link className="links" to = '/ResetPassword'>Forgot your password? </Link>    
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </Container>
            </div>
        </div>
        </div>
    )
}