import {render, screen, cleanup} from '@testing-library/react';
import React from 'react';
import {SignUpButton} from "../SignUp.js";
import 'regenerator-runtime/runtime'
import "@testing-library/jest-dom/extend-expect";



describe("Test for SignUp", ()=>{
    afterEach(cleanup);
    test("button render", ()=> {
        render(<SignUpButton/>)
        expect(screen.getByTestId('btn-test')).toHaveTextContent('Sign Up');

    });

})