import { animate } from "framer-motion";
import { MyAnimate } from "./MyAnimate";
import { Player } from "./Player";

export class BackupGame{
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

}