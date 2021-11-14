import {render, screen, fireEvent} from '@testing-library/react';
import React, { createElement } from 'react';
import Profile from '../Profile';
import { closeModal } from '../Profile';
import { openModal } from '../Profile';
//import Fire from '../../../firebase'


const testEmail = 'test@gmail.com'

describe("tests if profile details from db was received", () => {
    test("tests name property", () => {
        
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




/*
jest.mock('../Profile', () => {
    const name = "placeholder";
});
*/

/*
describe("initialize: variables are correct", () => {
    test("test username var", () => {
        expect(username).toBe("Student");
    })
    test("test major var", () => {
        expect(major).toBe("Computer Science");
    })
    test("test semester var", () => {
        expect(semester).toBe("Fall 2021");
    })
    test("test TASKS const var", () => {
        expect(TASKS).toBe(3);
    })
})*/




