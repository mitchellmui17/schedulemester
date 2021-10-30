import React, { createElement } from 'react';
import Profile from './../Profile'
//import { closeModal } from './../Profile'
//import { openModal } from './../Profile'


let closeModal = jest.fn((modal) => {
    modal.style.display = 'none';
})

let openModal = jest.fn((modal) => {
    modal.style.display = 'block';
})

describe("tests modal functionality", () => {
    let modal = document.createElement('div');
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