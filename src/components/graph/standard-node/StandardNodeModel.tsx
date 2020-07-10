import { NodeModel, DefaultPortModel, DefaultNodeModel, PortModelAlignment, NodeModelGenerics } from '@projectstorm/react-diagrams';
import { BaseModelOptions } from '@projectstorm/react-canvas-core';
import { NodeType, ModelPortType, PortType, Maybe, GraphNodeQuery, GraphNode, GraphNodeQueryVariables} from '../../../generated/graphql';
import { ModelPort } from '../ports/ModelPort';
import { IntPort } from '../ports/IntPort';
import { BasePort } from '../ports/BasePort';
import { ObjectPort } from '../ports/ObjectPort';
import { UUIDPort } from '../ports/UUIDPort';
import { FilePort } from '../ports/FilePort';
import { ListPort } from '../ports/ListPort';
import { CharPort } from '../ports/CharPort';
import { BoolPort } from '../ports/BoolPort';
import { BasePositionModelOptions, DeserializeEvent } from '@projectstorm/react-canvas-core';
import * as _ from 'lodash';

export interface StandardNodeModelOptions extends BaseModelOptions {
	// A Flow Node extends a normal Node with a selector and integrator to the Flow (see)
	selector?: string, 
	integrator?: string,


	node?: any, // The standard way to initiliaze this Node

	// This Properties are a way to deserialize the Flow
	color?: string;
	nodeid?: string,
	variety?: string,
	package?: string,
	interface?: string
	name?: string,
	description?: string,
	inputs?: any,
	outputs?: any,
}

export interface StandardNodeModelGeneric extends NodeModelGenerics {
	OPTIONS: StandardNodeModelOptions;
}


export class StandardNodeModel extends NodeModel<StandardNodeModelGeneric>{
    color: string;
	name = "hallo";
	nodeid: string
	description: string
	variety: string
	package: string
	interface: string
	selector: string
	integrator: string
	_inputports: Array<BasePort>
	_outputports: Array<BasePort>

	constructor(options: StandardNodeModelOptions = {}) {
		super({
			...options,
			type: 'standard-node'
		})
		let node = options.node
		this.selector = options.selector || "any"
		this.integrator = options.integrator || "any"
		if (node) {
			console.log("Initializing with Node")
			this.nodeid = node.id
			this.description = node.description
			this.variety = node.variety
			this.package = node.package
			this.interface = node.interface
			this.name = node.name || "Not-Set"
			this.color = node.color || "red"
			this._inputports = []
			this._outputports = []

			const inputs = node?.inputs as Array<PortType> || [] as Array<PortType>
			const outputs = node?.outputs as Array<PortType> || [] as Array<PortType>
			if (inputs) {
				inputs.map( port => {
					console.log("the port", port)
					this.addAppropriatePort(port, true)
				})
			}
			if (outputs) {
				outputs.map( port => {
					console.log("the port", port)
					this.addAppropriatePort(port, false)
				})
			}
		}
		else {
			this.color = options.color || "red"
			this.nodeid = options.nodeid || "ERROR"
			this.description = options.description || "Not set"
			this.variety = options.variety || "Not set"
			this.package = options.package || "Not set"
			this.interface = options.interface || "Not set"
			this._inputports = options.inputs
			this._outputports = options.outputs
		}

	}

	getOptions(): StandardNodeModelOptions {

		return {
			name: this.name,
			nodeid: this.nodeid,
			color: this.color,
			description: this.description,
			interface: this.interface,
			package: this.package,
			variety: this.variety,
			selector: this.selector,
			integrator: this.integrator,
		}

	}

	addAppropriatePort(port: Maybe<PortType>, isin: boolean): void {

		let alignment: PortModelAlignment = isin ? PortModelAlignment.LEFT : PortModelAlignment.RIGHT
		
		let portIdentifier = isin ? "IN_" : "OUT_"

		let general = {
			alignment: alignment,
			label: port?.name as string,
			required: port?.required as boolean,
			default: port?.default,
			key: port?.key as string,
			name:  portIdentifier + port?.key as string,
			description:  port?.description as string,
			in: isin
		}

		console.log(general)

		let newport: BasePort | false
		console.log("port", port?.__typename)
		switch (port?.__typename){
			case "ModelPortType": newport = new ModelPort({...general}); break
			case "ObjectPortType": newport = new ObjectPort({...general}); break
			case "UUIDPortType": newport = new UUIDPort({...general}); break
			case "FilePortType": newport = new FilePort({...general}); break
			case "CharPortType": newport = new CharPort({...general}); break
			case "ListPortType": newport = new ListPort({...general}); break
			case "BoolPortType": newport = new BoolPort({...general}); break
			case "IntPortType": newport = new IntPort({...general}); break
			default: newport = false
			
		}

		console.log(newport)

		if (newport) {
			this.addPort(newport)
			if (isin){
				console.log("added in")
				this._inputports.push(newport)
			}
			else {
				this._outputports.push(newport)
			}
		}

	}

	getInPorts(): Array<BasePort> {
		return this._inputports
	}

	getOutPorts(): Array<BasePort> {
		return this._outputports
	}


	serialize(): any {
		return {
			...super.serialize(),
			name: this.getOptions().name,
			color: this.getOptions().color,
			nodeid: this.getOptions().nodeid,
			selector: this.getOptions().selector,
			integrator: this.getOptions().integrator,
			package: this.getOptions().package,
			interface: this.getOptions().interface,
			variety: this.getOptions().variety,
			portsInOrder: _.map(this._inputports, port => {
				return port.getID();
			}),
			portsOutOrder: _.map(this._outputports, port => {
				return port.getID();
			})
		};
	}

	deserialize(event: DeserializeEvent<this>) {
		super.deserialize(event);
		this.name = event.data.name;
		this.color = event.data.color;
		this.nodeid = event.data.nodeid;
		this.selector = event.data.selector;
		this.interface = event.data.interface;
		this.package = event.data.package;
		this.integrator = event.data.integrator;
		this.variety = event.data.variety;
		this._inputports = _.map(event.data.portsInOrder, id => {
			return this.getPortFromID(id);
		}) as BasePort[];
		this._outputports = _.map(event.data.portsOutOrder, id => {
			return this.getPortFromID(id);
		}) as BasePort[];
	}
}