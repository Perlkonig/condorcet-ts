import { expect } from "chai";
import "mocha";
import { Ballot, RankedPair } from "../src";

describe("Ranked Pair", () => {
    it("Wikipedia: Basic", () => {
        const candidates = new Set(["Memphis", "Nashville", "Chattanooga", "Knoxville"]);
        const b1: Ballot = new Map([
            ["Memphis", 1],
            ["Nashville", 2],
            ["Chattanooga", 3],
            ["Knoxville", 4]
        ]);
        const b2: Ballot = new Map([
            ["Nashville", 1],
            ["Chattanooga", 2],
            ["Knoxville", 3],
            ["Memphis", 4]
        ]);
        const b3: Ballot = new Map([
            ["Chattanooga", 1],
            ["Knoxville", 2],
            ["Nashville", 3],
            ["Memphis", 4]
        ]);
        const b4: Ballot = new Map([
            ["Knoxville", 1],
            ["Chattanooga", 2],
            ["Nashville", 3],
            ["Memphis", 4]
        ]);

        const s = new RankedPair(candidates);
        s.addBallot(b1, 42);
        s.addBallot(b2, 26);
        s.addBallot(b3, 15);
        s.addBallot(b4, 17);
        const ranked = s.rank();
        const expected = ["Nashville", "Chattanooga", "Knoxville", "Memphis"];
        expect(ranked).to.eql(expected);
    });

    it("Wikipedia: Dropping Last", () => {
        const candidates = new Set(["Memphis", "Nashville", "Chattanooga", "Knoxville"]);
        const b1: Ballot = new Map([
            ["Memphis", 1],
            ["Nashville", 2],
            ["Chattanooga", 3]
        ]);
        const b2: Ballot = new Map([
            ["Nashville", 1],
            ["Chattanooga", 2],
            ["Knoxville", 3]
        ]);
        const b3: Ballot = new Map([
            ["Chattanooga", 1],
            ["Knoxville", 2],
            ["Nashville", 3]
        ]);
        const b4: Ballot = new Map([
            ["Knoxville", 1],
            ["Chattanooga", 2],
            ["Nashville", 3]
        ]);

        const s = new RankedPair(candidates);
        s.addBallot(b1, 42);
        s.addBallot(b2, 26);
        s.addBallot(b3, 15);
        s.addBallot(b4, 17);
        const ranked = s.rank();
        const expected = ["Nashville", "Chattanooga", "Knoxville", "Memphis"];
        expect(ranked).to.eql(expected);
    });

    it("Wikipedia: Unanimous", () => {
        const candidates = new Set(["Memphis", "Nashville", "Chattanooga", "Knoxville"]);
        const b1: Ballot = new Map([
            ["Chattanooga", 1],
            ["Knoxville", 2],
            ["Nashville", 3],
            ["Memphis", 4]
    ]);

        const s = new RankedPair(candidates);
        s.addBallot(b1, 42);
        const ranked = s.rank();
        const expected = ["Chattanooga", "Knoxville", "Nashville", "Memphis"];
        expect(ranked).to.eql(expected);
    });
});
