import React from 'react'

export default class Default extends React.Component {

    isHome = () => window.location.pathname === '/'

    render () {
        return (
            <div className="layout-default">
                {!this.isHome() ? (
                    <div className="nav-block">
                        <div className="go-home-block">
                            <a href='/' className='btn-go-home'>Go Home</a>
                        </div>
                    </div>
                ) : ''}
                <div className="content-block">{this.props.children}</div>
            </div>
        )
    }
}
