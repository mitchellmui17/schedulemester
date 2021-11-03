import LandingPage from './components/Landingpage/LandingPage.js';
import SignUp from './components/SignUp/SignUp.js';
import ContactUs from './components/ContactUs/ContactUs';
import Navbar from './components/NavBar/NavBar';
import Calendar from './components/Calendar/MyCalendar';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login'
import EmailVerification from './components/EmailVerification/EmailVerification'
import ResetPassword from './components/ResetPassword/ResetPassword.js';
import React from "react"
import { Container, NavItem } from 'react-bootstrap';
import { AuthProvider } from './context/AuthContext.js';

import { BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main>
          <Switch>   
            <Route path="/" exact> 
              <LandingPage />
            </Route>
            <Route path="/Calendar" exact> 
              <Calendar />
            </Route>
            <Route path="/ContactUs" exact>
              <ContactUs />
            </Route>
            <Route path="/SignUp" exact>
              <SignUp />
            </Route>
            <Route path="/Login" exact>
            <Login />
            </Route>
            <Route path="/Profile" exact>
              <Profile />
            </Route>
            <Route path="/EmailVerification" exact>
              <EmailVerification />
            </Route>
            <Route path="/ResetPassword" exact>
              <ResetPassword />
            </Route>
          </Switch>
        </main>
      </Router>
    </AuthProvider>
  );
}
export default App;
