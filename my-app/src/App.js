import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState} from "react";
import { CompactPicker   } from 'react-color'

import {Player} from './Player.js'

import './App.css';
var color_temp=0;

var playerList=new Array();
var playerNumber = 0;
var playerPointer = -1;


// class Player 
//     {
//         constructor(playerNum, name, score, color, state,checkstate) 
//         {
//             this.playerNum = playerNum;
//             this.name = name;
//             this.score = score;
//             this.color = color;
//             this.state = state;
//             this.checkstate = checkstate;
//             this.scoreColor = "green";
//         }
//     }

var ReadyFramerOpacity=1;
var lastNumberIndicator = 1;

function App() {
  const [components, setComponents] = useState([]);
  const [player_components, setplayer_componentss] = useState([]);
  
  const [indicator_y, setindicator_y] = useState(0);
  const [indicator_x, setindicator_x] = useState(0);
  const [jackPotVal, setJackPotVal] = useState(0);  //Define jackPot initial Value
  const [numberIndicator, setNumberIndicator] = useState(0);  //Define numberIndicator initial Value
  const [needRender, setNeedRender] = useState(0);  //Define needRender initial Value

  // const count = useMotionValue(0);
  // const rounded = useTransform(count, Math.round);
  const numberIndicator_count = useMotionValue(0);
  const numberIndicator_rounded = useTransform(numberIndicator_count, Math.round);

  const jackpot_count = useMotionValue(0);
  const jackpot_rounded = useTransform(jackpot_count, Math.round);

  const color_count = useMotionValue("#cccccc");


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
    color_temp = hex.hex;
    console.log(hex);
    setNeedRender(needRender+1);
  }
  // const handleColorChange = ({ hex }) => console.log(hex)


  function addPlayerACtion()
  {
    if(playerNumber > 7)
    {
      errorHandle("最大游戏人数8人");
      return;
    }

    let namevalue = document.getElementById("name").value ;
    let temp_color = document.getElementById("playerAttributesCollecter").style.backgroundColor;
    document.getElementById("name").value = null;           
    color_temp = "#ffffff";
    setNeedRender(needRender+1);

    if(namevalue!= null)
    {
      playerList[playerNumber] = new Player(playerNumber,namevalue,temp_color);
    }
    console.log("add player: " + playerList[playerNumber].color);
    
    playerNumber++;
    addComponent(namevalue,temp_color);
  }

  function nextPlayer()
  {
    // 玩家指针指向下一个玩家
    if(playerPointer+1<playerNumber)
      playerPointer++;
    else
      playerPointer=0;
    
    console.log("playerPointer = "+playerPointer);

    setindicator_y(10+playerPointer*50);
    document.getElementById("totalFrame").style.backgroundColor = playerList[playerPointer].color;
  }

  function startGameAction()
  {
    if(playerNumber<2)
    {
      errorHandle("需要游戏人数大于2人才可开始游戏！");
      return;
    }

    console.log("game start");
    console.log(playerList);

    ReadyFramerOpacity = 0;
    setNeedRender(needRender+1);
    setTimeout(()=>{document.getElementById("readyFrame").style.display="none";},500);
    
    for(let i=0;i<(playerNumber);i++)
    {
      setTimeout(() => {
        console.log(player_components);
        setplayer_componentss(prev => [...prev,  <PlayerRankInfo player={playerList[i]} score={playerList[i].score} name={playerList[i].name} color={playerList[i].color} key={i} />]);
      }, 100*i);
    }

    nextPlayer();
    
  }

  function errorHandle(errorInfo)
  {
    alert(errorInfo);
  }

  function betAction()
  {
    console.log(" bet ");
    if(numberIndicator<lastNumberIndicator)
    {
      errorHandle("请输入大于"+lastNumberIndicator+"的值")
      return;
    }
      
    lastNumberIndicator = numberIndicator;
    setJackPotVal(jackPotVal+numberIndicator);
    
    nextPlayer();
  }

  // ------
  
  useEffect(() => { // 上部分右下角 数值指示器动画效果
    const animation = animate(numberIndicator_count, numberIndicator, { duration: 0.25 });
    
    return animation.stop;
  }, [numberIndicator]);

  useEffect(() => { // 奖池动画效果
    const animation = animate(jackpot_count, jackPotVal, { duration: 0.25 });
    
    return animation.stop;
  }, [jackPotVal]);

  useEffect(() => {
    const animation = animate(color_count, color_temp, { duration: 0.5 });

    return animation.stop;
  }, [needRender]);

  useEffect(() => { // player组件动画
    console.log('components updated:', player_components);
  }, [player_components]);

  //====================================================================
  return (
    <div id="totalFrame">

      <motion.div id="readyFrame" animate={{opacity:ReadyFramerOpacity}}>
        <div id="readyPlayerList">
          {components}  {/* 添加玩家显示组件 */}
        </div>

        <motion.div id="playerAttributesCollecter" style={{backgroundColor:color_count}}>
          <div id="readybutton">  
            <div id="addPlayerButton">  {/* 添加玩家按钮 */}
              <button onClick={addPlayerACtion}>ADD player</button>
            </div>
            <div id="startGameButton">  {/* 开始游戏按钮 */}
              <button onClick={startGameAction}>Start game</button>
            </div>

            <div id="inputName">        {/* 昵称采集输入框 */}
              <input type="text" id="name" name="name" placeholder="请输入昵称" required minLength="2" maxLength="16" size="10" />
            </div>
          </div>  
          
          <div id="colorSelecter">      {/* 颜色选择框 */}
            <CompactPicker 
              color="#333"
              onChangeComplete={ handleColorChange }
            />
          </div>
        </motion.div>
      </motion.div> {/* readyFrame */}

      <div id="gameFrame">

        <div id="up">
          <div    id="rank_bar">    {/* 玩家分数排行榜 */}
            <div>{player_components}</div>
          </div> {/* rank_bar */}  
          <motion.div id="Jackpot">{jackpot_rounded}</motion.div>  {/* 奖池大数字显示 */}
          <div    id="value_bar">
            <motion.div id="Numerical_indicator">{numberIndicator_rounded}</motion.div> {/* 数字指示器 */}
          </div> {/* value_bar */}  
        </div> {/* up */}
        
        <div id="down">
          <div id="history_bar"></div>

          <div id="number_bar">
            <div>
              <motion.div className="number_button" onClick={() => numberPress(7)} whileTap={{scale:0.9, backgroundColor:"rgb(175,175,175)"}} whileHover={{scale:1.1}} >7</motion.div>
              <motion.div className="number_button" onClick={() => numberPress(8)} whileTap={{scale:0.9, backgroundColor:"rgb(175,175,175)"}} whileHover={{scale:1.1}} >8</motion.div>
              <motion.div className="number_button" onClick={() => numberPress(9)} whileTap={{scale:0.9, backgroundColor:"rgb(175,175,175)"}} whileHover={{scale:1.1}} >9</motion.div>
            </div>
            <div>
              <motion.div className="number_button" onClick={() => numberPress(4)} whileTap={{scale:0.9, backgroundColor:"rgb(175,175,175)"}} whileHover={{scale:1.1}} >4</motion.div>
              <motion.div className="number_button" onClick={() => numberPress(5)} whileTap={{scale:0.9, backgroundColor:"rgb(175,175,175)"}} whileHover={{scale:1.1}} >5</motion.div>
              <motion.div className="number_button" onClick={() => numberPress(6)} whileTap={{scale:0.9, backgroundColor:"rgb(175,175,175)"}} whileHover={{scale:1.1}} >6</motion.div>
            </div>
            <div>
              <motion.div className="number_button" onClick={() => numberPress(1)} whileTap={{scale:0.9, backgroundColor:"rgb(175,175,175)"}} whileHover={{scale:1.1}} >1</motion.div>
              <motion.div className="number_button" onClick={() => numberPress(2)} whileTap={{scale:0.9, backgroundColor:"rgb(175,175,175)"}} whileHover={{scale:1.1}} >2</motion.div>
              <motion.div className="number_button" onClick={() => numberPress(3)} whileTap={{scale:0.9, backgroundColor:"rgb(175,175,175)"}} whileHover={{scale:1.1}} >3</motion.div>
            </div>
            <div>
              <motion.div className="number_button" onClick={() => numberPress(-2)} whileTap={{scale:0.9, backgroundColor:"rgb(175,175,175)"}} whileHover={{scale:1.1}} >EC</motion.div>
              <motion.div className="number_button" onClick={() => numberPress(0)}  whileTap={{scale:0.9, backgroundColor:"rgb(175,175,175)"}} whileHover={{scale:1.1}} >0</motion.div>
              <motion.div className="number_button" onClick={() => numberPress(-1)} whileTap={{scale:0.9, backgroundColor:"rgb(175,175,175)"}} whileHover={{scale:1.1}} >←</motion.div>
            </div>
          </div>

          <div id="action_bar">
            <motion.div className="action_button" onClick={() => betAction()} whileTap={{scale:0.9, backgroundColor:"rgb(0,0,0)"}} >Bet</motion.div>
            <motion.div className="action_button" whileTap={{scale:0.9, backgroundColor:"rgb(0,0,0)"}} whileHover={{backgroundColor:"rgb(175,175,175)"}}>Blind</motion.div>
            <motion.div className="action_button" whileTap={{scale:0.9, backgroundColor:"rgb(0,0,0)"}} whileHover={{backgroundColor:"rgb(175,175,175)"}}>Fight</motion.div>
            <motion.div className="action_button" whileTap={{scale:0.9, backgroundColor:"rgb(0,0,0)"}} whileHover={{backgroundColor:"rgb(175,175,175)"}}>Fold</motion.div>
          </div>
        </div>  {/* down */}
        

      </div>  {/* gameFrame */}

      <motion.div id="indicatorDiv" animate={{y:indicator_y}}>  {/* 紫色玩家行动指示器 */}
        <motion.div  id="indicator" animate={{rotate:[90,180,270,360]}} transition={{repeat:Infinity,duration:1.5}}></motion.div>
      </motion.div>
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

const PlayerRankInfo = (props) => {
  let temperoColor = props.color;
  let player = props.player;

  return(
    <motion.div id="playerInfoinRank" transition={{duration:0.5,type:"spring"}} initial={{x:100,opacity:0}} animate={{x:0,opacity:1}}>
      <motion.div id="playerScoreinRank" animate={{x:0,opacity:1, backgroundColor:temperoColor}}> {props.score} </motion.div>
      <div style={{float:"left",width:"15px"}}> - </div>
      <div style={{float:"left",textAlign:"left"}}>{props.name}</div>
    </motion.div>
  );
}


export default App;
