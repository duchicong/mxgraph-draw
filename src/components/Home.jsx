import React from 'react'

import routesData from '../routes/routesData'

class Home extends React.Component {
    listLinkRenderer = () => {
        return routesData.map((route, index) => {
            if (['*', '/'].includes(route.path)) return ''
            return (
                <li key={index}>
                    <a href={route.path}>{route.title || ''}</a>
                </li>
            )
        })
    }

    render () {
        return (
            <div className='home'>
                <h1 className='site-name'>MxGraph Package</h1>
                <h2>Examples:</h2>
                <ul>{this.listLinkRenderer()}</ul>
            </div>
        )
    }
}

export default Home
