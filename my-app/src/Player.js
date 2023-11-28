
export class Player 
{
    constructor(id,name,color) 
    {
        this.id = id;
        this.name = name;
        this.color = color;
        this.score = 0;
        this.state = "idle";
        this.scoreColor = "green";
    }
}

