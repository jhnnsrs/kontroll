import { PortType } from "../../generated/graphql"

// THis is the actuall Flows Node  and Link ID
export type FlowNodeID = string
export type FlowLinkID = string
export type FlowPortID = string

export type NodeID = string
export type PodID = string




export type PortKey = string
export type JobID = string
export type JobInputs = any  // It would be best to let that handle by a graphql to ensure typesafety


export type FlowGraph = {
    offsetX: number;
    offsetY: number;
    zoom: number;
    gridSize: number;
    layers: {
        isSvg: boolean;
        transformed: boolean;
        models: {
            [x: string]: FlowNode | FlowLink;
        };
        type: string;
        selected: boolean;
        extras: any;
        id: string;
        locked: boolean;
    }[];
    id: string;
    locked: boolean;
}

export type FlowNode = {
    id:  FlowNodeID,
    name: string,
    color: "red"
    nodeid: NodeID,
    ports: Array<FlowPort>
}

export type FlowPort = {
    in: boolean,
    alignment: string,
    label: string,
    name: string,
    description: string,
    links: Array<FlowLink> | [],
    parentNode: FlowNodeID,
    id: FlowPortID,
    type: PortType,
    required: boolean,
    default: any,
    key: PortKey,
    x: number,
    y: number,
}

export type FlowPod = {
    id: PodID,
    node: number,

}

export type FlowLinkLabel = any
export type FlowLinkPoints = any

export type FlowLink = {
    color: string,
    curvyness: number,
    id: FlowLinkID,
    labels: Array<FlowLinkLabel>,
    points: Array<FlowLinkPoints>,
    selected: boolean,
    selectedColor: string,
    source: FlowNodeID,
    sourcePort: FlowPortID,
    target: NodeID,
    target_port: FlowPortID,
    type: string,
    width: number
}

export type FlowError = string

export type FlowState = {
    errors: Array<FlowError>,
    links: Array<FlowLink>,
    nodes: Array<FlowNode> ,
    pods: Map<NodeID, FlowPod>,
}
 