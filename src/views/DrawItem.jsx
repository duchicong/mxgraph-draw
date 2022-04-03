import React from 'react';
import WrapperInfomation from "../components/WrapperInfomation";
import { Graph } from '../core-extend';

const info = {
    author: 'CongDC',
    email: 'duconggpdg@gmail.com',
    category: 'me',
    example: 'Animation example',
    source: 'https://jgraph.github.io/mxgraph/javascript/examples/animation.html'
}

export default class DrawItem extends React.Component {
    constructor (props) {
        super (props);
        this.containerRef = React.createRef();
    }

    render () {
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
    }
}
