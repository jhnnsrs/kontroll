import * as React from 'react';
import './style.css';
import { Droppable } from 'react-beautiful-dnd';
import { BodyWidget } from './BodyWidget';
import { DiagramEngine } from '@projectstorm/react-diagrams';



export const Diagram = (props: { engine: DiagramEngine} ) => {


	return <Droppable droppableId="list">
		{provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
				<BodyWidget engine={props.engine} />
          </div>
        )}</Droppable>;
	
}
