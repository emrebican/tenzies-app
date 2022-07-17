import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import Die from "./Die";

function App() {

  const [numbers, setNumbers] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [timer, setTimer] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1)
      }, 200);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running])

  useEffect(() => {
    setRunning(false);
  }, [tenzies])

  // Generate Random Numbers
  function allNewDice() {
    const arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: arr.length + 1
      });
    }
    return arr;
  }

  // Roll Button create new dices
  function handleClick() {
    if (!tenzies) {
      setNumbers(numbers.map(num => {
        return num.isHeld
          ? num
          : { ...num, value: Math.ceil(Math.random() * 6) }
      }))
    } else {
      setTenzies(false);
      setNumbers(allNewDice);
      setTimer(0);
    }
    setRunning(true)
  }

  // Selected Dices (set isHeld value)
  function handleDice(id) {
    setNumbers(numbers.map(num => {
      return num.id === id
        ? { ...num, isHeld: !num.isHeld }
        : num
    }))
  }

  // Win Conditions
  useEffect(() => {
    const firstValue = numbers[0].value;
    // eslint-disable-next-line
    setTenzies(numbers.every(num => {
      if (num.isHeld && num.value === firstValue) {
        return true
      }
    }))
  }, [numbers]);

  // Mapping
  const dieElements = numbers.map(num => (
    <Die
      key={num.id}
      value={num}
      handleDice={handleDice}
    />
  ))

  return (
    <div>
      {tenzies && <Confetti className="confetti" />}
      <main>
        <h2 className="timer">
          {timer < 60
            ? `00 : ${timer % 60 < 10 ? '0' + timer % 60 : timer % 60}`
            : timer < 600
              ? `0${Math.floor(timer / 60)} : ${timer % 60 < 10 ? '0' + timer % 60 : timer % 60}`
              : `${Math.floor(timer / 60)} : ${timer % 60 < 10 ? '0' + timer % 60 : timer % 60}`
          }
        </h2>
        <div className="content">
          <h1>Tenzies</h1>
          <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <h2 className="congrat">{tenzies && 'Congratulations! You Won'}</h2>
        </div>
        <div className="container">
          {dieElements}
        </div>
        <button
          style={{ backgroundColor: tenzies && '#e91e63' }}
          className='btn'
          onClick={handleClick}
        >
          {tenzies ? 'New Game' : 'Roll'}
        </button>
      </main>
    </div>
  );
}

export default App;
