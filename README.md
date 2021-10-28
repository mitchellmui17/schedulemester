# schedulemester

# Unit Testing 

This project uses Jest and React-Testing-Library for unit testing. 

To run all tests in the project, use the command: 

```npm test```

To create a test file, the name **MUST** end in ```test.js```. 

## Writing Tests (Functions)
For example, there is a file called ```sum.js``` that contains a function to add two numbers together: 
```
function sum(a, b) {
    return a + b;
}
```
To create a test for this function, first export it using ```module.exports = functionName``` where ```functionName``` is ```sum``` in this case.

To create a test for this file, name the script ```fileName.test.js``` where ```fileName``` is ```sum``` in this example. 

When writing the actual test, there are a variety of options that you can use depending on what exactly you are testing. For this sum function, we want to see that it correctly adds two numbers together. Here, we will test the function, where we ```expect``` that the sum of 1 and 2 ```toBe``` 3.
```
test('sum test', () => {
        expect(sum(1,2)).toBe(3); 
})
```

## Writing Tests (Components)
To write a test for a React component, the process is very similar. In this example, we will be using a Button component. 

Suppose we have the following code for a button component:
```
import React from 'react';
import './button.css';

function Button({label}) {
    return <div data-testid='button' className = 'button-style'> {label} </div>
}

export default Button;
```
#### Note: use ```data-testid``` to distinguish from testing identifiers and actual project IDs

For an example test to see if the component actually renders without crashing: 
```
import React from 'react';
import ReactDOM from 'react-dom';
import Button from './../button';

it('renders without crashing', () => {
    const div = document.createElement("div");
    ReactDOM.render(<Button></Button>, div);
});
```

To see if it renders correctly, use React-Testing-Library and Jest:
```
import {render} from '@testing-library/react';
import 'jest-dom/extend-expect';

it("renders button correctly", () => {
	const {getByTestId} = render(<Button label="text"></Button>)
	expect(getByTestId('button')).toHaveTextContent("text")
})
```
For this example, we are seeing if the button has text and renders correctly. 

## Additional Information

Use ```describe``` to organize your testing and group them properly, while using ```it``` to test individual things inside that group. ```test``` and ```it``` functions the same as well.

Example: 
```
describe('Rectangle class', () => {
  describe('area is calculated when', () => {
    it('sets the width', () => { ... })
    it('sets the height', () => { ... })
  })
})
```

By default, the package.json is set so whenever ```npm test``` is run, Jest will develop the code coverage metrics. If you do not want to see this everytime, remove ```--coverage``` from ```"test": "jest --coverage"```




