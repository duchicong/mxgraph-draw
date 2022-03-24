import { mxGraph, mxCell, mxGeometry } from "./factory";
import GraphEventHandler from "./GraphEventHandler";

export default class Graph extends mxGraph {
    constructor (container) {
        super(container);
        this.eventHandler = new GraphEventHandler(this);
    }

    getAllConnectionConstraints = (terminal, source) => {
        if (terminal != null && terminal.shape != null)
        {
            if (terminal.shape.stencil != null)
            {
                if (terminal.shape.stencil.constraints != null)
                {
                    return terminal.shape.stencil.constraints;
                }
            }
            else if (terminal.shape.constraints != null)
            {
                return terminal.shape.constraints;
            }
        }

        return null;
    }

    /**
     * Overide func createEdge
     * 
     * Parameters:
     * 
     * parent - <mxCell> that specifies the parent of the new edge.
     * id - Optional string that defines the Id of the new edge.
     * value - JavaScript object to be used as the user object.
     * source - <mxCell> that defines the source of the edge.
     * target - <mxCell> that defines the target of the edge.
     * style - Optional string that defines the cell style.
     */
    createEdge = function(parent, id, value, source, target, style) {
        // Creates the edge
        var edge = new mxCell(value, new mxGeometry(), style);
        edge.setId(id);
        edge.setEdge(true);
        edge.geometry.relative = true;
        
        return edge;
    };
}