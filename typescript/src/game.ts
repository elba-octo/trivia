export class Game {
    protected players: Array<string> = [];
    protected places: Array<number> = [];
    protected purses: Array<number> = [];
    protected inPenaltyBox: Array<boolean> = [];
    private currentPlayer: number = 0;
    protected isGettingOutOfPenaltyBox: boolean = false;

    protected popQuestions: Array<string> = [];
    protected scienceQuestions: Array<string> = [];
    protected sportsQuestions: Array<string> = [];
    protected rockQuestions: Array<string> = [];

    constructor() {
        for (let i = 0; i < 50; i++) {
            this.popQuestions.push(`Pop Question ${i}`);
            this.scienceQuestions.push(`Science Question ${i}`);
            this.sportsQuestions.push(`Sports Question ${i}`);
            this.rockQuestions.push(this.createRockQuestion(i));
        }
    }

    private createRockQuestion(index: number): string {
        return `Rock Question ${index}`;
    }

    public addAndInitializePlayers(name: string): boolean {
        this.players.push(name);
        this.places[this.howManyPlayers() - 1] = 0;
        this.purses[this.howManyPlayers() - 1] = 0;
        this.inPenaltyBox[this.howManyPlayers() - 1] = false;

        console.log(`${name} was added`, `They are player number ${this.players.length}`);

        return true;
    }

    private howManyPlayers(): number {
        return this.players.length;
    }

    public roll(roll: number) {
        console.log(`${this.players[this.currentPlayer]} is the current player`, `They have rolled a ${roll}`);

        if (this.inPenaltyBox[this.currentPlayer]) {
            if (roll % 2 != 0) {
                this.isGettingOutOfPenaltyBox = true;

                console.log(`${this.players[this.currentPlayer]} is getting out of the penalty box`);
                this.places[this.currentPlayer] =
                    this.places[this.currentPlayer] + roll;
                if (this.places[this.currentPlayer] > 11) {
                    this.places[this.currentPlayer] =
                        this.places[this.currentPlayer] - 12;
                }

                console.log(`${this.players[this.currentPlayer]}'s new location is ${this.places[this.currentPlayer]}`,
                    `The category is ${this.currentCategory()}`);
                this.askQuestion();
            } else {
                console.log(`${this.players[this.currentPlayer]} is not getting out of the penalty box`);
                this.isGettingOutOfPenaltyBox = false;
            }
        } else {
            this.places[this.currentPlayer] = this.places[this.currentPlayer] + roll;
            if (this.places[this.currentPlayer] > 11) {
                this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12;
            }

            console.log(`${this.players[this.currentPlayer]}'s new location is ${this.places[this.currentPlayer]}`,
                `The category is ${this.currentCategory()}`);
            this.askQuestion();
        }
    }

    private askQuestion(): void {
        if (this.currentCategory() == "Pop") console.log(this.popQuestions.shift());
        if (this.currentCategory() == "Science")
            console.log(this.scienceQuestions.shift());
        if (this.currentCategory() == "Sports")
            console.log(this.sportsQuestions.shift());
        if (this.currentCategory() == "Rock")
            console.log(this.rockQuestions.shift());
    }

    protected currentCategory(): string {
        if (this.places[this.currentPlayer] == 0) return "Pop";
        if (this.places[this.currentPlayer] == 4) return "Pop";
        if (this.places[this.currentPlayer] == 8) return "Pop";
        if (this.places[this.currentPlayer] == 1) return "Science";
        if (this.places[this.currentPlayer] == 5) return "Science";
        if (this.places[this.currentPlayer] == 9) return "Science";
        if (this.places[this.currentPlayer] == 2) return "Sports";
        if (this.places[this.currentPlayer] == 6) return "Sports";
        if (this.places[this.currentPlayer] == 10) return "Sports";
        return "Rock";
    }

    private isWinner(): boolean {
        return (this.purses[this.currentPlayer] === 6);
    }

    public wrongAnswer(): boolean {
        console.log("Question was incorrectly answered");
        console.log(`${this.players[this.currentPlayer]} was sent to the penalty box`);
        this.inPenaltyBox[this.currentPlayer] = true;

        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length) this.currentPlayer = 0;
        return true;
    }

    public wasCorrectlyAnswered(): boolean {
        if (this.inPenaltyBox[this.currentPlayer]) {
            if (this.isGettingOutOfPenaltyBox) {
                console.log("Answer was correct!!!!");
                this.purses[this.currentPlayer] += 1;
                console.log(`${this.players[this.currentPlayer]} now has ${this.purses[this.currentPlayer]} Gold Coins.`);

                var winner = this.isWinner();
                this.currentPlayer += 1;
                if (this.currentPlayer == this.players.length) this.currentPlayer = 0;

                return winner;
            } else {
                this.currentPlayer += 1;
                if (this.currentPlayer == this.players.length) this.currentPlayer = 0;
                return true;
            }
        } else {
            console.log("Answer was correct!!!!");

            this.purses[this.currentPlayer] += 1;
            console.log(
                this.players[this.currentPlayer] +
                " now has " +
                this.purses[this.currentPlayer] +
                " Gold Coins."
            );

            var winner = this.isWinner();

            this.currentPlayer += 1;
            if (this.currentPlayer == this.players.length) this.currentPlayer = 0;

            return winner;
        }
    }
}
