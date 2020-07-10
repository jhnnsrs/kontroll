import { BasePort } from "./BasePort";
import { DiagramEngine } from "@projectstorm/react-diagrams";
import { AbstractModelFactory } from '@projectstorm/react-canvas-core';


export class BasePortFactory extends AbstractModelFactory<BasePort, DiagramEngine> {
	constructor() {
		super('base');
	}

	generateModel(): BasePort {
		return new BasePort({
			name: 'unknown',
			key: "failure",
			required: false,
		});
	}
}