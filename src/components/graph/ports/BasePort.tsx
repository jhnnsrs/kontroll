import {
	LinkModel,
	PortModel,
	PortModelAlignment,
	PortModelGenerics,
	PortModelOptions
} from '@projectstorm/react-diagrams-core';
import { AbstractModelFactory, DeserializeEvent } from '@projectstorm/react-canvas-core';
import { DefaultLinkModel } from '@projectstorm/react-diagrams';

export interface BasePortModelOptions extends PortModelOptions {
	label?: string;
	description?: string,
	required: boolean,
	default?: any,
	in?: boolean;
	key: string
}

export interface BasePortModelGenerics extends PortModelGenerics {
	OPTIONS: BasePortModelOptions;
}

export class BasePort extends PortModel<BasePortModelGenerics> {
	description?: string

	constructor(options: BasePortModelOptions){
		super({
			label: options.label || options.name,
			alignment: options.in ? PortModelAlignment.LEFT : PortModelAlignment.RIGHT,
			type: 'base',
			...options
		});
	}

	deserialize(event: DeserializeEvent<this>) {
		super.deserialize(event);
		this.options.in = event.data.in;
		this.options.label = event.data.label;
		this.options.description = event.data.description
		this.options.required = event.data.required
		this.options.key = event.data.key
	}

	serialize() {
		return {
			...super.serialize(),
			in: this.options.in,
			label: this.options.label,
			description: this.options.description,
			required: this.options.required,
			default: this.options.default,
			key: this.options.key,
		};
	}

	link<T extends LinkModel>(port: PortModel, factory?: AbstractModelFactory<T>): T {
		let link = this.createLinkModel(factory);
		link.setSourcePort(this);
		link.setTargetPort(port);
		return link as T;
	}

	canLinkToPort(port: PortModel): boolean {
		if (port instanceof BasePort) {
			return this.options.in !== port.getOptions().in;
		}
		return true;
	}

	createLinkModel(factory?: AbstractModelFactory<LinkModel>): LinkModel {
		let link = super.createLinkModel();
		if (!link && factory) {
			return factory.generateModel({});
		}
		return link || new DefaultLinkModel();
	}
}