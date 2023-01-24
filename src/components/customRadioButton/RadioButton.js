import React from 'react'

const RadioButton = ({ options, name, onChange, onBlur }) => {
  
  const renderMap = options.map(option => {
        
    return (
      <div key={ option.label }>
          <input type="radio"
          id={ option.value }
          name={ name }
          value={ option.value }
          onChange={ e => onChange(e.target) }
          onBlur={ onBlur }
          />
        <label htmlFor={ option.value }>{ option.label }</label>
        </div>
      )
    })

    return (
        <div>
          {renderMap}
        </div>
    )
}

export default RadioButton