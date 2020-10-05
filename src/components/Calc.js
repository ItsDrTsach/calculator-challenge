import React, { useState } from 'react';
import { MathOperation, operationTypes } from './MathOperation';
import DigitButton from './DigitButton';

/**
 * A basic switch calcuation function
 * @param {*} operation The name or type of the operation used, for ex. : "sqrt" / "+"
 * @param {*} num1 The first num to use in the calculation
 * @param {*} num2 The second num to use in the calculation
 */
function calculate(operation, num1, num2 = 0) {
  switch (operation) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      return num1 / num2;
    case '%':
      return num1 % num2;
    case 'x²':
      return Math.pow(num1, num2);
    case 'sqrt':
      return Math.sqrt(num1);
  }
}

function Calc() {
  /**
   * Add (0-9) to <DigitButton /> with value and onClick function as exlplained in the requirements
   * Add the correct types to MathOperation, if you are having problem make sure its written correctly compared to operationTypes array
   * This is a state machine, you'll need to work wisely with React.js State and Lifecycle functionality
   * You can use calculate function for your aid
   */
  const [firstNum, setFirstNum ] = useState(null);
  const [secondNum, setSecondNum ] = useState(null);
  const [operation, setOperation] = useState(null)
  const [result, setResult] = useState(0)
  console.log(firstNum);
  console.log(operation);
  console.log(secondNum);
  console.log(result);
  const handleDigitClick = (value) => {
      firstNum && operation? setSecondNum(value) : setFirstNum(value)
  }
  const handleOperationClick = (value) => {
    if(value ==="="){
      if(secondNum){
        if(operation==="/" && secondNum===0){
          return console.log('cannot devide by 0')
        }
        console.table({operation,firstNum,secondNum})
        const answer = calculate(operation,firstNum,secondNum)
        setResult(answer)
      }

    }
    if(value ==="AC"){
      setFirstNum(null);
      setOperation(null);
      setSecondNum(null);
      setResult(0);
    }
    if (firstNum){
      return setOperation(value)
    }
    console.log('enter first number first')
  }
  const handleSubmit = () => {

  }
  return (
    <div className='calculator'>
      <div className='result'>
        {result}
      </div>
      <div className='calculator-digits'>
          <MathOperation type="sqrt" onClick={handleOperationClick}/>
          <MathOperation type="power" onClick={handleOperationClick}/>
          <MathOperation type="modulo" onClick={handleOperationClick}/>
          <MathOperation type="plus" onClick={handleOperationClick}/>
          <MathOperation type="minus" onClick={handleOperationClick}/>
          <MathOperation type="multi" onClick={handleOperationClick}/>
          <MathOperation type="divide" onClick={handleOperationClick}/>
          <MathOperation type="AC" onClick={handleOperationClick}/>
          <MathOperation type="equal" onClick={handleOperationClick}/>
          <MathOperation type="dot" onClick={handleOperationClick}/>
          <DigitButton value={1} onClick={()=>handleDigitClick(1)}/>
          <DigitButton value={2} onClick={()=>handleDigitClick(2)}/>
          <DigitButton value={3} onClick={()=>handleDigitClick(3)}/>
          <DigitButton value={4} onClick={()=>handleDigitClick(4)}/>
          <DigitButton value={5} onClick={()=>handleDigitClick(5)}/>
          <DigitButton value={6} onClick={()=>handleDigitClick(6)}/>
          <DigitButton value={7} onClick={()=>handleDigitClick(7)}/>
          <DigitButton value={8} onClick={()=>handleDigitClick(8)}/>
          <DigitButton value={9} onClick={()=>handleDigitClick(9)}/>
          <DigitButton value={0} onClick={()=>handleDigitClick(0)}/>
      </div>
    </div>
  );
}

export default Calc;
