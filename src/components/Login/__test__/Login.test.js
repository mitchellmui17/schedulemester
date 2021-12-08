import {render} from '@testing-library/react';
import Login from '../Login.js';



describe("Tests for Frontend", () =>{
    test("renders without crashing", () =>{
        const root = document.createElement("div");
        render(Login, root);
    })
})