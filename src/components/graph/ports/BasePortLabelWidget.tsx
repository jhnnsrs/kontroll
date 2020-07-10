import * as React from 'react';
import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams-core';
import { BasePort } from './BasePort';
import styled from '@emotion/styled';
import ReactTooltip from "react-tooltip";

export interface BasePortLabelProps {
	port: BasePort;
	engine: DiagramEngine;
}

const PortLabel = styled.div<any>`
		display: flex;
		margin-top: 1px;
		color: ${(props) => props.required ? "white" : "palevioletred"};
		align-items: center;
	`;

const Label = styled.div`
		padding: 0 5px;
		flex-grow: 1;
	`;

const Port = styled.div`
		width: 15px;
		height: 15px;
		background: rgba(white, 0.1);
		&:hover {
			background: rgb(192, 255, 0);
		}
	`;

export class BasePortLabel extends React.Component<BasePortLabelProps> {
	render() {
		const port = (
			<PortWidget engine={this.props.engine} port={this.props.port}>
				<Port />
			</PortWidget>
		);
		const label = <Label>{this.props.port.getOptions().label}</Label>;

		return (
			<>
			<PortLabel required={this.props.port.getOptions().required} data-tip={this.props.port.getOptions().description ? this.props.port.getOptions().description : "No Description"}>
				{this.props.port.getOptions().in ? port : label}
				{this.props.port.getOptions().in ? label : port}
				
			</PortLabel>
			<ReactTooltip />
			</>
		);
	}
}