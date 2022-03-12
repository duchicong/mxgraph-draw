import React from 'react'
import { NavLink } from "react-router-dom";

export default class NotFound extends React.Component {

    render () {
        return (
            <div className="not-found">
                Not Found!
                Go to <NavLink to='/'>home</NavLink>
            </div>
        )
    }
}
