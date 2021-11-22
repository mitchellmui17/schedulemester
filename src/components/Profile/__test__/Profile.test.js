import {render, screen, fireEvent} from '@testing-library/react';
import React, { createElement } from 'react';
import Profile from '../Profile';
import { closeModal, openModal,  evaluatePriority, updateModal, showTasks, getTasksByHighestPriority } from '../Profile';
import ReactDOM from 'react-dom';

//import Fire from '../../../firebase'

const testEmail = 'test@gmail.com'

let tasks = [{
    Title: "Test Title 1",
    Description: "Test Description 1",
    Date: "Test Date 1",
    Priority: 1
}, {Title: "Test Title 2",
    Description: "Test Description 2",
    Date: "Test Date 2",
    Priority: 2
}, {Title: "Test Title 3",
    Description: "Test Description 3",
    Date: "Test Date 3",
    Priority: 0}]

describe("test for updateModal()", () => {
    document.body.innerHTML = "<div id = 'modal-title'>test</div>"
    + '<div id = "modal-description">test</div>'
    + '<div id = "modal-date">test</div>'
    let title = document.getElementById('modal-title');
    let desc = document.getElementById('modal-description');
    let date = document.getElementById('modal-date');
    test("the modal title is updated correctly ", () => {
        updateModal(tasks[0], title, desc, date)
        expect(title.innerHTML).toBe("Test Title 1")
    })
    test("the modal title is updated correctly ", () => {
        updateModal(tasks[0], title, desc, date)
        expect(desc.innerHTML).toBe("Test Description 1")
    })
    test("the modal title is updated correctly ", () => {
        updateModal(tasks[0], title, desc, date)
        expect(date.innerHTML).toBe("Deadline: Test Date 1")
    })

})

describe("tests sort function", () => {
    let arr = getTasksByHighestPriority(tasks)
    it("should have highest priority as the first element", () => {
        expect(arr[0].Priority).toBe(2)
    }) 
    it("should have lowest priority as the last element", () => {
        expect(arr[2].Priority).toBe(0)
    })
})

describe("tasks should show", () => {
    it("renders correctly", () => {
        const root = document.createElement("tbody");
        render(showTasks(tasks), root);
    })
})

describe("tests priority evaluation", () => {
    it("should return 'priorityLow", () => {
        expect(evaluatePriority(0)).toBe("priorityLow")
    }) 
    it("should return 'priorityMid", () => {
        expect(evaluatePriority(1)).toBe("priorityMid")
    }) 
    it("should return 'priorityHigh", () => {
        expect(evaluatePriority(2)).toBe("priorityHigh")
    }) 
}) 

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
        openModal('modal');
        expect(modal.style.display).toBe("block");
    })

    test("tests if modal closes properly", () => {
        modal.style.display = 'block';
        closeModal('modal');
        expect(modal.style.display).toBe("none");
    })
});

describe("Tests for Frontend", () =>{
    test("renders without crashing", () =>{
        const root = document.createElement("div");
        render(Profile, root);
    })
})





