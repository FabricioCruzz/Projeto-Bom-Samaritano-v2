import React from 'react'

const CheckboxButton = ({ options, name, onChange, onBlur }) => {
  
  const renderOptions = options.map(option => {

    return (
      <div key={ option.label }>
          <input type="checkbox"
          id={ option.value }
          name={ name }
          value={ option.value }
          onChange={ onChange }
          onBlur={ onBlur }
          />
        <label htmlFor={ option.value }>{ option.label }</label>
        </div>
      )
    })

    return (
        <div>
          { renderOptions }
        </div>
    )
}

export default CheckboxButton