import {render} from '@testing-library/react';
import MyCalendar from "../MyCalendar";
import { formatDate, Event_List, closeModal, openModal, updateEventModal, getEventData, getCourseID, printOptions, getTasksData, handleSubmitEvent, handleSubmitTask} from '../MyCalendar';

let events = [{
    Title: "Test Title 1",
    Description: "Test Description 1",
    Start: "2021-12-06T00:00",
    End: "2021-12-06T02:00",
    Priority: "1",
    Progress: "1"
}, {Title: "Test Title 2",
    Description: "Test Description 2",
    Start: "2021-12-07T00:00",
    End: "2021-12-07T02:00",
    Priority: "0",
    Progress: "0"
}, {Title: "Test Title 3",
    Description: "Test Description 3",
    Start: "2021-12-08T00:00",
    End: "2021-12-08T02:00",
    Priority: "1",
    Progress: "1"}]

describe("courses should show", () => {
    it("renders correctly", () => {
        const root = document.createElement("tbody");
        render(Event_List(courses), root);
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


describe("test for updateModal()", () => {
    document.body.innerHTML = "<div id = 'modal-title'>test</div>"
    + '<div id = "modal-description">test</div>'
    + '<div id = "modal-date">test</div>'
    let title = document.getElementById('modal-title');
    let desc = document.getElementById('modal-description');
    let start = document.getElementById('modal-date');
    let end = document.getElementById('modal-date');

    test("the modal title is updated correctly ", () => {
        updateEventModal(events[0], [title, desc, start, end])
        expect(title.innerHTML).toBe("Test Title 1 (Test Course 1)")
    })
    test("the modal title is updated correctly ", () => {
        updateEventModal(events[0], [title, desc, start, end])
        expect(desc.innerHTML).toBe("Test Description 1")
    })
    test("the modal title is updated correctly ", () => {
        updateEventModal(events[0], [title, desc, start, end])
        expect(start.innerHTML).toBe("2021-12-10T02:00")
    })
    test("the modal title is updated correctly ", () => {
        updateEventModal(events[0], [title, desc, start, end])
        expect(end.innerHTML).toBe("2021-12-10T02:00")
    })
})