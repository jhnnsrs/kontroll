import React, {useRef, useState, useLayoutEffect, useEffect, RefObject} from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import useComponentSize from '@rehooks/component-size'


export const BodyWidget = (props: { engine: DiagramEngine}) => {

    
    let ref = useRef(null)
    let size = useComponentSize(ref)


	return (
        <div ref={ref}>
		    <div style={{height: 700, width: size.width}} className="bg-dark">
                <CanvasWidget className="diagram-container bg-dark" engine={props.engine} />
            </div>
        </div>
    )
}