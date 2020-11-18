import { Player } from "./player";

export class Game {
    protected players: Array<Player> = [];
    private currentPlayerIndex: number = 0;
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

    /**
     * Added with refacto
     */
    protected currentPlayer(): Player{
      return this.players.filter((_player, index) => index === this.currentPlayerIndex)[0]
    }
    /** */

    private createRockQuestion(index: number): string {
        return `Rock Question ${index}`;
    }

    public addAndInitializePlayers(name: string): Player {
      const player = new Player(name)
      this.players.push(player)
      console.log(`${name} was added`, `They are player number ${this.players.length}`);
      return player;
    }

    private howManyPlayers(): number {
        return this.players.length;
    }

    public roll(roll: number) {
      const currentPlayer = this.currentPlayer()
        console.log(`${currentPlayer} is the current player`, `They have rolled a ${roll}`);

        if (currentPlayer.inPenaltyBox) {
            if (roll % 2 != 0) {
                currentPlayer.isGettingOutOfPenaltyBox = true;

                console.log(`${currentPlayer} is getting out of the penalty box`);
                currentPlayer.place =
                    currentPlayer.place + roll;
                if (currentPlayer.place > 11) {
                    currentPlayer.place =
                        currentPlayer.place - 12;
                }

                console.log(`${currentPlayer}'s new location is ${currentPlayer.place}`,
                    `The category is ${this.currentCategory()}`);
                this.askQuestion();
            } else {
                console.log(`${currentPlayer} is not getting out of the penalty box`);
                currentPlayer.isGettingOutOfPenaltyBox = false;
            }
        } else {
            currentPlayer.place = currentPlayer.place + roll;
            if (currentPlayer.place > 11) {
                currentPlayer.place = currentPlayer.place - 12;
            }

            console.log(`${currentPlayer}'s new location is ${currentPlayer.place}`,
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
      const currentPlayer = this.currentPlayer()
        if (currentPlayer.place == 0) return "Pop";
        if (currentPlayer.place == 4) return "Pop";
        if (currentPlayer.place == 8) return "Pop";
        if (currentPlayer.place == 1) return "Science";
        if (currentPlayer.place == 5) return "Science";
        if (currentPlayer.place == 9) return "Science";
        if (currentPlayer.place == 2) return "Sports";
        if (currentPlayer.place == 6) return "Sports";
        if (currentPlayer.place == 10) return "Sports";
        return "Rock";
    }

    private isWinner(): boolean {
      const currentPlayer = this.currentPlayer()
        return (currentPlayer.purse === 6);
    }

    public wrongAnswer(): boolean {
        const currentPlayer = this.currentPlayer()
        console.log("Question was incorrectly answered");
        console.log(`${currentPlayer} was sent to the penalty box`);
        currentPlayer.inPenaltyBox = true;

        this.currentPlayerIndex += 1;
        if (this.currentPlayerIndex == this.players.length) this.currentPlayerIndex = 0;
        return true;
    }

    public wasCorrectlyAnswered(): boolean {
      const currentPlayer = this.currentPlayer()
        if (currentPlayer.inPenaltyBox) {
            if (currentPlayer.isGettingOutOfPenaltyBox) {
                console.log("Answer was correct!!!!");
                currentPlayer.purse += 1;
                console.log(`${currentPlayer.name} now has ${currentPlayer.purse} Gold Coins.`);

                var winner = this.isWinner();
                this.currentPlayerIndex += 1;
                if (this.currentPlayerIndex == this.players.length) this.currentPlayerIndex = 0;

                return winner;
            } else {
                this.currentPlayerIndex += 1;
                if (this.currentPlayerIndex == this.players.length) this.currentPlayerIndex = 0;
                return true;
            }
        } else {
            console.log("Answer was correct!!!!");

            currentPlayer.purse += 1;
            console.log(
                currentPlayer +
                " now has " +
                currentPlayer.purse +
                " Gold Coins."
            );

            var winner = this.isWinner();

            this.currentPlayerIndex += 1;
            if (this.currentPlayerIndex == this.players.length) this.currentPlayerIndex = 0;

            return winner;
        }
    }
}
