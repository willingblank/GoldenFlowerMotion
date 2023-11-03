import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState} from "react";
import { CompactPicker   } from 'react-color'

// 分页面 分模块来制作
// 利用面向对象的编程方法对程序进行设计
// 在开始设计之前整体考虑整个程序的框架

import './App.css';
var color_temp=0;

var playerList=new Array();
var playerNumber = 0;

var testtemp = 0;

class Player 
    {
        constructor(playerNum, name, score, color, state,checkstate) 
        {
            this.playerNum = playerNum;
            this.name = name;
            this.score = score;
            this.color = color;
            this.state = state;
            this.checkstate = checkstate;
        }
    }

  var ReadyFramerOpacity=1;

    

function App() {
  const [components, setComponents] = useState([]);
  const [player_components, setplayer_componentss] = useState([]);
  
  const [jackPotVal, setJackPotVal] = useState(0);  //Define jackPot initial Value
  const [numberIndicator, setNumberIndicator] = useState(0);  //Define numberIndicator initial Value
  const [needRender, setNeedRender] = useState(0);  //Define needRender initial Value

  // const count = useMotionValue(0);
  // const rounded = useTransform(count, Math.round);
  const numberIndicator_count = useMotionValue(0);
  const numberIndicator_rounded = useTransform(numberIndicator_count, Math.round);

  const color_count = useMotionValue("#cccccc");

  const addPlayerComponentss = (playerName,color,keyi) => 
  {
    console.log("addPlayerComponents is running ");
    setplayer_componentss([
      ...player_components,
      <PlayerInfo name={playerName} color={color} key={keyi} />
    ])
  }

  const addComponent = (playerName,color) => 
  {
    setComponents([
      ...components,
      <PlayerInfo name={playerName} color={color} key={components.length} />
    ])
  }




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


  function addPlayerACtion()
  {
    let namevalue = document.getElementById("name").value ;
    let temp_color = document.getElementById("playerAttributes").style.backgroundColor;
    document.getElementById("name").value = null;           
    color_temp = "#ffffff";
    setNeedRender(needRender+1);

    if(namevalue!= null)
    {
      playerList[playerNumber] = new Player(playerNumber,namevalue,0,temp_color,"idle","nocheck");
    }
    console.log("add player: " + playerList[playerNumber].color);
    
    playerNumber++;
    addComponent(namevalue,temp_color);
    //console.log(components);
    //add_div("readyPlayerList");
  }



  function startGameAction()
  {
    console.log("game start");
    console.log(playerList);

    ReadyFramerOpacity = 0;
    setNeedRender(needRender+1);
    setTimeout(()=>{document.getElementById("readyFrame").style.display="none";},500);
    
    for(let i=0;i<(playerNumber);i++)
    {
      setTimeout(() => {
        console.log(player_components);
        setplayer_componentss(prev => [...prev,  <PlayerInfo name={playerList[i].name} color={playerList[i].color} key={i} />]);
      }, 100*i);
    }


  }

  // ------
  
  useEffect(() => {
    const animation = animate(numberIndicator_count, numberIndicator, { duration: 0.25 });
    
    //console.log("useEffect is running !!");
    return animation.stop;
  }, [numberIndicator]);

  useEffect(() => {
    const animation = animate(color_count, color_temp, { duration: 0.5 });
    //console.log("useEffect is running22222 !!");
    return animation.stop;
  }, [needRender]);

  useEffect(() => {
    console.log('components updated:', player_components);
  }, [player_components]);

  //====================================================================
  return (
    <div id="totalFrame">
      <motion.div animate={{opacity:ReadyFramerOpacity}} id="readyFrame">
        <div id="readyPlayerList">
          <div style={{height:10, backgroundColor:"red", opacity:0.5}}></div>
         {components}
        </div>
        <motion.div id="playerAttributes" style={{backgroundColor:color_count}}>
          <div id="inputName">
          <input type="text" id="name" name="name" required minLength="2" maxLength="16" size="10" />
          </div>


          <div id="readybutton">
            <div id="addPlayerButton">
              <button onClick={addPlayerACtion}>ADD player</button>
            </div>

            <div id="startGameButton">
              <button onClick={startGameAction}>Start game</button>
            </div>
          </div>



          <div id="colorSelecter">
            <CompactPicker 
              color="#333"
              onChangeComplete={ handleColorChange }
            />
          </div>
        </motion.div>
      </motion.div>

      <div id="gameFrame">

        <div id="up">
          <div    id="rank_bar">
          <div>{player_components}</div>
          </div> {/* rank_bar */}  
          <motion.div id="Jackpot">{jackPotVal}</motion.div>

          

          <div    id="value_bar">
            <motion.div id="Numerical_indicator">{numberIndicator_rounded}</motion.div>
          </div> {/* value_bar */}  
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
        </div> 
        {/* down */}

      </div> {/* gameFrame */}

    </div>
  );
}

const PlayerInfo = (props) => {
  let temperoColor = props.color;
  return(
    
    <motion.div id="playerInfoinReady" transition={{duration:0.5,type:"spring"}} initial={{x:100,opacity:0}} animate={{x:0,opacity:1, backgroundColor:temperoColor}}>
      <div>{props.name}</div>
    </motion.div>
  );
}

export default App;
