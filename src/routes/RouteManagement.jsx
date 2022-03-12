import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import React from 'react'
import DefaultLayout from "../layouts/Default"

import routesData from './routesData'

class RouteManagement extends React.Component {

    /* render routes */
    handlerRenderLinks = () => {
        if (!routesData) return
        return routesData.map((route, index) => {
            return <Route key={index} path={route.path} element={route.component}/>
        })
    }

    render () {
        return (
            <Router>
                <DefaultLayout>
                    <Routes>
                        {this.handlerRenderLinks()}
                    </Routes>
                </DefaultLayout>
            </Router>
        )
    }
}

export default RouteManagement
