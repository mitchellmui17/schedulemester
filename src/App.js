import LandingPage from './components/Landingpage/LandingPage.js';
import SignUp from './components/SignUp/SignUp.js';
import ContactUs from './components/ContactUs/ContactUs';
import NavBar from './components/NavBar/NavBar';
import Calendar from './components/Calendar/MyCalendar';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login'
import ResetPassword from './components/ResetPassword/ResetPassword.js';
import React, {useEffect} from "react"
import { Container, NavItem } from 'react-bootstrap';
import { AuthProvider } from './context/AuthContext.js';
import Footer from './components/Footer/Footer.js';
import PrivateRoute from './components/PrivateRoute.js'
import { BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";

function App() {
  useEffect(() => {
    document.title = "ScheduleMester";   }, []);

  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <main>
          <Switch>   
            <Route path="/" exact> 
              <LandingPage />
            </Route>
            <PrivateRoute exact path="/Calendar" component ={Calendar}/> 
            <Route path="/ContactUs" exact>
              <ContactUs />
            </Route>
            <Route path="/SignUp" exact>
              <SignUp />
            </Route>
            <Route path="/Login" exact>
            <Login />
            </Route>
            <PrivateRoute exact path="/Profile" component ={Profile}/> 
            <Route path="/ResetPassword" exact>
              <ResetPassword />
            </Route>
          </Switch>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}
export default App;
