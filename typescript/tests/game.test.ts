import {expect} from "chai";
import {describe, it, beforeEach} from "mocha";
import {Game} from "../src/game";
import { Player } from "../src/player";

let game: GameTest;
let player: Player;
describe("The test environment", () => {
    beforeEach(() => {
        game = new GameTest();
        player = game.addAndInitializePlayers("Amelle");
    });

    describe("game constructor", () => {
        it("should have 50 questions per category when the game starts", function () {
            expect(game.getPopQuestions().length).to.equal(50);
            expect(game.getScienceQuestions().length).to.equal(50);
            expect(game.getSportsQuestions().length).to.equal(50);
            expect(game.getRockQuestions().length).to.equal(50);
        });
    })

    describe("add players", () => {
        it("should have players in a game", function () {
            //given
            game.addAndInitializePlayers("Sandra");
            game.addAndInitializePlayers("Weslay");
            game.addAndInitializePlayers("Matthieu");
            game.addAndInitializePlayers("Caroline");

            //when
            const players = game.getPlayers();
            //then
            expect(players.length).to.equal(5);
        });

        it("should add a player with correct settings", () => {
            // Then
            expect(player.place).to.equal(0);
            expect(player.purse).to.equal(0);
            expect(player.inPenaltyBox).to.be.false;
        });
    })

    describe("roll", () => {
        it("should update the place of the player with dice value", () => {
            // When
            game.roll(5);
            // Then
            expect(player.place).to.equal(5);
        });

        it("should not update the place of the player when dices value 12", () => {
            // When
            game.roll(12);
            // Then
            expect(player.place).to.equal(0);
        });

        describe("when the player is in the penalty box", () => {
            beforeEach(() => {
                game.wrongAnswer();
            })
            it("should update the place of the player and not get him out of the penalty box", () => {
                // When
                game.roll(5);
                // Then
                expect(player.isGettingOutOfPenaltyBox).to.be.true;
                expect(player.place).to.equal(5);
            });
            it("should reset the place of the player and not get him out of the penalty box", () => {
                // When
                game.roll(5);
                game.roll(7);
                // Then
                expect(player.isGettingOutOfPenaltyBox).to.be.true;
                expect(player.place).to.equal(0);
            });
            it("should not update the place of the player and get him out of the penalty box", () => {
                // When
                game.roll(6);
                // Then
                expect(player.isGettingOutOfPenaltyBox).to.be.false;
                expect(player.place).to.equal(0);
            });
        });
    })

    describe("wasCorrectlyAnswered", () => {
        describe("when the player is in the penalty box", () => {
            beforeEach(() => {
                game.wrongAnswer();
            })
            it("should add 1 gold in player purse", () => {
                // When
                game.roll(5);
                const isWinner = game.wasCorrectlyAnswered();
                // Then
                expect(player.purse).to.be.equal(1);
                expect(isWinner).to.be.false;
            });
            it("should return player as winner when he has 6 gold coins", () => {
                // When
                game.roll(5);
                game.wasCorrectlyAnswered();
                game.wasCorrectlyAnswered();
                game.wasCorrectlyAnswered();
                game.wasCorrectlyAnswered();
                game.wasCorrectlyAnswered();
                const isWinner = game.wasCorrectlyAnswered();
                // Then
                expect(player.purse).to.be.equal(6);
                expect(isWinner).to.be.true;
            });
            it("should not update player purse when isGettingOutOfPenaltyBox is false", () => {
                // When
                game.roll(6);
                const isNotWinner = game.wasCorrectlyAnswered();
                // Then
                expect(player.purse).to.be.equal(0);
                expect(isNotWinner).to.be.true;
            })
        });
        describe("when the player is not in the penalty box", () => {
            it("should add 1 gold in player purse", () => {
                // When
                game.roll(5);
                const isWinner = game.wasCorrectlyAnswered();
                // Then
                expect(player.purse).to.be.equal(1);
                expect(isWinner).to.be.false;
            });
            it("should return player as winner when he has 6 gold coins", () => {
                // When
                game.wrongAnswer();
                game.roll(5);
                game.wasCorrectlyAnswered();
                game.wasCorrectlyAnswered();
                game.wasCorrectlyAnswered();
                game.wasCorrectlyAnswered();
                game.wasCorrectlyAnswered();
                const isWinner = game.wasCorrectlyAnswered();
                // Then
                expect(player.purse).to.be.equal(6);
                expect(isWinner).to.be.true;
            });
        });

        describe("wrongAnswer", () => {
            it("should send the player to the penalty box", function () {
                //When
                const isLoser = game.wrongAnswer();

                //Then
                expect(player.inPenaltyBox).to.be.true;
                expect(isLoser).to.be.true;
            });
        });

        describe("currentCategory", () => {
            it("should return sports category when dice is 2", function () {
                //When
                game.roll(2);

                //Then
                expect(player.place).to.equal(2);
                expect(game.currentCategory()).to.equal("Sports");
            })

            it("should return sports category when dice is 6", function () {
                //When
                game.roll(6);

                //Then
                expect(player.place).to.equal(6);
                expect(game.currentCategory()).to.equal("Sports");
            })
            it("should return sports category when dice is 10", function () {
                //When
                game.roll(10);

                //Then
                expect(player.place).to.equal(10);
                expect(game.currentCategory()).to.equal("Sports");
            })

            it("should return rock category when dice is 3", function () {
                //When
                game.roll(3);

                //Then
                expect(player.place).to.equal(3);
                expect(game.currentCategory()).to.equal("Rock");
            })

            it("should return rock category when dice is 7", function () {
                //When
                game.roll(7);

                //Then
                expect(player.place).to.equal(7);
                expect(game.currentCategory()).to.equal("Rock");
            });

            it("should return rock category when dice is 11", function () {
                //When
                game.roll(11);

                //Then
                expect(player.place).to.equal(11);
                expect(game.currentCategory()).to.equal("Rock");
            });
        });
    });
});

class GameTest extends Game {
    public getPlayers(): Array<Player> {
        return this.players;
    }

    public getPopQuestions(): Array<string> {
        return this.popQuestions;
    }

    public getScienceQuestions(): Array<string> {
        return this.scienceQuestions;
    }

    public getSportsQuestions(): Array<string> {
        return this.sportsQuestions;
    }

    public getRockQuestions(): Array<string> {
        return this.rockQuestions;
    }

    public currentCategory(): string {
        return super.currentCategory();
    }
}
