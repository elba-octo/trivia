import { expect } from "chai";
import { describe, it, beforeEach } from "mocha";
import { GameRunner } from "../src/game-runner";
import { Game } from "../src/game";

let game: GameTest;
describe("The test environment", () => {
  beforeEach(() => {
    game = new GameTest();
  });
  it("should pass", () => {
    expect(true).to.be.true;
  });

  it("should access game", function () {
    expect(GameRunner).to.not.be.undefined;
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
}
