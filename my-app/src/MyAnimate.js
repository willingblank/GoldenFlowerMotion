import { Game } from "./Game";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState} from "react";
import { CompactPicker   } from 'react-color'


export class MyAnimate
{
    constructor()
    {
        this.JackPotAnimation = null;
        this.NumberIndicatorAnimation = null;
        this.Indicator_yAnimation = null;
    }

    JackPotAnimation_init(functionPointer)
    {
        this.JackPotAnimation = functionPointer;
    }

    JackPotAnimation_run()
    {
        this.JackPotAnimation();
    }

    NumberIndicatorAnimation_init(functionPointer)
    {
        this.NumberIndicatorAnimation = functionPointer;
    }

    NumberIndicatorAnimation_run()
    {
        this.NumberIndicatorAnimation();
    }

    Indicator_yAnimation_init(functionPointer)
    {
        this.Indicator_yAnimation = functionPointer;
    }

    Indicator_yAnimation_run(playerPointer)
    {
        this.Indicator_yAnimation(playerPointer);
    }

    winnerAnimate(playerp)
    {
        //================================ winnerAnimate start================================


        setTimeout(() => {
			animate("#"+"ScoreinRankPlayer"+playerp,
			{x:[0,220],y:[0,(3.5-playerp)*50],scale:[1,2],opacity:[1]},{duration:0.3});

            animate("#rank_bar",{opacity:1});
		}, 250);

        setTimeout(() => {
			animate("#"+"ScoreinRankPlayer"+playerp,
			{scale:[2,1.5,2.5,2.7,3],rotate:[0,90,270,360,0,270,330,360]},{duration:0.75,type:'circOut'});
		}, 600);

        setTimeout(() => {
		    animate("#victoryCel",{opacity:[1,1],width:[500,100],height:[800,100],x:200,y:[150],borderRadius:150},{duration:1,type:"spring"});
        }, 250);

        setTimeout(() => {
		    animate("#victoryCel",{opacity:0,borderRadius:25},{duration:0.45,type:"spring"});
        }, 1000);

        //================================ winnerAnimate over ================================
        setTimeout(() => {
            animate("#"+"ScoreinRankPlayer"+playerp,
			{x:0,y:0,scale:1,opacity:1},{duration:0.45, type:"spring"});

            animate("#rank_bar",{opacity:0.8});
        }, 1600);

        setTimeout(() => {
		    animate("#victoryCel",{opacity:[0,1],width:500,height:800,x:0,y:0},{duration:1,type:"spring"});
        }, 2000);

    }

}