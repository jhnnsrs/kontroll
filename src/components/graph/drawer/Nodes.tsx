import { AllNodesQuery, AllNodes} from "../../../generated/graphql"
import { useGraphFile} from "../../../helpers"
import React from "react"
import { print } from "graphql";
import { Card} from "react-bootstrap"
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useQuery } from "@apollo/react-hooks";


export const DraggableNode = ({node, index}: {node: any, index: number}) => 
    <Draggable draggableId={node?.id as string} index={index} key={index}>
                    {(provided, snapshot) => (
                        <div key={node?.id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        >
                            <Card>
                                {}
                        {node?.name}
                            </Card>
                        </div>
                    )}
                    </Draggable>

export const Nodes = () => {

    const {data, loading, error} = useQuery<AllNodesQuery>(AllNodes)


    if (loading) return <>'Loading...'</>
    if (error) return <>'Something Bad Happened'</>

    return (
        <div>
            <Droppable droppableId="nodes">
                { provided => <div ref={provided.innerRef} {...provided.droppableProps}>
                    <div>
                    Inputs
                    { data?.nodes?.filter(node => node?.variety == "input").map( (node, index) => 
                    <DraggableNode node={node} index={index}/>)}
                    <hr/>
                    Output
                    { data?.nodes?.filter(node => node?.variety == "output").map( (node, index) => 
                    <DraggableNode node={node} index={index}/>)}
                    <hr/>
                    Others
                    { data?.nodes?.filter(node => node?.variety != "output" && node?.variety != "input" && node?.variety != "flow").map( (node, index) => 
                    <DraggableNode node={node} index={index}/>)}
                    <hr/>
                    </div>
                </div>
                }
            </Droppable>
        </div>
    )
    
}