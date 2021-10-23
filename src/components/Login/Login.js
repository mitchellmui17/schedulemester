import React, {useRef} from 'react'
import {Card, Form, Button, Container} from 'react-bootstrap'
import "./Login.css"

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    return (
        <Container className = "d-flex align-items-center justify-content-center" style ={{minHeight: "100vh"}}>
            <div className ="w-100" style = {{ maxWidth: '400px'}}>
                <Card>
                    <Card.Body>
                        <h2 className = "text-center mb-4">Login</h2>
                            {/* {error && <Alert variant ="danger">{error}</Alert>} */}
                        <Form className = "form">
                            <Form.Group id = "email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type = "email" ref = {emailRef} required />
                            </Form.Group>
                            <Form.Group id = "password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type = "password" ref={passwordRef} required/>
                            </Form.Group>
                            <Button className = "button-test w-100" type = "submit" >
                                Login
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className = "w-100 text-center mt-2">
                    Forgot your password?     
                </div>
            </div>
        </Container>
    )
}