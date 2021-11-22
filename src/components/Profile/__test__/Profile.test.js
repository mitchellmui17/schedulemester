import {render, screen, fireEvent} from '@testing-library/react';
import React, { createElement } from 'react';
import Profile from '../Profile';
import { closeModal, openModal,  evaluatePriority, updateModal, showTasks } from '../Profile';
import ReactDOM from 'react-dom';

//import Fire from '../../../firebase'

const testEmail = 'test@gmail.com'

const task = {
    Title: "Test Title",
    Description: "Test Description",
    Date: "Test Date",
    Priority: 1
}

describe("test for updateModal()", () => {
    document.body.innerHTML = '<div id = "modal-title">test</div>'
    let title = document.getElementById("modal-title");
    test("updateModal() ", () => {
        updateModal(title, task)
        expect(openModal).toHaveBeenCalledOnce()
    })
})

describe("tasks should show", () => {
    it("renders correctly", () => {
        const root = document.createElement("tbody");
        render(showTasks(task), root);
    })
})

/*
describe("modal should update data fields", () => {
    document.body.innerHTML = 
        '<span id = "modal-title"> </span>' + 
        '<span id = "modal-date"> </span>' + 
        '<p id = "modal-description"> </p>' 
    let index = 0
    let task = {
        Title: "Test Title",
        Description: "Test Description",
        Date: "Test Date"
    }
    let tasks = [task]
    
    it("should change content of modal title", () => {
        const title = document.getElementById('modal-title')
        const desc = document.getElementById('modal-description')
        const date = document.getElementById('modal-date')
        updateModal(task)
        expect(title.innerHTML).toBe("Test Title")
    })
    /*
    it("should change content of modal description", () => {
        expect(desc.innerHTML).toBe("Test Description")
    })
    it("should change content of modal date", () => {
        expect(date.innerHTML).toBe("Test Date")
    })
}) */

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





