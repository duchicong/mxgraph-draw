import React from 'react'
import WrapperInfomation from '../components/WrapperInfomation'
import { Graph, Client, Utils, Event, CellState, Rubberband } from '../core-extend'

const info = {
    author: 'CongDC',
    email: 'duconggpdg@gmail.com',
    example: 'Anchor Example',
    source: 'https://github.com/jgraph/mxgraph/blob/master/javascript/examples/anchors.html'
}
class Anchor extends React.Component {
    constructor () {
        super();
        // this.containerRef = React.createRef()
    }

    main = (container) => {
        console.log('container ', container)
        // console.log('init Client ', new Client())
        // console.log('Client ', Client)
        
        // Checks if the browser is supported
        // if (!Client.isBrowserSupported())
        // {
        //     // Displays an error message if the browser is not supported.
        //     Utils.error('Browser is not supported!', 200, false);
        // }
        // else
        // {
        //     // Disables the built-in context menu
        //     Event.disableContextMenu(container);

        //     // Creates the graph inside the given container
        //     let graph = new Graph(container);
        //     graph.setConnectable(true);
            
        //     // Enables connect preview for the default edge style
        //     graph.connectionHandler.createEdgeState = function(me)
        //     {
        //         var edge = graph.createEdge(null, null, null, null, null);
                
        //         return new CellState(this.graph.view, edge, this.graph.getCellStyle(edge));
        //     };
            
        //     // Specifies the default edge style
        //     graph.getStylesheet().getDefaultEdgeStyle()['edgeStyle'] = 'orthogonalEdgeStyle';
            
        //     // Enables rubberband selection
        //     new Rubberband(graph);
            
        //     // Gets the default parent for inserting new cells. This
        //     // is normally the first child of the root (ie. layer 0).
        //     let parent = graph.getDefaultParent();
                            
        //     // Adds cells to the model in a single step
        //     graph.getModel().beginUpdate();
        //     try
        //     {
        //         var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30);
        //         var v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30);
        //         var e1 = graph.insertEdge(parent, null, '', v1, v2);
        //     }
        //     finally
        //     {
        //         // Updates the display
        //         graph.getModel().endUpdate();
        //     }
        // }
    }

    componentDidMount () {
        // this.main(this.containerRef);
    }

    render () {
        // console.log('init Client ', new Client())
        // console.log('Client ', Client)
        return (
            <WrapperInfomation info={info}>111
                {/* <div className='Anchor' ref={this.containerRef} /> */}
            </WrapperInfomation>
        )
    }
}

export default Anchor
