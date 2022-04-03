import React from 'react'
import { CATEGORY } from '../categories'
import { SITE_INFO } from '../constants'
import ROUTES_DATA from '../routes/routesData'

class Home extends React.Component {
    categoryRenderer (categories) {
        if (!categories);

        return categories.map((item, key) => {
            return (
                <React.Fragment key={key}>
                    <h2>{item.title}:</h2>
                    <ul>
                        {this.listLinkRenderer(item.children)}
                    </ul>
                </React.Fragment>
            )
        })
    }

    listLinkRenderer = (routes) => {
        return routes.map((route, index) => {
            if (['*', '/'].includes(route.path)) return ''
            return (
                <li key={index}>
                    <a href={route.path}>{route.title || ''}</a>
                </li>
            )
        })
    }

    render () {
        const categorize = CATEGORY;

        for (let i = 0; i < categorize.length; i++) {
            let category = categorize[i];
            category.children = [];

            for (let j = 0; j < ROUTES_DATA.length; j++) {
                let routeData = ROUTES_DATA[j]
                
                if (category.type === routeData.category) {
                    category.children.push(routeData);
                }
            }
        }
        return (
            <div className='home'>
                <h1 className='site-name'>{SITE_INFO.siteName}</h1>
                {this.categoryRenderer(categorize)}
            </div>
        )
    }
}

export default Home
