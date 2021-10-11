import React, {useRef} from 'react'
import {Card, Form, Button, Container} from 'react-bootstrap'
import "./SignUp.css"

export default function SignUp() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const nameRef = useRef();
    const userRef = useRef();
    return (
        // <>
        //     <Card>
        //         <Card.Body>
        //         <h2 className="text-center mb-4">Sign Up</h2>
        //             <Form className=''>
        //                 <Form.Group id="email">
        //                     <Form.Label> Email</Form.Label>
        //                     <Form.Control type ="email" ref ={emailRef} required />
        //                 </Form.Group>
        //                 <Form.Group id="password">
        //                     <Form.Label> Password</Form.Label>
        //                     <Form.Control type ="password" ref ={passwordRef} required/>
        //                 </Form.Group>
        //                 <Form.Group id="password-confirm">
        //                     <Form.Label> Password Confirmation</Form.Label>
        //                     <Form.Control type ="password" ref ={passwordConfirmRef} required/>
        //                 </Form.Group>
        //                 <Button className= 'w-100' type ="submit">
        //                     Sign Up
        //                 </Button>
        //             </Form>
        //         </Card.Body>
        //     </Card>
        //     <div className="w-100 text-center mt-2">
        //         Already have an account? Log in
        //     </div>
        // </>
        <Container className = "d-flex align-items-center justify-content-center" style ={{minHeight: "100vh"}}>
          <div className ="w-100" style = {{ maxWidth: '400px'}}>
            <Card>
                <Card.Body>
                    <h2 className = "text-center mb-4">Sign Up</h2>
                        {/* {error && <Alert variant ="danger">{error}</Alert>} */}
                    <Form className = "form">
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
                        <Button className = "button-test w-100" type = "submit" >
                            Sign Up
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? Go back to Login
            </div>
            </div>
        </Container>
    )
}
