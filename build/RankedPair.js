"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankedPair = void 0;
const CondorcetBase_1 = require("./CondorcetBase");
class RankedPair extends CondorcetBase_1.CondorcetBase {
    constructor(c) {
        super(c);
    }
    calcPairs(d) {
        const pairs = new Map();
        this.candidates.forEach((c1) => {
            this.candidates.forEach((c2) => {
                if (c1 !== c2) {
                    const d1 = d.get(c1);
                    const d12 = d1.get(c2);
                    const d2 = d.get(c2);
                    const d21 = d2.get(c1);
                    if (d12 > d21) {
                        const pair = [c1, c2];
                        const r = {
                            majority: d12,
                            opposition: d21
                        };
                        pairs.set(pair, r);
                    }
                }
            });
        });
        return pairs;
    }
    rank() {
        // Tally
        const d = this.calcD();
        const pairs = this.calcPairs(d);
        // Sort
        const keys = [...pairs.keys()];
        keys.sort((a, b) => {
            const aWins = pairs.get(a);
            const bWins = pairs.get(b);
            // descending
            if (aWins.majority < bWins.majority) {
                return 1;
            }
            else if (aWins.majority > bWins.majority) {
                return -1;
            }
            else {
                if (aWins.opposition < bWins.opposition) {
                    return -1;
                }
                else if (aWins.opposition > bWins.opposition) {
                    return 1;
                }
                else {
                    return 0;
                }
            }
        });
        // Lock
        let locked = [];
        keys.forEach((pair) => {
            // Check for circularity
            // This is done by seeing if the loser is already locked in as a winner.
            // If so, skip this record if this pair's majority is greater than the loser's already locked in.
            let circular = false;
            for (const l of locked) {
                if (pair[1] === l[0]) {
                    const pval = pairs.get(pair);
                    const lval = pairs.get(l);
                    if (pval.majority > lval.majority) {
                        circular = true;
                        break;
                    }
                }
            }
            if (!circular) {
                locked.push(pair);
            }
        });
        // Rank
        const ranked = [];
        // Do the following until you've exhausted the list
        while (locked.length > 0) {
            // Find source of graph
            // The source node has no entry points (find the winner who never lost)
            const winners = new Set([...locked.map((p) => { return p[0]; })]);
            const losers = new Set([...locked.map((p) => { return p[1]; })]);
            const sources = [...new Set([...winners].filter(x => !losers.has(x)))];
            if (sources.length !== 1) {
                throw new Error("More than one graph source was found. This should never happen.");
            }
            const source = sources[0];
            // Add that winner to the rankings
            ranked.push(source);
            // Now remove all entries from `locked` where `source` won and find the next source
            locked = locked.filter(x => x[0] !== source);
        }
        // Check for missing candidates.
        // If found, add them to the bottom of the ranking in the order provided to the constructor.
        // This happens in unanimous cases, at least. Needs more testing.
        if (ranked.length < this.candidates.size) {
            this.candidates.forEach((c) => {
                if (!ranked.includes(c)) {
                    ranked.push(c);
                }
            });
        }
        return ranked;
    }
}
exports.RankedPair = RankedPair;
//# sourceMappingURL=RankedPair.js.map