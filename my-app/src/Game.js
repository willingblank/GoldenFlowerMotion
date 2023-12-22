import { animate } from "framer-motion";
import { MyAnimate } from "./MyAnimate";
import { Player } from "./Player";
import { BackupGame } from "./BackupGame";
import _ from 'lodash'; 

var myGameAnimate = new MyAnimate();
var lastGame = new BackupGame();

export class Game{
    constructor()
    {
		this.gameState = "preparing"
        this.jackPotVal = 0;
        this.numberIndicator = 0;
        this.lastNumberIndicator = 1;
        this.game_addComponent_p = null;
		this.game_loadComponent_p = null;
		this.game_loadFightComponent_p = null;
		this.game_clearFightCpmponet_p = null;
        this.playerPointer = -1;
        this.playerNumber = 0;
        this.playerList = new Array();
		this.tempIndicatorFlag = 0;
		this.actionTimes = 0;
		this.totalActionTimes = 0;
    }

    game_JackPotAnimation_init(functionPointer)
    {
        myGameAnimate.JackPotAnimation_init(functionPointer);
    }

    game_NumberIndicatorAnimation_init(functionPointer)
    {
        myGameAnimate.NumberIndicatorAnimation_init(functionPointer);
    }

    game_addComponent_init(functionPointer)
    {
        this.game_addComponent_p=functionPointer;
    }

	game_loadComponent_init(functionPointer)
    {
        this.game_loadComponent_p=functionPointer;
    }

	game_loadFightComponent_init(functionPointer)
	{
		this.game_loadFightComponent_p = functionPointer;
	}

	game_clearFightCpmponet_init(functionPointer)
	{
		this.game_clearFightCpmponet_p = functionPointer;
	}

	game_Indicator_yAnimation_init(functionPointer)
	{
		myGameAnimate.Indicator_yAnimation_init(functionPointer);
	}

    get_numberIndicator()
    {
        return this.numberIndicator;
    }

    set_numberIndicator(val)
    {
        this.numberIndicator = val;
        myGameAnimate.NumberIndicatorAnimation_run();
    }

    get_lastNumberIndicator()
    {
        return this.lastNumberIndicator;
    }

    set_lastNumberIndicator(val)
    {
        this.lastNumberIndicator = val;
    }

    add_jackPotVal(val)
    {
        this.jackPotVal += val;
		myGameAnimate.JackPotAnimation_run();
		setTimeout(() => {
			for(let i=0;i<this.playerNumber;i++)
			{
				animate("#RateBox"+i,{width: (this.playerList[i].moneyPaid/this.jackPotVal*375)+"px"});
			}
		}, 50);
    }

    set_jackPotVal(val)
    {
        this.jackPotVal = val;
		myGameAnimate.JackPotAnimation_run();
    }

    get_jackPotVal()
    {
        return this.jackPotVal;
    }

    errorHandle(errorInfo)
    {
      alert(errorInfo);
    }

    addPlayerACtion()
    {
		if(this.playerNumber > 6)
		{
			this.errorHandle("最大游戏人数7人");
			return;
		}

		let namevalue = document.getElementById("name").value;
		let temp_color = document.getElementById("playerAttributesCollecter").style.backgroundColor;
		if(namevalue == "")
		{
			this.errorHandle("请输入昵称后添加玩家.");
			return;
		}
		if(temp_color === "rgb(0, 0, 0)")
		{
			this.errorHandle("请勿选择黑色.")
			return;
		}
		for(let i=0;i<this.playerNumber;i++)
		{
			if(namevalue == this.playerList[i].name)
			{
				this.errorHandle("请勿添加昵称相同的玩家.");
				return;
			}
			if(temp_color == this.playerList[i].color)
			{
				this.errorHandle("请勿选择重复的颜色.")
				return;
			}
		}

		document.getElementById("name").value = null;           
	
		if(namevalue!= null)
		{
			this.playerList[this.playerNumber] = new Player(this.playerNumber,namevalue,temp_color);
		}
		console.log("add player: " + this.playerList[this.playerNumber].color);
		
		this.playerNumber++;
		this.game_addComponent_p(namevalue,temp_color);

		let randomColorR = Math.floor(Math.random()*255);
		let randomColorG = Math.floor(Math.random()*255);
		let randomColorB = Math.floor(Math.random()*255);
		animate("#playerAttributesCollecter",{backgroundColor:"rgb("+randomColorR+", "+randomColorG+", "+randomColorB+")"});
    }

