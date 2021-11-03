/* istanbul ignore file */
import React, {useRef, useState} from 'react'
import {Card, Form, Button, Container} from 'react-bootstrap'
import {useAuth} from '../../context/AuthContext'
import {Link, useHistory} from 'react-router-dom'
import "./Login.css"
import Fire from '../../firebase'

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
        <div className= "grid-container">
            <div className = "grid-child first"> 
                <Container className = "d-flex align-items-center justify-content-center" style ={{minHeight: "100vh"}}>
                    Add a picture or something here idk
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
                                </Form>
                            </Card.Body>
                        </Card>
                        <div className = "w-100 text-center mt-2">
                            <Link className="links" to = '/ResetPassword'>Forgot your password? </Link>    
                        </div>
                    </div>
                </Container>
            </div>
            
        </div>
    )
}