import {render, screen, fireEvent} from '@testing-library/react';
import toBeDisabled from '@testing-library/jest-dom'
import React from 'react';
import SignUp from "../SignUp.js";
import ReactDOM from 'react-dom';

jest.mock('../SignUp', () =>{
    const signup = 'placeholder';
})

describe("Tests for Frontend", () =>{
    test("renders without crashing", () =>{
        const root = document.createElement("div");
        render(SignUp, root);
        
    })

})
