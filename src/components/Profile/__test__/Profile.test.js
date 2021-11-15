import {render, screen, fireEvent} from '@testing-library/react';
import React, { createElement } from 'react';
import Profile from '../Profile';
import { closeModal } from '../Profile';
import { openModal } from '../Profile';
import ReactDOM from 'react-dom';

//import Fire from '../../../firebase'


const testEmail = 'test@gmail.com'


describe("tests span click functionality", () => {
    document.body.innerHTML = '<span id = "span"> </span>'
    const span = document.getElementById('span')
    document.body.innerHTML = '<div id = "modal"> </div>'
    const modal = document.getElementById('modal');
    test("span onclick functionality", () => {
        const openModal = jest.fn()
        span.onclick = openModal(modal)
        span.click()
        expect(openModal).toHaveBeenCalled()
    }) 
})


describe("tests modal functionality", () => {
    document.body.innerHTML = '<div id = "modal"> </div>'
    const modal = document.getElementById('modal');

    test("tests if modal shows properly", () => {
        modal.style.display = 'none';
        openModal(modal);
        expect(modal.style.display).toBe("block");
    })

    test("tests if modal closes properly", () => {
        modal.style.display = 'block';
        closeModal(modal);
        expect(modal.style.display).toBe("none");
    })
});

describe("Tests for Frontend", () =>{
    test("renders without crashing", () =>{
        const root = document.createElement("div");
        render(Profile, root);
    })
})





