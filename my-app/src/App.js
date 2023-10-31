import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState} from "react";
import { CompactPicker   } from 'react-color'

import './App.css';
var color_temp=0;

function App() {
  const [jackPotVal, setJackPotVal] = useState(0);  //Define jackPot initial Value
  const [numberIndicator, setNumberIndicator] = useState(0);  //Define numberIndicator initial Value
  const [needRender, setNeedRender] = useState(0);  //Define needRender initial Value

  // const count = useMotionValue(0);
  // const rounded = useTransform(count, Math.round);
  const numberIndicator_count = useMotionValue(0);
  const numberIndicator_rounded = useTransform(numberIndicator_count, Math.round);

  const color_count = useMotionValue(0);

  
  function numberPress(number)
  {
    if(number == -1) 
      setNumberIndicator(parseInt(numberIndicator/10));
    else if(number == -2)
      setNumberIndicator(0);
    else
      setNumberIndicator(numberIndicator*10+number);
    console.log("numberPress numberIndicator = "+numberIndicator);
    console.log(color_count);
  }

  function handleColorChange(hex)
  {
    //document.getElementById("playerAttributes").style.backgroundColor = hex.hex;
    color_temp = hex.hex;
    console.log(hex);
    setNeedRender(needRender+1);
  }
  // const handleColorChange = ({ hex }) => console.log(hex)

  useEffect(() => {
    const animation = animate(numberIndicator_count, numberIndicator, { duration: 0.25 });
    
    console.log("useEffect is running !!");
    return animation.stop;
  }, [numberIndicator]);

  useEffect(() => {
    const animation = animate(color_count, color_temp, { duration: 0.5 });
    console.log("useEffect is running22222 !!");
    return animation.stop;
  }, [needRender]);

  //====================================================================
  return (
    <div id="totalFrame">
      <div id="readyFrame">
        <div id="readyPlayerList"></div>
        <motion.div id="playerAttributes" style={{backgroundColor:color_count}}>
          <div id="inputName">
          <input type="text" id="name" name="name" required minLength="2" maxLength="16" size="10" />
          </div>
          <div id="colorSelecter">
            <CompactPicker 
              color="#333"
              onChangeComplete={ handleColorChange }
            />
          </div>
        </motion.div>
      </div>

      <div id="gameFrame">
        <div id="up">
          <motion.div id="Jackpot">{jackPotVal}</motion.div>
          <div id="rank_bar"></div>
          <div id="value_bar">
            <motion.div id="Numerical_indicator">{numberIndicator_rounded}</motion.div>
          </div>
        </div> {/* up */}
        
        <div id="down">
          <div id="history_bar"></div>
          <div id="number_bar">
            <div>
              <motion.div className="number_button" onClick={() => numberPress(7)} whileTap={{scale:0.9}} whileHover={{scale:1.1}} >7</motion.div>
              <motion.div className="number_button" onClick={() => numberPress(8)} whileTap={{scale:0.9}} whileHover={{scale:1.1}} >8</motion.div>
              <motion.div className="number_button" onClick={() => numberPress(9)} whileTap={{scale:0.9}} whileHover={{scale:1.1}} >9</motion.div>
            </div>
            <div>
              <motion.div className="number_button" onClick={() => numberPress(4)} whileTap={{scale:0.9}} whileHover={{scale:1.1}} >4</motion.div>
              <motion.div className="number_button" onClick={() => numberPress(5)} whileTap={{scale:0.9}} whileHover={{scale:1.1}} >5</motion.div>
              <motion.div className="number_button" onClick={() => numberPress(6)} whileTap={{scale:0.9}} whileHover={{scale:1.1}} >6</motion.div>
            </div>
            <div>
              <motion.div className="number_button" onClick={() => numberPress(1)} whileTap={{scale:0.9}} whileHover={{scale:1.1}} >1</motion.div>
              <motion.div className="number_button" onClick={() => numberPress(2)} whileTap={{scale:0.9}} whileHover={{scale:1.1}} >2</motion.div>
              <motion.div className="number_button" onClick={() => numberPress(3)} whileTap={{scale:0.9}} whileHover={{scale:1.1}} >3</motion.div>
            </div>
            <div>
              <motion.div className="number_button" onClick={() => numberPress(-2)} whileTap={{scale:0.9}} whileHover={{scale:1.1}} >EC</motion.div>
              <motion.div className="number_button" onClick={() => numberPress(0)}  whileTap={{scale:0.9}} whileHover={{scale:1.1}} >0</motion.div>
              <motion.div className="number_button" onClick={() => numberPress(-1)} whileTap={{scale:0.9}} whileHover={{scale:1.1}} >←</motion.div>
            </div>
            
          </div>
          <div id="action_bar">
            <motion.div className="action_button">Bet</motion.div>
            <motion.div className="action_button">Blind</motion.div>
            <motion.div className="action_button">Fight</motion.div>
            <motion.div className="action_button">Fold</motion.div>
          </div>
        </div> {/* down */}

      </div> {/* gameFrame */}


     
    </div>
  );
}

export default App;
