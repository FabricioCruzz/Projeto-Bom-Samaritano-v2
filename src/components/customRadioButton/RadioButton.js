import React from 'react'

const RadioButton = ({ options, name, onChange, onBlur }) => {
  
  const classNameRadioBtn = 'radio-btn-component'

  const renderOptions = options.map(option => {

    return (
      <div className={ classNameRadioBtn } key={ option.label }>
          <input type="radio"
          id={ `${ name }-${ option.value }`}
          name={ name }
          value={ option.value }
          onChange={ e => onChange(e.target) }
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

export default RadioButton