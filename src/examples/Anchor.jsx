import React from 'react'
import WrapperInfomation from '../components/WrapperInfomation'
import { Graph, CellState, Rubberband } from '../core-extend'
import { mxEvent, mxClient, mxUtils, mxConstants } from '../core-extend/factory'

const info = {
    author: 'CongDC',
    email: 'duconggpdg@gmail.com',
    example: 'Anchor Example',
    source: 'https://github.com/jgraph/mxgraph/blob/master/javascript/examples/anchors.html'
}
class Anchor extends React.Component {
    constructor () {
        super();
        this.containerRef = React.createRef()
    }

    main = (container) => {
        // Checks if the browser is supported
        if (!mxClient.isBrowserSupported())
        {
            // Displays an error message if the browser is not supported.
            mxUtils.error('Browser is not supported!', 200, false);
        }
        else
        {
            // Disables the built-in context menu
            mxEvent.disableContextMenu(container);

            // Creates the graph inside the given container
            let graph = new Graph(container);
            graph.setConnectable(true);

            // Specifies the default edge style
            var style = graph.getStylesheet().getDefaultEdgeStyle()['edgeStyle'] = 'orthogonalEdgeStyle';
            console.log('run1');
            // Enables connect preview for the default edge style
            // graph.eventHandler.createEdgeState = function(me)
            // {
            //     console.log('run2');
            //     console.log('style ', style)
            //     style[mxConstants.STYLE_FONTCOLOR] = '#000'
            //     style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_LEFT
            //     var edge = graph.createEdge(null, null, null, null, null, style);
                
            //     return new CellState(this.graph.view, this.graph.getCellStyle(edge), edge);
            // };
            
            
            // Enables rubberband selection
            new Rubberband(graph);
            
            // Gets the default parent for inserting new cells. This
            // is normally the first child of the root (ie. layer 0).
            let parent = graph.getDefaultParent();
                            
            // Adds cells to the model in a single step
            graph.getModel().beginUpdate();
            try
            {
                var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30);
                var v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30);
                var e1 = graph.insertEdge(parent, null, 'edge label', v1, v2);
            }
            finally
            {
                // Updates the display
                graph.getModel().endUpdate();
            }
        }
    }

    componentDidMount () {
        this.main(this.containerRef.current);
    }

    render () {
        return (
            <WrapperInfomation info={info}>
                <div className='Anchor' ref={this.containerRef} />
            </WrapperInfomation>
        )
    }
}

export default Anchor
