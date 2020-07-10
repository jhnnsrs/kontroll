  
import * as React from 'react';
import * as _ from 'lodash';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import styled from '@emotion/styled';
import { BasePortLabel } from '../ports/BasePortLabelWidget';
import { StandardNodeModel } from './StandardNodeModel';
import { BasePort } from '../ports/BasePort';

 const Node = styled.div<{ background: string; selected: boolean }>`
		background-color: ${p => p.background};
		border-radius: 5px;
		font-family: sans-serif;
		color: white;
		border: solid 2px black;
		overflow: visible;
		font-size: 11px;
		border: solid 2px ${p => (p.selected ? 'rgb(0,192,255)' : 'black')};
	`;

 const Title = styled.div`
		background: rgba(0, 0, 0, 0.3);
		display: flex;
		white-space: nowrap;
		justify-items: center;
	`;

const TitleName = styled.div`
		flex-grow: 1;
		padding: 5px 5px;
	`;

const Ports = styled.div`
		display: flex;
		background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2));
	`;

const PortsContainer = styled.div`
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		&:first-of-type {
			margin-right: 10px;
		}
		&:only-child {
			margin-right: 0px;
		}
	`;

export interface StandardNodeProps {
	node: StandardNodeModel;
	engine: DiagramEngine;
}

/**
 * Default node that models the DefaultNodeModel. It creates two columns
 * for both all the input ports on the left, and the output ports on the right.
 */
export const StandardNodeWidget =  (props: StandardNodeProps )  => {

	const generatePort = (port: BasePort) => {
		return <BasePortLabel engine={props.engine} port={port} key={port.getID()} />;
	};

	return (
			<Node
				data-default-node-name={props.node.getOptions().name}
				selected={props.node.isSelected()}
				background={props.node.getOptions().color as string}>
				<Title>
					<TitleName data-tip data-for={'global'+ props.node.getID()}>{props.node.getOptions().name}</TitleName>
					{/*<ReactTooltip id={'global'+ this.props.node.getID()} aria-haspopup='true' >
						 <ReactMarkdown source={this.props.node.getOptions().description}/> 
					</ReactTooltip>*/}
					
				</Title>
				<Ports>
					<PortsContainer>{_.map(props.node.getInPorts(), generatePort)}</PortsContainer>
					<PortsContainer>{_.map(props.node.getOutPorts(),generatePort)}</PortsContainer>
				</Ports>
			</Node>
		);

}