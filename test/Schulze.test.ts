import { expect } from "chai";
import "mocha";
import { Ballot, Schulze } from "../src";

describe("Schulze", () => {
    it("Wikipedia: Basic", () => {
        const candidates = new Set(["A", "B", "C", "D", "E"]);
        const b1: Ballot = new Map([
            ["A", 1],
            ["C", 2],
            ["B", 3],
            ["E", 4],
            ["D", 5]
        ]);
        const b2: Ballot = new Map([
            ["A", 1],
            ["D", 2],
            ["E", 3],
            ["C", 4],
            ["B", 5]
        ]);
        const b3: Ballot = new Map([
            ["B", 1],
            ["E", 2],
            ["D", 3],
            ["A", 4],
            ["C", 5]
        ]);
        const b4: Ballot = new Map([
            ["C", 1],
            ["A", 2],
            ["B", 3],
            ["E", 4],
            ["D", 5]
        ]);
        const b5: Ballot = new Map([
            ["C", 1],
            ["A", 2],
            ["E", 3],
            ["B", 4],
            ["D", 5]
        ]);
        const b6: Ballot = new Map([
            ["C", 1],
            ["B", 2],
            ["A", 3],
            ["D", 4],
            ["E", 5]
        ]);
        const b7: Ballot = new Map([
            ["D", 1],
            ["E", 2],
            ["C", 3],
            ["B", 4],
            ["A", 5]
        ]);
        const b8: Ballot = new Map([
            ["E", 1],
            ["B", 2],
            ["A", 3],
            ["D", 4],
            ["C", 5]
        ]);

        const s = new Schulze(candidates);
        s.addBallot(b1, 5);
        s.addBallot(b2, 5);
        s.addBallot(b3, 8);
        s.addBallot(b4, 3);
        s.addBallot(b5, 7);
        s.addBallot(b6, 2);
        s.addBallot(b7, 7);
        s.addBallot(b8, 8);
        const ranked = s.rank();
        const expected = ['E', 'A', 'C', 'B', 'D'];
        expect(ranked).to.eql(expected);
    });

    it("Wikipedia: Dropping Last", () => {
        const candidates = new Set(["A", "B", "C", "D", "E"]);
        const b1: Ballot = new Map([
            ["A", 1],
            ["C", 2],
            ["B", 3],
            ["E", 4]
        ]);
        const b2: Ballot = new Map([
            ["A", 1],
            ["D", 2],
            ["E", 3],
            ["C", 4]
        ]);
        const b3: Ballot = new Map([
            ["B", 1],
            ["E", 2],
            ["D", 3],
            ["A", 4]
        ]);
        const b4: Ballot = new Map([
            ["C", 1],
            ["A", 2],
            ["B", 3],
            ["E", 4]
        ]);
        const b5: Ballot = new Map([
            ["C", 1],
            ["A", 2],
            ["E", 3],
            ["B", 4]
        ]);
        const b6: Ballot = new Map([
            ["C", 1],
            ["B", 2],
            ["A", 3],
            ["D", 4]
        ]);
        const b7: Ballot = new Map([
            ["D", 1],
            ["E", 2],
            ["C", 3],
            ["B", 4]
        ]);
        const b8: Ballot = new Map([
            ["E", 1],
            ["B", 2],
            ["A", 3],
            ["D", 4]
        ]);

        const s = new Schulze(candidates);
        s.addBallot(b1, 5);
        s.addBallot(b2, 5);
        s.addBallot(b3, 8);
        s.addBallot(b4, 3);
        s.addBallot(b5, 7);
        s.addBallot(b6, 2);
        s.addBallot(b7, 7);
        s.addBallot(b8, 8);
        const ranked = s.rank();
        const expected = ['E', 'A', 'C', 'B', 'D'];
        expect(ranked).to.eql(expected);
    });

    it("Wikipedia: Unanimous", () => {
        const candidates = new Set(["A", "B", "C", "D", "E"]);
        const b1: Ballot = new Map([
            ["A", 1],
            ["C", 2],
            ["B", 3],
            ["E", 4],
            ["D", 5]
        ]);

        const s = new Schulze(candidates);
        s.addBallot(b1, 50);
        const ranked = s.rank();
        const expected = ["A", "C", "B", "E", "D"];
        expect(ranked).to.eql(expected);
    });
});
