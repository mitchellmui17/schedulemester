import React, { createElement } from 'react';
import Profile from './../Profile'
import { closeModal } from './../Profile'
import { openModal } from './../Profile'
import {username} from "./../Profile"
import {major} from "./../Profile"
import {semester} from "./../Profile"
import {TASKS} from "./../Profile"
import {DATA} from './../Profile'


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
})

describe("tests modal functionality", () => {
    document.body.innerHTML = '<div id = "modal"> </div>'
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    test("tests if modal shows properly", () => {
        openModal(modal);
        expect(modal.style.display).toBe("block");
    })

    test("tests if modal shows properly", () => {
        closeModal(modal);
        expect(modal.style.display).toBe("none");
    })
});

/*
it('renders without crashing', () => {
    const div = document.createElement("div");
    ReactDOM.render(<Button></Button>, div);
});

it("renders button correctly", () => {
	const {getByTestId} = render(<Button label="text"></Button>)
	expect(getByTestId('button')).toHaveTextContent("text")
})
*/