import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState} from "react";
import { CompactPicker   } from 'react-color'

import { Game } from "./Game.js";
import './App.css';

var game = new Game();



function App() {

  const [components, setComponents] = useState([]);   // 准备阶段添加玩家-动画状态变量 √
  const [player_components, setplayer_components] = useState([]); // 游戏阶段加载玩家-动画状态变量 √
  const [playerFight_components, setplayerFight_components] = useState([]); // 游戏阶段加载玩家-动画状态变量 √
  
  const [indicator_y, setindicator_y] = useState(0);  // 紫色指示器动画
 
  const numberIndicator_count = useMotionValue(0);    //数值指示器-动画状态变量  √
  const numberIndicator_rounded = useTransform(numberIndicator_count, Math.round);

  const jackpot_count = useMotionValue(0);            // 奖池-动画状态变量  √
  const jackpot_rounded = useTransform(jackpot_count, Math.round);

  const color_count = useMotionValue("#cccccc");      // 颜色-动画状态变量  √

  game.game_JackPotAnimation_init(()=>{   // 奖池动画实体函数
    animate(jackpot_count, game.get_jackPotVal(), { duration: 0.5 });
  });

  game.game_NumberIndicatorAnimation_init(()=>{   // 数值指示器实体函数
    animate(numberIndicator_count, game.get_numberIndicator(), { duration: 0.25 });
  });

  function handleColorChange(hex)   // 准备阶段颜色变化实体函数
  {
    animate(color_count, hex.hex, { duration: 0.25 });
  }

  game.game_addComponent_init((playerName,color)=>{   // 准备阶段添加玩家动画实体函数
    setComponents([...components,<PlayerInfo name={playerName} color={color} key={components.length} />]);
  });

  game.game_loadComponent_init((playerList,i)=>{    // 游戏开始加载玩家动画实体函数
    setplayer_components(prev => [...prev,  <PlayerRankInfo player={playerList[i]} key={i} />]);
  });

  game.game_loadFightComponent_init((playerList,i)=>{
    setplayerFight_components(prev=>[...prev, <PlayerFightInfo player={playerList[i]} key={i} />]);
  });

  game.game_clearFightCpmponet_init(()=>{
    setplayerFight_components([]);
  });
  

  game.game_Indicator_yAnimation_init((playerPointer)=>{    // 紫色玩家指示器动画实体函数
    setindicator_y(10+playerPointer*50);
  });
  
  
  //====================================================================
  return (
    <div id="totalFrame">

      <motion.div id="readyFrame" >
        <div id="readyPlayerList">
          {components}  {/* 添加玩家显示组件 */}
        </div>

        <motion.div id="playerAttributesCollecter" style={{backgroundColor:color_count}}>
          <div id="readybutton">  
            <div id="addPlayerButton">  {/* 添加玩家按钮 */}
              <button onClick={()=>{game.addPlayerACtion();}}>ADD player</button>
            </div>
            <div id="startGameButton">  {/* 开始游戏按钮 */}
              <button onClick={()=>{game.startGameAction()}}>Start game</button>
            </div>

            <div id="inputName">        {/* 昵称采集输入框 */}
              <input type="text" id="name" name="name" placeholder="请输入昵称" required minLength="2" maxLength="16" size="10" />
            </div>
          </div>  
          
          <div id="colorSelecter">      {/* 颜色选择框 */}
            <CompactPicker 
              color="#333"
              onChangeComplete={ handleColorChange }
              // onChangeComplete={()=>{
              // }}
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
          <div id="rateBar"></div>
        </div> {/* up */}
        
        <div id="down">
          <div id="history_bar">
            <motion.div id="goBack" onClick={()=> game.goBackButton()} whileTap={{scale:0.9, backgroundColor:"rgb(175,175,175)"}} whileHover={{scale:1.1}}>Crtl-Z</motion.div>
          </div>

          <div id="number_bar">
            <div>
              <motion.div className="number_button" onClick={() => game.numberPress(7)} whileTap={{scale:0.9, backgroundColor:"rgb(175,175,175)"}} whileHover={{scale:1.1}} >7</motion.div>
              <motion.div className="number_button" onClick={() => game.numberPress(8)} whileTap={{scale:0.9, backgroundColor:"rgb(175,175,175)"}} whileHover={{scale:1.1}} >8</motion.div>
              <motion.div className="number_button" onClick={() => game.numberPress(9)} whileTap={{scale:0.9, backgroundColor:"rgb(175,175,175)"}} whileHover={{scale:1.1}} >9</motion.div>
            </div>
            <div>
              <motion.div className="number_button" onClick={() => game.numberPress(4)} whileTap={{scale:0.9, backgroundColor:"rgb(175,175,175)"}} whileHover={{scale:1.1}} >4</motion.div>
              <motion.div className="number_button" onClick={() => game.numberPress(5)} whileTap={{scale:0.9, backgroundColor:"rgb(175,175,175)"}} whileHover={{scale:1.1}} >5</motion.div>
              <motion.div className="number_button" onClick={() => game.numberPress(6)} whileTap={{scale:0.9, backgroundColor:"rgb(175,175,175)"}} whileHover={{scale:1.1}} >6</motion.div>
            </div>
            <div>
              <motion.div className="number_button" onClick={() => game.numberPress(1)} whileTap={{scale:0.9, backgroundColor:"rgb(175,175,175)"}} whileHover={{scale:1.1}} >1</motion.div>
              <motion.div className="number_button" onClick={() => game.numberPress(2)} whileTap={{scale:0.9, backgroundColor:"rgb(175,175,175)"}} whileHover={{scale:1.1}} >2</motion.div>
              <motion.div className="number_button" onClick={() => game.numberPress(3)} whileTap={{scale:0.9, backgroundColor:"rgb(175,175,175)"}} whileHover={{scale:1.1}} >3</motion.div>
            </div>
            <div>
              <motion.div className="number_button" onClick={() => game.numberPress(-2)} whileTap={{scale:0.9, backgroundColor:"rgb(175,175,175)"}} whileHover={{scale:1.1}} >EC</motion.div>
              <motion.div className="number_button" onClick={() => game.numberPress(0)}  whileTap={{scale:0.9, backgroundColor:"rgb(175,175,175)"}} whileHover={{scale:1.1}} >0</motion.div>
              <motion.div className="number_button" onClick={() => game.numberPress(-1)} whileTap={{scale:0.9, backgroundColor:"rgb(175,175,175)"}} whileHover={{scale:1.1}} >←</motion.div>
            </div>
          </div>

          <div id="action_bar">
            <motion.div className="action_button" onClick={() => game.betAction()} whileTap={{scale:0.9, backgroundColor:"rgb(0,0,0)"}} >Bet</motion.div>
            <motion.div className="action_button" onClick={() => game.blindBetAction()} whileTap={{scale:0.9, backgroundColor:"rgb(0,0,0)"}} whileHover={{backgroundColor:"rgb(175,175,175)"}}>Blind</motion.div>
            <motion.div className="action_button" onClick={() => game.fightAction()} whileTap={{scale:0.9, backgroundColor:"rgb(0,0,0)"}} whileHover={{backgroundColor:"rgb(175,175,175)"}}>Fight</motion.div>
            <motion.div className="action_button" onClick={() => game.flodAction(game.playerPointer)} whileTap={{scale:0.9, backgroundColor:"rgb(0,0,0)"}} whileHover={{backgroundColor:"rgb(175,175,175)"}}>Fold</motion.div>
          </div>
        </div>  {/* down */}
        

      </div>  {/* gameFrame */}

      <motion.div id="fightFrame">  {/* fightFrame */}
        <div id="beFighter">
          <div style={{position:"relative",top:"25px"}}>
            {playerFight_components}
          </div>
        </div>

        <div id="fighter">
          <div id="fighterID" style={{display:"none"}}>0</div>
          <div id="fighterScore">0</div>
          <div className="fightPrompt">挑战者</div>
          <div id="fighterName">Fighter</div>   
          <button id="fighterVicButton" className="fightVicButton" onClick={()=>{game.fighterWinButton()}}>WIN</button>
        </div>

        <div id="beFighter_2_fighter">
          <div id="beFighterID" style={{display:"none"}}>0</div>
          <div id="fighter_2_Score">0</div>
          <div className="fightPrompt">被挑战者</div>
          <div id="fighter_2_Name">Fighter</div>  
          <button id="befighterVicButton" className="fightVicButton" onClick={()=>{game.beFighterWinButton()}}>WIN</button>   
        </div>
      </motion.div>


      
      <motion.div id="indicatorDiv" animate={{y:indicator_y}}>  {/* 紫色玩家行动指示器 */}
        <motion.div  id="indicator" animate={{rotate:[90,180,270,360]}} transition={{repeat:Infinity,duration:1.5}}></motion.div>
      </motion.div>

      <motion.div id="victoryCel">  {/* 胜利玩家庆祝指示器 */}
      </motion.div>

      <div id="safeLayer"></div> {/* 阻挡层 防止玩家进行错误的按钮操作 */}
      <div id="endingBar"><motion.div id="endingGame" onClick={()=>game.endingGame()}>Ending_Game</motion.div></div>
      
    </div> 
    
  );
}

