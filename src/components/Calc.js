import React, { useState ,useEffect} from 'react';
import { MathOperation, operationTypes } from './MathOperation';
import DigitButton from './DigitButton';

/**
 * A basic switch calcuation function
 * @param {*} operation The name or type of the operation used, for ex. : "sqrt" / "+"
 * @param {*} num1 The first num to use in the calculation
 * @param {*} num2 The second num to use in the calculation
 */
function calculate(operation, num1, num2 = 0) {
  // eslint-disable-next-line default-case
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
      return Math.pow(num1,2);
    case 'sqrt':
      return Math.sqrt(num1);
  }
}

function Calc() {
const [ display, setDisplay ] = useState(0);
const [ firstNumber, setFirstNumber] = useState(null);
const [ secondNumber, setSecondNumber] = useState(null);
const [ operation, setOperation] = useState(null);
const [result, setResult] = useState(null);
useEffect(() => {
  if(result){
    setDisplay(result);
    return;

  }
  if(firstNumber){
    if(operation){
      if(secondNumber){
        setDisplay(secondNumber)
      }else{
        setDisplay(operation)
      }
    }else{
      setDisplay(firstNumber)
    }

  }else{
    setDisplay(0)
  }
}, [result,firstNumber, operation, secondNumber])


  console.table({firstNumber,operation,secondNumber,result,display})
// // handlers//
  const handleDigitClick = (number) => {
    if(!operation){
      setFirstNumber(prev => {
        if(prev){
          let answer = number === "." ? prev.toString() +'.': Number(prev.toString() + number.toString());
          return answer;
        }
        return number;
      })
    }else{
      setSecondNumber(prev => {
        if(prev){
          let answer = number === "." ? prev.toString() +'.': Number(prev.toString() + number.toString());
          return answer;
        }
        return number;
      })
    }
  }
  const handleOperationClick = (value) => {
    if(operation && firstNumber && secondNumber){
        setFirstNumber(calculate(operation,firstNumber, secondNumber));
        setSecondNumber(null);
    }
    let result;
    switch (value) {
      case 'AC':
        setFirstNumber(null);
        setSecondNumber(null);
        setOperation(null);
        setResult(null);
        setDisplay(0);
        break;
      case 'x²':
        result = calculate("x²", firstNumber);
        setResult(result);
        setFirstNumber(result)
        setOperation(null)
        break;
      case '√':
        result = calculate("sqrt",firstNumber, secondNumber);
        setResult(result);
        setFirstNumber(result)
        setOperation(null)
        break;
      default:
        setOperation(value)
        break;
    }
  }
  const handleEqualClick = () => {
    console.log('===========================')
    if(operation==='/' && secondNumber===0){
      return setResult('Error')
    }
    const result =calculate(operation,firstNumber, secondNumber);
    setResult(result);
    setFirstNumber(result);
    setOperation(null);
    setSecondNumber(null);
  }
  return (
    <div className='calculator'>
      <div className='result'>
        {display}
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
          <MathOperation type="equal" onClick={handleEqualClick}/>
          <DigitButton value={'.'} onClick={()=>handleDigitClick('.')}/>
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
