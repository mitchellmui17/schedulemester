import React, {useRef, useState} from 'react'
import {Card, Form, Button, Container, Alert} from 'react-bootstrap'
import {useAuth} from '../../context/AuthContext'
import {Link, useHistory} from 'react-router-dom'
import "./ResetPassword.css"
import Fire from '../../firebase'

export default function ResetPassword() {

    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    async function handleSubmit(e){
        e.preventDefault()
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords do not match')
        }
    }

    return (
        <Container className = "d-flex align-items-center justify-content-center" style ={{minHeight: "65vh"}}>
            <div className ="W-100" style ={{maxWidth: '400px'}}>
                <Card>
                    <Card.Body>
                        <h2 className ="text-center mb-4">Account Recovery</h2>
                            {error && <Alert variant ="danger">{error}</Alert>}
                        <Form className = "form">
                            <Form.Group>
                                <Form.Label>New Password</Form.Label>
                                <Form.Control type ="text" ref = {passwordRef} required/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Enter Password Again</Form.Label>
                                <Form.Control type = "verification" ref ={passwordConfirmRef} required/>
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