    startGameAction()
    {
		
		if(this.playerNumber<2)
		{
			this.errorHandle("需要游戏人数大于2人才可开始游戏!");
			return;
		}	

		this.gameState = "gaming";
		console.log("game start!");
		console.log(this.playerList);	
		document.getElementById("safeLayer").style.display="none";
		animate("#readyFrame",{opacity:0},{duration:0.35});
		setTimeout(()=>{document.getElementById("readyFrame").style.display="none";},500);

		this.playingNumber = this.playerNumber;

		for(let i=0;i<(this.playerNumber);i++)
		{
			this.playerList[i].state = "playing";
			this.createRateBox(i);
		}	

		for(let i=0;i<(this.playerNumber);i++)
		{
			setTimeout(() => {
				this.game_loadComponent_p(this.playerList,i);
			}, 100*i);
		}	

		setTimeout(() => {
			for(let i=0;i<(this.playerNumber);i++)
			{
				setTimeout(() => {
					this.playerScoreAdd(i,-1);
					this.add_jackPotVal(1);
				}, 100*i);
			}
		}, this.playerNumber*100);
		animate("#rank_bar",{opacity:0.7});
		this.nextPlayer();
    }

	playerScoreSet(who,val)
	{
		this.playerList[who].score = val;
		document.getElementById("ScoreinRankPlayer"+this.playerList[who].id).innerText=this.playerList[who].score;
		animate("#"+"ScoreinRankPlayer"+this.playerList[who].id,
		{x:[0,5,0]},{duration:0.25}
		);
	}

	playerScoreAdd(who,val)
	{
		this.playerList[who].score += val;
		this.playerList[who].moneyPaid -= val;
		document.getElementById("ScoreinRankPlayer"+this.playerList[who].id).innerText=this.playerList[who].score;
		animate("#"+"ScoreinRankPlayer"+this.playerList[who].id,
		{x:[0,5,0]},{duration:0.25}
		);
	}

	winnerScoreSet(who,val)
	{
		this.playerList[who].score += val;
		setTimeout(() => {
			document.getElementById("ScoreinRankPlayer"+this.playerList[who].id).innerText=this.playerList[who].score;
		}, 750);
	}

    nextPlayer()
    {
		// 玩家指针指向下一个玩家
		//this.tempIndicatorFlag = 0;
		do
		{
			console.log("next player");
			if(this.playerPointer+1<this.playerNumber)
				this.playerPointer++;
			else
				this.playerPointer=0;
		}while(this.playerList[this.playerPointer].state == "idle")

		if(this.checkmate())
			this.littleWinner(this.playerPointer);
		
		if(this.actionTimes>=this.playerNumber)
		{
			if(this.playerList[this.playerPointer].state == "checked")
				this.set_numberIndicator(this.lastNumberIndicator);
			else
				this.set_numberIndicator(Math.ceil(this.lastNumberIndicator/2));
		}

		console.log("playerPointer = "+this.playerPointer);
	
		document.getElementById("victoryCel").style.backgroundColor = this.playerList[this.playerPointer].color;
		myGameAnimate.Indicator_yAnimation_run(this.playerPointer);
    }
    
    numberPress(number)
    {
      if(number == -1) 
        this.set_numberIndicator(parseInt(this.get_numberIndicator()/10));
      else if(number == -2)
      this.set_numberIndicator(0);
      else
	  {
		if(this.tempIndicatorFlag == 0)
		{
			this.set_numberIndicator(0);
			this.tempIndicatorFlag = 1;
		}
		if(this.get_numberIndicator()*10+number>=999)
		{
			alert("请输入小于999的值");
			return;
		}
		this.set_numberIndicator(this.get_numberIndicator()*10+number);
	  }	
      console.log("numberPress game.get_numberIndicator() = "+this.get_numberIndicator());
    }



	littleWinner(playerp)
	{		

		this.gameState = "preparing";

		myGameAnimate.winnerAnimate(playerp);

		this.winnerScoreSet(playerp,this.get_jackPotVal());
		setTimeout(() => {
			this.set_jackPotVal(0);
		}, 750);

		setTimeout(() => {
			this.restartGame();
		}, 1500);
	}

