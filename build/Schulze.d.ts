import { Candidate, CandidateCount, CondorcetBase } from "./CondorcetBase";
export declare class Schulze extends CondorcetBase {
    constructor(c: Set<Candidate>);
    private calcP;
    private countWins;
    rankWithValues(): CandidateCount;
    rank(): Candidate[];
}
