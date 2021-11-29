import { render } from '@testing-library/react';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Course.css';

class Course extends Component {
    render(){
        return (
            <div>
                <p><Link style={{fontSize: "2rem", marginLeft: "2%"}} className = "course-link"to ={{pathname: "/Courses", state: {
                data: this.props.data,
                id : this.props.id
            } } }>{this.props.name}</Link></p>
            </div>
        )
    }
}
export default Course;