import { Candidate, CandidateCount, CondorcetBase } from "./CondorcetBase";

export class Schulze extends CondorcetBase {
    constructor(c: Set<Candidate>) {
        super(c);
    }

    private calcP(d: Map<Candidate, CandidateCount>): Map<Candidate, CandidateCount> {
        const p: Map<Candidate, CandidateCount> = new Map();

        this.candidates.forEach((c1) => {
            this.candidates.forEach((c2) => {
                if (c1 !== c2) {
                    if (! p.has(c1)) {
                        p.set(c1, new Map());
                    }
                    const node = p.get(c1);
                    if (node === undefined) {
                        throw new Error("Could not find the candidate. This should never happen.");
                    }
                    node.set(c2, 0);
                    p.set(c1, node);
                }
            });
        });

        this.candidates.forEach((c1) => {
            this.candidates.forEach((c2) => {
                if (c1 !== c2) {
                    const d1 = d.get(c1)!;
                    const d12 = d1.get(c2)!;
                    const d2 = d.get(c2)!;
                    const d21 = d2.get(c1)!;
                    if (d12 > d21) {
                        const p1 = p.get(c1)!;
                        p1.set(c2, d12);
                        p.set(c1, p1);
                    }
                }
            });
        });

        this.candidates.forEach((c1) => {
            this.candidates.forEach((c2) => {
                if (c1 !== c2) {
                    this.candidates.forEach((c3) => {
                        if ( (c3 !== c1) && (c3 !== c2) ) {
                            const p1 = p.get(c1)!;
                            const p2 = p.get(c2)!;
                            const p13 = p1.get(c3)!;
                            const p21 = p2.get(c1)!;
                            const p23 = p2.get(c3)!;
                            p2.set(c3, Math.max(p23, Math.min(p21, p13)));
                            p.set(c2, p2);
                        }
                    });
                }
            });
        });

        return p;
    }

    private countWins(p: Map<Candidate, CandidateCount>): CandidateCount {
        const wins: CandidateCount = new Map();

        this.candidates.forEach((c1) => {
            let numwins = 0;
            this.candidates.forEach((c2) => {
                if (c1 !== c2) {
                    const p1 = p.get(c1)!;
                    const p12 = p1.get(c2)!;
                    const p2 = p.get(c2)!;
                    const p21 = p2.get(c1)!;
                    if (p12 > p21) {
                        numwins++;
                    }
                }
            });
            wins.set(c1, numwins);
        });

        return wins;
    }

    public rankWithValues(): CandidateCount {
        // calculate d[V,W]
        const d = this.calcD();

        // calculate p[V,W]
        const p = this.calcP(d);

        // count wins
        const wins = this.countWins(p);

        return wins;
    }

    public rank(): Candidate[] {
        const wins = this.rankWithValues();
        const cs: Candidate[] = [...wins.keys()];
        cs.sort((a, b) => {
            const aWins = wins.get(a)!;
            const bWins = wins.get(b)!;
            // descending
            if (aWins < bWins) {
                return 1;
            } else if (aWins > bWins) {
                return -1;
            } else {
                return 0;
            }
        });
        return cs;
    }
}