	restartGame()
	{
		this.set_numberIndicator(0);
        this.lastNumberIndicator = 1;
		this.actionTimes = 0;
		for(let i=0;i<(this.playerNumber);i++)
		{
			this.playerList[i].state = "playing";
			this.playerList[i].moneyPaid = 0;
			animate("#ScoreinRankPlayer"+i,{backgroundColor:this.playerList[i].color});
		}	

		setTimeout(() => {
			this.gameState = "gaming";
			setTimeout(() => {
				for(let i=0;i<(this.playerNumber);i++)
				{
					setTimeout(() => {
						this.playerScoreAdd(i,-1);
						this.add_jackPotVal(1);
					}, 100*i);
				}
			}, this.playerNumber*100);
		}, 2000);
		
	}

	checkmate()
	{
		let idleNumber = 0;
		for(let i=0;i<(this.playerNumber);i++)
		{
			if(this.playerList[i].state == "idle")
			{
				idleNumber++;
			}
		}
		if(idleNumber>=this.playerNumber-1)
			return true;
		else
			return false;
	}

	endingGame()
	{
		//return jackpot entry score
		//find loser
		//find max loser to give max winner
		//then loop
	}

    betAction()
    {
		if(this.gameState == "preparing")
			return;
        console.log("game bet action");
        if(this.numberIndicator<this.lastNumberIndicator)
        {
          this.errorHandle("请输入大于"+this.lastNumberIndicator+"的值");
		  this.set_numberIndicator(this.lastNumberIndicator);
          return;
        }
		this.gameBackup();
		this.actionTimes++;
		this.totalActionTimes++;
		this.playerList[this.playerPointer].state = "checked";
        this.lastNumberIndicator = this.numberIndicator;
        this.add_jackPotVal(this.numberIndicator);
		this.playerScoreAdd(this.playerPointer,-this.numberIndicator);
        this.nextPlayer();
    }

	blindBetAction()
	{
		if(this.gameState == "preparing")
			return;

		if(this.playerList[this.playerPointer].state == "checked")
		{
			this.errorHandle("你已经查看过卡面 不可以执行blindBet行动");
			return;
		}
		if(this.numberIndicator<(this.lastNumberIndicator/2))
        {
          this.errorHandle("请输入大于"+(this.lastNumberIndicator/2)+"的值");
		  this.set_numberIndicator(Math.ceil(this.lastNumberIndicator/2));
          return;
        }
		if(this.numberIndicator>=500)
		{
			this.errorHandle("请输入小于"+500+"的值");
			this.set_numberIndicator(499);
			return;
		}
		this.gameBackup();
		this.actionTimes++;
		this.totalActionTimes++;
		this.lastNumberIndicator = this.numberIndicator*2;
		this.add_jackPotVal(this.numberIndicator);
		this.playerScoreAdd(this.playerPointer,-this.numberIndicator);
		this.nextPlayer();
	}

	fightAction()
	{
		if(this.gameState == "preparing")
			return;
		if(this.actionTimes<this.playerNumber)
		{
			this.errorHandle("第一轮无法进行Fight操作.")
			return;
		}
		this.gameBackup();
		document.getElementById("safeLayer").style.display="block";
		this.add_jackPotVal(this.lastNumberIndicator);
		this.playerScoreAdd(this.playerPointer,this.lastNumberIndicator*(-1));

		animate("#rank_bar",{y:30,opacity:0},{duration:0.5});
		document.getElementById("fightFrame").style.display="block";
		animate("#fightFrame",{y:[-100],opacity:[0,1]},{duration:2,type:"spring"});

		for(let i=0;i<(this.playerNumber);i++)
		{
			if(i == this.playerPointer) continue;
			if(this.playerList[i].state == "idle") continue;

			setTimeout(() => {
				this.game_loadFightComponent_p(this.playerList,i);
			}, 100*i);
		}	

		document.getElementById("fighterName").innerText = this.playerList[this.playerPointer].name;
		document.getElementById("fighterScore").innerText = this.playerList[this.playerPointer].score;
		document.getElementById("fighter").style.backgroundColor = this.playerList[this.playerPointer].color;

		document.getElementById("fighterID").innerText = this.playerPointer;
	}

