import { expect } from "chai";
import { describe, it, beforeEach } from "mocha";
import { Game } from "../src/game";

let game: GameTest;
describe("The test environment", () => {
  beforeEach(() => {
    game = new GameTest();
  });

  it("should have players in a game", function () {
    //given
    game.add("Amelle");
    game.add("Sandra");
    game.add("Weslay");
    game.add("Matthieu");
    game.add("Caroline");

    //when
    const players = game.getPlayers();
    //then
    expect(players.length).to.equal(5);
  });

  it("should have 50 questions per category when the game starts", function () {
    expect(game.getPopQuestions().length).to.equal(50);
    expect(game.getScienceQuestions().length).to.equal(50);
    expect(game.getSportsQuestions().length).to.equal(50);
    expect(game.getRockQuestions().length).to.equal(50);
  });

  it("should add a player with correct settings", () => {
    // When
    game.add("Amelle");
    // Then
    expect(game.getPlaces()[0]).to.equal(0);
    expect(game.getPurses()[0]).to.equal(0);
    expect(game.getInPenaltyBox()[0]).to.be.false;
  });

  it("should update the place of the player with dice value", () => {
    // When
    game.add("Amelle");
    game.roll(5);
    // Then
    expect(game.getPlaces()[0]).to.equal(5);
  });

  it("should not update the place of the player when dices value 12", () => {
    // When
    game.add("Amelle");
    game.roll(12);
    // Then
    expect(game.getPlaces()[0]).to.equal(0);
  });

  describe("when the player is in the penalty box", () => {
    it("should update the place of the player and not get him out of the penalty box", () => {
      // When
      game.add("Amelle");
      game.wrongAnswer();
      game.roll(5);
      // Then
      expect(game.getIsGettingOutOfPenaltyBox()).to.be.true;
      expect(game.getPlaces()[0]).to.equal(5);
    });
    it("should reset the place of the player and not get him out of the penalty box", () => {
      // When
      game.add("Amelle");
      game.wrongAnswer();
      game.roll(5);
      game.roll(7);
      // Then
      expect(game.getIsGettingOutOfPenaltyBox()).to.be.true;
      expect(game.getPlaces()[0]).to.equal(0);
    });
    it("should not update the place of the player and get him out of the penalty box", () => {
      // When
      game.add("Amelle");
      game.wrongAnswer();
      game.roll(6);
      // Then
      expect(game.getIsGettingOutOfPenaltyBox()).to.be.false;
      expect(game.getPlaces()[0]).to.equal(0);
    });
  });

  describe("wasCorrectlyAnswered", () => {
    describe("when the player is in the penalty box", () => {
      it("should add 1 gold in player purse", () => {
        // When
        game.add("Amelle");
        game.wrongAnswer();
        game.roll(5);
        const isNotWinner = game.wasCorrectlyAnswered();
        // Then
        expect(game.getPurses()[0]).to.be.equal(1);
        expect(isNotWinner).to.be.true;
      });
      it("should return player as winner when he has 6 gold coins", () => {
        // When
        game.add("Amelle");
        game.wrongAnswer();
        game.roll(5);
        game.wasCorrectlyAnswered();
        game.wasCorrectlyAnswered();
        game.wasCorrectlyAnswered();
        game.wasCorrectlyAnswered();
        game.wasCorrectlyAnswered();
        const isNotWinner = game.wasCorrectlyAnswered();
        // Then
        expect(game.getPurses()[0]).to.be.equal(6);
        expect(isNotWinner).to.be.false;
      });
      it("should not update player purse when isGettingOutOfPenaltyBox is false", () => {
        // When
        game.add("Caroline");
        game.wrongAnswer();
        game.roll(6);
        const isNotWinner = game.wasCorrectlyAnswered();
        // Then
        expect(game.getPurses()[0]).to.be.equal(0);
        expect(isNotWinner).to.be.true;
      })
    });
    describe("when the player is not in the penalty box", () => {
      it("should add 1 gold in player purse", () => {
        // When
        game.add("Amelle");
        game.roll(5);
        const isNotWinner = game.wasCorrectlyAnswered();
        // Then
        expect(game.getPurses()[0]).to.be.equal(1);
        expect(isNotWinner).to.be.true;
      });
      it("should return player as winner when he has 6 gold coins", () => {
        // When
        game.add("Amelle");
        game.wrongAnswer();
        game.roll(5);
        game.wasCorrectlyAnswered();
        game.wasCorrectlyAnswered();
        game.wasCorrectlyAnswered();
        game.wasCorrectlyAnswered();
        game.wasCorrectlyAnswered();
        const isNotWinner = game.wasCorrectlyAnswered();
        // Then
        expect(game.getPurses()[0]).to.be.equal(6);
        expect(isNotWinner).to.be.false;
      });
    });

    describe("wrongAnswer", () => {
      it("should send the player to the penalty box", function() {
        //When
        game.add("Amelle");
        const isLoser = game.wrongAnswer();

        //Then
        expect(game.getInPenaltyBox()[0]).to.be.true;
        expect(isLoser).to.be.true;
      });
    });

    describe("currentCategory", () => {
      it("should return sports category when dice is 2", function() {
        //When
        game.add("Amelle");
        game.roll(2);

        //Then
        expect(game.getPlaces()[0]).to.equal(2);
        expect(game.currentCategory()).to.equal("Sports");
      })

      it("should return sports category when dice is 6", function() {
        //When
        game.add("Amelle");
        game.roll(6);

        //Then
        expect(game.getPlaces()[0]).to.equal(6);
        expect(game.currentCategory()).to.equal("Sports");
      })
      it("should return sports category when dice is 10", function() {
        //When
        game.add("Amelle");
        game.roll(10);

        //Then
        expect(game.getPlaces()[0]).to.equal(10);
        expect(game.currentCategory()).to.equal("Sports");
      })

      it("should return rock category when dice is 3", function() {
        //When
        game.add("Amelle");
        game.roll(3);

        //Then
        expect(game.getPlaces()[0]).to.equal(3);
        expect(game.currentCategory()).to.equal("Rock");
      })

      it("should return rock category when dice is 7", function() {
        //When
        game.add("Amelle");
        game.roll(7);

        //Then
        expect(game.getPlaces()[0]).to.equal(7);
        expect(game.currentCategory()).to.equal("Rock");
      });

      it("should return rock category when dice is 11", function() {
        //When
        game.add("Amelle");
        game.roll(11);

        //Then
        expect(game.getPlaces()[0]).to.equal(11);
        expect(game.currentCategory()).to.equal("Rock");
      });
    });
  });
});

class GameTest extends Game {
  public getPlayers(): Array<string> {
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

  public getPlaces(): Array<number> {
    return this.places;
  }

  public getPurses(): Array<number> {
    return this.purses;
  }

  public getInPenaltyBox(): Array<boolean> {
    return this.inPenaltyBox;
  }

  public getIsGettingOutOfPenaltyBox(): boolean {
    return this.isGettingOutOfPenaltyBox;
  }

  public  currentCategory(): string {
   return super.currentCategory();
 }
}
