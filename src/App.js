import LandingPage from './components/Landingpage/LandingPage.js';
import SignUp from './components/SignUp/SignUp.js';
import ContactUs from './components/ContactUs/ContactUs';
import Navbar from './components/NavBar/NavBar';
import Calendar from './components/Calendar/Calendar';
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
            <Route path="/Home" exact> 
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
          </Switch>
        </main>
      </Router>
    </AuthProvider>
  );
}
export default App;
