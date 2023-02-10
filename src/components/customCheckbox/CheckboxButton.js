import React from 'react'

const CheckboxButton = ({ options, name, onChange, onBlur }) => {
  
  const classNameCheckboxBtn = 'checkbox-btn-component'
  
  const renderOptions = options.map(option => {
    
    return (
      <div className={ classNameCheckboxBtn } key={ option.label }>
          <input type="checkbox"
          id={ `${ name }-${ option.value }` }
          name={ name }
          value={ option.value }
          onChange={ onChange }
          onBlur={ onBlur }
          />
        <label htmlFor={ `${ name }-${ option.value }` }>{ option.label }</label>
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