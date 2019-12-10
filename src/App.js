import React, { useState, useEffect } from 'react';
import Box from './components/Box/Box';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {

  const [boxes, setBoxes] = useState([]);
  const [open, setOpen] = useState({})
  const [hidden, setHidden] = useState({hidden: false})
  const [first, setFirst] = useState({first: false, index: false})
  const [count, setCount] = useState(0);


  const handleClick = (index, el) => {
    
    console.log(index, el);
    
    if(!first.first) {
      console.log("first");
      setFirst({first: el, index: index})
      setOpen({...open, [index]: true})
      return
    }
    else if (first.first === el) {
      setFirst({first: false, index: false})
      setOpen({ ...open, [index]: true, [first.index]: true})
      setHidden()
      // setTimeout(() => {
      //   setBoxes(boxes.filter(item => item !== el))
      // }, 600)
      setTimeout(() => {
        setHidden({...hidden, [index]: true, [first.index]: true})
      }, 600)
      console.log("same"); 
      return   
    }
    else {    
      setOpen({ ...open, [index]: true})
      setTimeout(() => {
        setOpen({ ...open, [index]: false})
      }, 600);
      setFirst({first: false, index: false})
      console.log("second");
    }
    setTimeout(() => {
      setOpen({...open, [first.index]: false})
    }, 600)
  }
  
  const begin = (num = 4) => {
    let arr = []
    let open = []
    for (let i = 0; i < num * num / 2; i++) {
      arr.push(i)
    }
    
    const duplicateCard = (card) => {
      return card.reduce((preValue, current, index, array) => {
        return preValue.concat([current, current])
      },[]);
    };

    const shuffleArray = (arr = []) => {
      return arr.sort(() => Math.random() - 0.5);
    }
    
    let bigArr = shuffleArray(duplicateCard([1,2,3,4,5,6,7,8]))  

    open.length = bigArr.length;
    setOpen(open)
    setBoxes(bigArr)
  }

  useEffect(() => {
    begin();
  }, []);

  const reset = () => {
    setFirst(null)
    setTimeout(() => {
      begin()
    }, 300); 
  }

  
    const f1 = (index, el) => {
      return handleClick(index, el)
    };
    const f2 = (count) => {
      return setCount(count+1)
      
    };
    console.log('count: ' + count)
  

  return (
    <div className="app">
     <div className="container">
       <div className="row">
          <div className="col-lg-12 col-md-12 col-cm-12 col-12">
            <div>Step: { count }</div>
            <div className={`wrap ${Math.sqrt(boxes.length)}`}>
              {boxes && boxes.map((el, index) => <Box
                key={index}
                id={el}
                open={open[index]}
                hidden={hidden[index]}
                count={count}
                onClick={() => {f1(index, el); f2(count)}}
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

