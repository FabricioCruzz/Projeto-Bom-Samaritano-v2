import React from 'react'

const Input = props => {
    
    const componentClasses = props.className

    const handleChange = e => {        
        props.onChange(e.target.value)
    }

    return (
        <input
        className={ componentClasses }
        name={ props.name }
        type={ props.type }
        placeholder={ props.placeholder }
        onChange={ handleChange }
        />
        
    )
}

export default Input