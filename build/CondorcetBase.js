"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CondorcetBase = void 0;
class CondorcetBase {
    constructor(c) {
        this.ballots = [];
        this.candidates = new Set(c);
    }
    addBallot(b, weight) {
        if (weight !== undefined) {
            for (let i = 0; i < weight; i++) {
                this.ballots.push(b);
            }
        }
        else {
            this.ballots.push(b);
        }
        return this.ballots.length;
    }
    calcD() {
        const d = new Map();
        this.candidates.forEach((c1) => {
            this.candidates.forEach((c2) => {
                if (c1 !== c2) {
                    if (!d.has(c1)) {
                        d.set(c1, new Map());
                    }
                    const node = d.get(c1);
                    if (node === undefined) {
                        throw new Error("Could not find the candidate. This should never happen.");
                    }
                    node.set(c2, 0);
                    d.set(c1, node);
                }
            });
        });
        this.ballots.forEach((b) => {
            this.candidates.forEach((c1) => {
                this.candidates.forEach((c2) => {
                    if (c1 !== c2) {
                        if (b.has(c1)) {
                            const r1 = b.get(c1);
                            const r2 = b.get(c2);
                            if ((r2 === undefined) || (r1 < r2)) {
                                const node = d.get(c1);
                                let num = node.get(c2);
                                num++;
                                node.set(c2, num);
                                d.set(c1, node);
                            }
                        }
                    }
                });
            });
        });
        return d;
    }
}
exports.CondorcetBase = CondorcetBase;
//# sourceMappingURL=CondorcetBase.js.map