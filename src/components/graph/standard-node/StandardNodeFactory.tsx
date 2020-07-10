  
import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { StandardNodeModel } from './StandardNodeModel';
import { StandardNodeWidget } from './StandardNodeWidget';

export class StandardNodeFactory extends AbstractReactFactory<StandardNodeModel, DiagramEngine> {
	constructor() {
		super('standard-node');
	}

	generateModel(initialConfig: any) {
		return new StandardNodeModel();
	}

	generateReactWidget(event: any): JSX.Element {
		return <StandardNodeWidget engine={this.engine as DiagramEngine} node={event.model} />;
	}
}