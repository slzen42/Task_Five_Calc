import React, { useState, useEffect, useRef } from 'react';
import Button from './components/Button';
import Display from './components/Display';
import './App.css';

const App = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const calculatorRef = useRef(null);

  const handleButtonClick = (value) => {
    if (value === '=') {
      try {
        setOutput(eval(input).toString()); // Note: using eval can be risky in production
      } catch (e) {
        setOutput('Error');
      }
      setInput('');
    } else if (value === 'C') {
      setInput('');
      setOutput('');
    } else {
      setInput(input + value);
    }
  };

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const xOffset = (clientX / innerWidth) - 0.5;
    const yOffset = (clientY / innerHeight) - 0.5;

    if (calculatorRef.current) {
      calculatorRef.current.style.transform = `rotateX(${yOffset * 30}deg) rotateY(${xOffset * 30}deg)`;
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="app">
      <div className="calculator-container">
        <div className="calculator" ref={calculatorRef}>
          <div className="calculator-title">Soumyadeep's Calculator Webapp</div>
          <Display value={input || output} />
          <div className="buttons">
            <Button value="C" onClick={handleButtonClick} />
            <Button value="/" onClick={handleButtonClick} />
            <Button value="*" onClick={handleButtonClick} />
            <Button value="-" onClick={handleButtonClick} />
            <Button value="7" onClick={handleButtonClick} />
            <Button value="8" onClick={handleButtonClick} />
            <Button value="9" onClick={handleButtonClick} />
            <Button value="+" onClick={handleButtonClick} />
            <Button value="4" onClick={handleButtonClick} />
            <Button value="5" onClick={handleButtonClick} />
            <Button value="6" onClick={handleButtonClick} />
            <Button value="1" onClick={handleButtonClick} />
            <Button value="2" onClick={handleButtonClick} />
            <Button value="3" onClick={handleButtonClick} />
            <Button value="0" onClick={handleButtonClick} />
            <Button value="." onClick={handleButtonClick} />
            <Button value="=" onClick={handleButtonClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

