import React from 'react'
import { NavLink } from "react-router-dom";

export default class Default extends React.Component {

    isHome = () => window.location.pathname === '/'

    render () {
        return (
            <div className="layout-default">
                {!this.isHome() ? (
                    <div className="nav-block">
                        <div className="go-home-block">
                            <NavLink to='/' className='btn-go-home'>Go Home</NavLink>
                        </div>
                    </div>
                ) : ''}
                <div className="content-block">{this.props.children}</div>
            </div>
        )
    }
}
