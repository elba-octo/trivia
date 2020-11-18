export class Player{
    public name: string;
    public place: number;
    public purse: number;
    public inPenaltyBox: boolean;
    public isGettingOutOfPenaltyBox: boolean; // to check ?
    
    constructor(name:string){
        this.name = name;   
        this.place = 0;   
        this.purse = 0;   
        this.inPenaltyBox = false;
        this.isGettingOutOfPenaltyBox = false;
    }

}