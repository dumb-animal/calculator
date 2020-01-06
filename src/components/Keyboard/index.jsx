import React from 'react';

const Keyboard = (props) => {
  const {
    operation,
    numberKeyHandler,
    operationKeyHandler,
    serviceKeyHandler,
    calculate
  } = props;

  return (
    <div className='Keyboard'>
      <button name="c" className="key service-key" onClick = {serviceKeyHandler}>AC</button>
      <button name="s" className="key service-key" onClick = {serviceKeyHandler}>+/-</button>
      <button name="%" className="key service-key" onClick = {serviceKeyHandler}>%</button>
      <button name="/" className={`key operation-key ${operation === "/"? "active": ""}`} onClick = {operationKeyHandler}>÷</button>
      
      <button name="7" className="key" onClick = {numberKeyHandler}>7</button>
      <button name="8" className="key" onClick = {numberKeyHandler}>8</button>
      <button name="9" className="key" onClick = {numberKeyHandler}>9</button>
      <button name="*" className={`key operation-key ${operation === "*"? "active": ""}`} onClick = {operationKeyHandler}>×</button>

      <button name="4" className="key" onClick = {numberKeyHandler}>4</button>
      <button name="5" className="key" onClick = {numberKeyHandler}>5</button>
      <button name="6" className="key" onClick = {numberKeyHandler}>6</button>
      <button name="-" className={`key operation-key ${operation === "-"? "active": ""}`} onClick = {operationKeyHandler}>-</button>

      <button name="1" className="key" onClick = {numberKeyHandler}>1</button>
      <button name="2" className="key" onClick = {numberKeyHandler}>2</button>
      <button name="3" className="key" onClick = {numberKeyHandler}>3</button>
      <button name="+" className={`key operation-key ${operation === "+"? "active": ""}`} onClick = {operationKeyHandler}>+</button>

      <button name="0" className="key long-key" onClick = {numberKeyHandler}>0</button>
      <button name="." className="key" onClick = {numberKeyHandler}>.</button>
      <button name="=" className="key operation-key" onClick = {calculate}>=</button>
    </div >
  );
}

export default Keyboard;