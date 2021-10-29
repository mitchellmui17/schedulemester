import React from 'react';
import ReactDOM from 'react-dom';
import * as pf from './../Profile';


jest.mock("./../Profile");


test("calls test", () => {
    let a = 0
    
    expect(a+1).toBe(1)
  });
  
/*
jest.mock("./../Profile");

test('calls sideEffect', () => {
    let elem = document.createElement("div")
    elem.id = "test"
    elem.style.display = "none"
    document.body.appendChild(elem)
    expect(toggleVisibility("test")).toBe(1);
    console.log(elem.style.display)


    //expect(elem.style.display).toBe("block")

    //expect(sideEffect).toHaveBeenCalledTimes(1);
    //expect(sideEffect).toHaveBeenCalledWith();
});

//toggleVisibility = jest.fn();


/*

describe("testing toggle function", () => { 
    test('element is visible', () => {
            let elem = document.createElement("div")
            elem.id = "test"
            document.body.appendChild(elem)
            toggleVisibility(elem.id)
            expect(toggleVisibility).toHaveBeenCalledTimes(1)
            /*
            elem.style.display = 'block';
            console.log(elem.style.display);
            expect(profile.toggleVisibility("test")).toBe("none");
        })
    })
*/