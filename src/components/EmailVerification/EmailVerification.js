import React, {useRef, useState} from 'react'
import {Card, Form, Button, Container, Alert} from 'react-bootstrap'
import {useAuth} from '../../context/AuthContext'
import {Link, useHistory} from 'react-router-dom'
import "./EmailVerification.css"
import Fire from '../../firebase'

export default function EmailVerification() {

    const emailRef = useRef();
    const verificationRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function emailVerify(e){
        e.preventDefault()
        
    }

    return (
        <Container className = "d-flex align-items-center justify-content-center" style ={{minHeight: "80vh"}}>
            <div className ="W-100" style ={{maxWidth: '400px'}}>
                <Card>
                    <Card.Body>
                        <h2 className ="text-center mb-4">Account Recovery</h2>
                            {error && <Alert variant ="danger">{error}</Alert>}
                        <Form onSubmit ={emailVerify} className = "form">
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type ="text" ref = {emailRef} required/>
                            </Form.Group>
                            <Button className ="button-test w-100" type ="submit" disabled={loading}>
                                Send Verification Code
                            </Button>
                            <Form.Group>
                                <Form.Label>Verification Code</Form.Label>
                                <Form.Control type = "verification" ref ={verificationRef} required/>
                            </Form.Group>
                            <Button className ="button-test w-100" type ="submit" disabled={loading}>
                                Confirm
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    )
}