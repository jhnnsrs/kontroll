import { DagreEngine } from "@projectstorm/react-diagrams";

export const dagreengine = new DagreEngine({
    graph: {
        rankdir: 'LR',
        ranker: 'longest-path',
        marginx: 25,
        marginy: 25
    },
    includeLinks: true
});