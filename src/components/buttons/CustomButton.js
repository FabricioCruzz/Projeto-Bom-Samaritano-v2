import React from 'react'
import './CustomButton.scss'

const CustomButton = props => {
    return (
        <button
        className="btnComponent"
        style={ {width: props.width + 'px', height: props.heigth + 'px'} }
        type={ props.type }
        >
            { props.value }
        </button>
    )
}

export default CustomButton