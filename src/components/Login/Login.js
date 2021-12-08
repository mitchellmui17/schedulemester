/* istanbul ignore file */
import React, {useRef, useState} from 'react'
import {Card, Form, Button, Container} from 'react-bootstrap'
import {useAuth} from '../../context/AuthContext'
import {Link, useHistory} from 'react-router-dom'
import "./Login.css"
import Fire from '../../firebase'
import logo from "../../assets/images/ScheduleMester-logo/default.png"
import background from '../../assets/images/wave.svg';
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
        <div className = "background-style" style = {{backgroundImage: `url(${background})`}}>
        <div className= "grid-container font-style-Alice">
            <div className = "grid-child first"> 
                <Container className = "d-flex justify-content-center" style ={{minHeight: "100vh"}}>
                    <div  className= 'd-flex  align-items-center justify-content-center'>
                    {/* //<img src ={logo} width= "500" height ="500"></img> */}
                    </div>
                    <div  className= 'd-flex align-items-center text'>
                        <div>
                        Questions? Contact us at ScheduleMester@gmail.com! Or <br/>
                        Don't have an account yet?<Link className="links" to = '/SignUp'> Click here!</Link>  
                        </div>
                    </div>  
                    
                </Container>
            </div>
            <div className="test">
                <Container className = "grid-child second d-flex align-items-right justify-content-center" style ={{minHeight: "100vh"}}>
                    <div className ="w-100 div right-side" style = {{ maxWidth: '400px'}}>
                        <img className = "logo" src ={logo}/>
                        <Card className = "card-style" style = {{borderRadius: '10px'}}>
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
                                    <Button className = "button-test w-100 btn-outline-light" type = "submit" disabled={loading}>
                                        Login
                                    </Button>
                                    
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