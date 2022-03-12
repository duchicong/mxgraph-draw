import React from 'react'
import WrapperInfomation from '../components/WrapperInfomation'

const info = {
    author: 'CongDC',
    email: 'duconggpdg@gmail.com',
    example: 'Anchor Example',
    source: 'https://github.com/jgraph/mxgraph/blob/master/javascript/examples/anchors.html'
}
class Anchor extends React.Component {
    constructor () {
        super();
        this.author = 'aaa';
    }

    render () {
        return (
            <WrapperInfomation info={info}>
                <div className='Anchor'>anchor</div>
            </WrapperInfomation>
        )
    }
}

export default Anchor
