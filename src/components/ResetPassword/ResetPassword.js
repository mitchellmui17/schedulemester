import React, {useRef, useState} from 'react'
import {Card, Form, Button, Container, Alert} from 'react-bootstrap'
import {useAuth} from '../../context/AuthContext'
import {Link, useHistory} from 'react-router-dom'
import "./ResetPassword.css"
import Fire from '../../firebase'
import background from '../../images/wallhaven-nme3w9.png';

export default function ResetPassword() {

    const emailRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { resetPassword } = useAuth()
    const history = useHistory();
    let database = Fire.db;
    

    async function checkUser(){
        await database.getCollection('Users').doc(emailRef.current.value).get().then(function(doc){
            try{
                if(doc.exists){
                    console.log("Password Reset Email Sent.")
                    history.push("/Login")
                }
            }catch(error){
                console.log(error);

            }
        })
        
    }
    
    async function handleSubmit(e){
        e.preventDefault()
        try{
            setError("");
            setLoading(true)
            await resetPassword(emailRef.current.value)
            checkUser()
        }
        catch(error){
            console.log(error)
        }
        setLoading(false)
    }


    return (
        <div className = "font-style" style = {{backgroundImage: `url(${background})`}}>
        <Container className = "d-flex align-items-center justify-content-center" style ={{minHeight: "80vh"}}>
            <div className ="W-100" style ={{maxWidth: '400px'}}>
                <Card>
                    <Card.Body>
                        <h2 className ="text-center mb-4">Account Recovery</h2>
                            {error && <Alert variant ="danger">{error}</Alert>}
                        <Form onSubmit ={handleSubmit} className = "form">
                            <Form.Group>
                                <Form.Label>Enter Your Email</Form.Label>
                                <Form.Control type ="text" ref = {emailRef} required/>
                            </Form.Group>
                            <Button className ="button-test w-100" type ="submit" disabled={loading}>
                                Submit
                            </Button>
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