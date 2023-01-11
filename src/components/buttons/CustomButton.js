import React from 'react'
import './CustomButton.scss'

const CustomButton = (props, { children }) => {
    
    const componentClasses = `btnComponent ${ props.className }`
    
    return (
        <button
        className={ componentClasses }
        style={ {width: props.width + 'px', height: props.heigth + 'px'} }
        type={ props.type }
        onClick={ props.onClick }
        >
            { props.value }
            { children }
        </button>
    )
}

export default CustomButton