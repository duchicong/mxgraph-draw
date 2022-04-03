import React from "react";
import WrapperInfomation from "../components/WrapperInfomation";
import { Graph, Point } from '../core-extend';

const info = {
    author: 'CongDC',
    email: 'duconggpdg@gmail.com',
    example: 'Animation example',
    source: 'https://jgraph.github.io/mxgraph/javascript/examples/animation.html'
}
export default class Animation extends React.Component {
    constructor() {
        super();
        this.containerRef = React.createRef()
    }

    main(container) {
        let graph = new Graph(container);
        graph.setEnabled(false);

        let parent = graph.getDefaultParent();

        let vertexStyle = `
            shape=cylinder;strokeWidth=2;fillColor=#fff;strokeColor=black;
            gradientColor=#a0a0a0;fontColor=black;fontStyle=1;spacingTop=14;
        `;
        graph.getModel().beginUpdate();
        try {
            let source = graph.insertVertex(parent, null, 'Shape One', 20, 20, 60, 60, vertexStyle)
            let target = graph.insertVertex(parent, null, 'Shape Two', 200, 150, 60, 60, vertexStyle)
            var e1 = graph.insertEdge(parent, null, 'text', source, target);
            e1.geometry.points = [new Point(230, 50)];
            graph.orderCells(true, [e1]);
        } finally {
            // Updates the display
            graph.getModel().endUpdate();
        }

        // Adds animation to edge shape and makes "pipe" visible
        let state = graph.view.getState(e1);
        state.shape.node.getElementsByTagName('path')[0].removeAttribute('visibility');
        state.shape.node.getElementsByTagName('path')[0].setAttribute('stroke-width', '6');
        state.shape.node.getElementsByTagName('path')[0].setAttribute('stroke', 'lightGray');
        state.shape.node.getElementsByTagName('path')[0].setAttribute('class', 'flow');

    }

    componentDidMount() {
        this.main(this.containerRef.current)
    }

    render () {
        return (
            <WrapperInfomation info={info}>
                <div
                    ref={this.containerRef}
                    style={{
                        position: 'relative',
                        overflow: 'hidden',
                        width: '100%',
                        height: 'auto',
                        background: 'url("images/icons/grid.gif")',
                        cursor: 'default'
                    }}
                />
            </WrapperInfomation>
        )
    }
}
