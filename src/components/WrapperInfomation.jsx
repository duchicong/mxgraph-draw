import React from 'react'

export default class WrapperInfomation extends React.Component {
    attributes = ['author', 'email', 'source', 'link', 'title', 'description', 'example', 'category']

    /* handler convert string to capitalize */
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    categoryRenderer () {

    }
    
    /* handle wrapper infocation */
    handlerRenderer = (data) => {
        if (!data) return
        const elements = []
        for (const [key, value] of Object.entries(data)) {
            if (this.attributes.includes(key)) {
                if (key === 'source' || key === 'link') {
                    elements.push(
                        <p key={key}>
                            {this.capitalizeFirstLetter(key)}: <a href={value} className={key}>{this.capitalizeFirstLetter(value)}</a>
                        </p>
                    )
                } else if (key === 'category') {

                } else
                    elements.push(
                        <p key={key}>
                            {this.capitalizeFirstLetter(key)}: {this.capitalizeFirstLetter(value)}
                        </p>
                    )
            }
        }
        return elements
    }

    render () {

        return (
            <div className="wrapper-infomation">
                <div className="wrapper-info">
                    {this.handlerRenderer(this.props.info)}
                </div>
                <div className="wrapper-content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