	fightWith(val)
	{
		document.getElementById("beFighterID").innerText = val;
		
		animate("#beFighter",{backgroundColor:this.playerList[val].color});

		document.getElementById("fighter_2_Name").innerText = this.playerList[val].name;
		document.getElementById("fighter_2_Score").innerText = this.playerList[val].score;
		document.getElementById("beFighter_2_fighter").style.backgroundColor = this.playerList[val].color;

		animate("#beFighter_2_fighter",{x:-250,y:[-400]},{duration:0.1});

		setTimeout(() => {
			document.getElementById("beFighter_2_fighter").style.display = "block";
			animate("#beFighter",{opacity:0});
			animate("#fighter",{x:-250,y:[0,-15]},{duration:0.75,type:"spring"});
			animate("#beFighter_2_fighter",{x:0,y:[-400]},{duration:0.75,type:"spring"});
		}, 100);

		document.getElementById("fighterVicButton").style.display = "block";
		document.getElementById("befighterVicButton").style.display = "block";
	}

	fighterWinButton()
	{
		let fightLoser = document.getElementById("beFighterID").innerText;
		//this.flodAction(fightLoser);
		this.outRound(fightLoser);

		animate("#rank_bar",{y:0,opacity:0.7},{duration:0.5});
		animate("#fightFrame",{y:[-100,0],opacity:[0]},{duration:0.5,type:"easeOut"});
		animate("#beFighter",{opacity:1});
		this.game_clearFightCpmponet_p();

		setTimeout(() => {
			document.getElementById("fightFrame").style.display="none";
			document.getElementById("beFighter_2_fighter").style.display = "none";
			animate("#fighter",{x:0,y:[0]},{duration:1,type:"spring"});
			animate("#beFighter_2_fighter",{x:0,y:[0]},{duration:1,type:"spring"});
			document.getElementById("fighterVicButton").style.display = "none";
			document.getElementById("befighterVicButton").style.display = "none";
			document.getElementById("safeLayer").style.display="none";
		}, 700);

	}

	beFighterWinButton()
	{
		let fightLoser = document.getElementById("fighterID").innerText;
		//this.flodAction(fightLoser);
		this.outRound(fightLoser);

		animate("#rank_bar",{y:0,opacity:0.7},{duration:0.5});
		animate("#fightFrame",{y:[-100,0],opacity:[0]},{duration:0.5,type:"easeOut"});
		animate("#beFighter",{opacity:1});
		this.game_clearFightCpmponet_p();

		setTimeout(() => {
			document.getElementById("fightFrame").style.display="none";
			document.getElementById("beFighter_2_fighter").style.display = "none";
			animate("#fighter",{x:0,y:[0]},{duration:1,type:"spring"});
			animate("#beFighter_2_fighter",{x:0,y:[0]},{duration:1,type:"spring"});
			document.getElementById("fighterVicButton").style.display = "none";
			document.getElementById("befighterVicButton").style.display = "none";
			document.getElementById("safeLayer").style.display="none";
		}, 700);
	}

	outRound(who)
	{
		this.playerList[who].state = "idle";
		animate("#ScoreinRankPlayer"+who,{backgroundColor:"rgb(0, 0, 0)"});
		this.nextPlayer();
	}

	flodAction(who)
	{
		if(this.gameState == "preparing")
			return;
		this.gameBackup();
		this.actionTimes++;
		this.totalActionTimes++;
		this.outRound(who);
	}

	gameBackup()
	{
		lastGame = _.cloneDeep(this);
	}

	goBackButton()
	{
		if(this.totalActionTimes < 1)
			return;
		if(this.gameState == "preparing")
			return;
		let tempThis = this;
		tempThis = _.cloneDeep(lastGame);
		Object.assign(this,tempThis);

		// -----------animate--------------
		myGameAnimate.Indicator_yAnimation_run(this.playerPointer);
		this.set_jackPotVal(this.jackPotVal);
		for(let i=0;i<this.playerNumber;i++)
		{
			this.playerScoreSet(i,this.playerList[i].score);
			if(this.playerList[i].state != "idle")
				animate("#ScoreinRankPlayer"+i,{backgroundColor:this.playerList[i].color});
		}
	}

	createRateBox(id)
	{
		var createDiv=document.createElement("div");  
		createDiv.id="RateBox"+id;
		createDiv.style.width = "1px";
		createDiv.style.height = "25px";
		createDiv.style.float = "left";
		createDiv.style.borderRadius = "5%";
		createDiv.style.backgroundColor = this.playerList[id].color;
		document.getElementById("rateBar").appendChild(createDiv);
	}
}