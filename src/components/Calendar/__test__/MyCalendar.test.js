import {render, screen, fireEvent} from '@testing-library/react';
import MyCalendar from "../MyCalendar";


jest.mock('../Mycalendar', () =>{
    const MyCalendar = 'placeholder';
})

describe("Tests for Frontend", () =>{
    test("renders without crashing", () =>{
        const root = document.createElement("div");
        render(MyCalendar, root);
        
    })

})
