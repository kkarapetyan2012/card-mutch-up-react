import React, { useState, useEffect } from 'react';
import Box from './components/Box/Box';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {

  const [boxes, setBoxes] = useState([]);
  const [open, setOpen] = useState({});
  const [hidden, setHidden] = useState({});
  const [first, setFirst] = useState({first: false, index: false});
  const [notClickable, setNotClickable] = useState(false);
  const [count, setCount] = useState({steps: 0, trueSteps: 0});

  const handleClick = (index, el) => {   
    if(!first.first) {
      console.log("first");
      setFirst({first: el, index: index});
      setOpen({...open, [index]: true});
    }
    else if (first.first === el && first.index !== index) {
      setNotClickable(true)
      setCount({...count, steps: count.steps + 1, trueSteps: count.trueSteps + 1});
      setOpen({ ...open, [index]: true, [first.index]: true});
      setTimeout(() => {
        if(count.trueSteps === 7) {
          alert(`Congratulations you WON! Used steps: ${count.steps + 1}`);
        }
        setHidden({...hidden, [index]: true, [first.index]: true})
        setNotClickable(false)
      }, 600)
      setFirst({first: false, index: false});
      console.log("same");   
    }
    else if(first.index !== index) {
        setNotClickable(true);
        setOpen({ ...open, [index]: true});
        setTimeout(() => {
          setOpen({ ...open, [first.index]: false, [index]: false});
          setNotClickable(false);
        }, 600);
        setFirst({first: false, index: false});
        setCount({...count, steps: count.steps + 1});
        console.log("different");
    }
  };

  const duplicateCard = (card) => {
    return card.reduce((preValue, current) => {
      return preValue.concat([current, current])
    },[]);
  };

  const shuffleArray = (arr = []) => {
    return arr.sort(() => Math.random() - 0.5);
  };
  
  let bigArr = shuffleArray(duplicateCard([1,2,3,4,5,6,7,8]));

  useEffect(() => {
    setBoxes(bigArr);
  }, []);

  const reset = () => {
    window.location.reload();
  };
  console.log("RENDER");

  return (
    <div className="app">
     <div className="container">
       <div className="row">
          <div className="col-lg-12 col-md-12 col-cm-12 col-12">
            <div>Step: { count.steps }</div>
            <div className={`wrap ${Math.sqrt(boxes.length)}`}>
              {boxes && boxes.map((el, index) => <Box
                key={index}
                id={el}
                open={open[index]}
                hidden={hidden[index]}
                onClick={() => notClickable ? {} : handleClick(index, el)}
              />)}
            </div>
            <button onClick={reset}>Reset</button>
          </div>
        </div>
       </div>
     </div>
     
  );
}

export default App;

