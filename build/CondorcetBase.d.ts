export declare type Candidate = string | number;
export declare type Ballot = Map<Candidate, number>;
export declare type CandidateCount = Map<Candidate, number>;
export declare abstract class CondorcetBase {
    protected candidates: Set<Candidate>;
    protected ballots: Ballot[];
    constructor(c: Set<Candidate>);
    abstract rank(): Candidate[];
    addBallot(b: Ballot, weight?: number): number;
    protected calcD(): Map<Candidate, CandidateCount>;
}
