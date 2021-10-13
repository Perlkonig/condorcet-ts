import { Candidate, CondorcetBase } from "./CondorcetBase";
export declare class RankedPair extends CondorcetBase {
    constructor(c: Set<Candidate>);
    private calcPairs;
    rank(): Candidate[];
}
