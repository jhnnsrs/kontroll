import { StandardNodeFactory } from "../standard-node/StandardNodeFactory";
import { BasePortFactory } from "../ports/BasePortFactory";
import createEngine, { DagreEngine, DiagramModel, PathFindingLinkFactory } from '@projectstorm/react-diagrams';


export const engine = createEngine()

// register the engines
engine.getNodeFactories().registerFactory(new StandardNodeFactory());
engine.getPortFactories().registerFactory(new BasePortFactory());

// create a diagram model
const model = new DiagramModel();

// install the model into the engine
engine.setModel(model);