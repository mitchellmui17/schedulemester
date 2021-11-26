import {render, screen, fireEvent} from '@testing-library/react';
import React from 'react';
import Login from '../Login';
import ReactDOM from 'react-dom';

const testEmail = 'test@gmail.com';//Test account
const password = 'test123';//Correct password for the account

const testEmail2 = 'test2@gmail.com';//Does not exit
const password2 = 'test111';//Wrong password

describe("Tests for Frontend", () =>{
    test("renders without crashing", () =>{
        const root = document.createElement("div");
        render(Login, root);
    })
})

describe("Test for Login", () =>{
    it("Login success", async ()=>{
        const db = firebase.initialzeTestApp({projectId: scheduleMester}).firestore();
        await firebase.assertSucceeds(login(testEmail,password));
    });
    it("wrong password", async ()=>{
        const db = firebase.initialzeTestApp({projectId: scheduleMester}).firestore();
        await firebase.assertFails(login(testEmail,password2));
    });
    it("Login failed", async ()=>{
        const db = firebase.initialzeTestApp({projectId: scheduleMester}).firestore();
        await firebase.assertFails(login(testEmail2,password));
    });
})