// =-----=-----=-----=-----=-----=-----=-----=-----=-----=-----=-----=-----=-----=-----=-----=-----=-----=-----=-----=-----=-----=-----=-----=-----=-----=-----=-----=

const PlayerInfo = (props) => {
  let temperoColor = props.color;
  return(
    <motion.div id="playerInfoinReady" transition={{duration:0.5,type:"spring"}} initial={{x:100,opacity:0}} animate={{x:0,opacity:1, backgroundColor:temperoColor}}>
      <div>{"> "+props.name}</div>
    </motion.div>
  );
}

const PlayerRankInfo = (props) => {
  let player = props.player;

  return(
    <motion.div className="playerInfoinRank" transition={{duration:0.5,type:"spring"}} initial={{x:100,opacity:0}} animate={{x:0,opacity:1}}>
      <motion.div id={"ScoreinRankPlayer"+player.id} className="playerScoreinRank" animate={{x:0,opacity:1, backgroundColor:player.color}}> {player.score} </motion.div>
      <div style={{float:"left",width:"15px"}}> - </div>
      <div style={{float:"left",textAlign:"left"}}>{player.name}</div>
    </motion.div>
  );
}

const PlayerFightInfo = (props) => {
  let player = props.player;

  return(
      <motion.div className="playerFightRank" transition={{duration:0.5,type:"spring"}} initial={{x:100,opacity:0}} animate={{x:0,opacity:1}}>
        <button className="fightButton" onClick={()=>{game.fightWith(player.id)}}>Fight</button>
        <motion.div id={"ScoreinRankPlayer"+player.id} className="playerScoreinRank" animate={{x:0,opacity:1, backgroundColor:player.color}}> {player.score} </motion.div>
        <div style={{float:"left",width:"15px"}}> - </div>
        <div style={{float:"left",textAlign:"left"}}>{player.name}</div>
      </motion.div>
  );
}



export default App;
