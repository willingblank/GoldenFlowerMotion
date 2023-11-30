import { Game } from "./Game";

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


}