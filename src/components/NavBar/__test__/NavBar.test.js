import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './../NavBar';

it('renders without crashing', () => {
    const div = document.createElement("div");
    ReactDOM.render(<Navbar></Navbar>, div);
});