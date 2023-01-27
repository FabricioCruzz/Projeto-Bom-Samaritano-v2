import React from 'react'

const CustomRadioButton = ({ field, form, label, placeholder }) => {
    
  return (
    <div>
        <label htmlFor={ field.name }>{ label }</label>
        <input
            type="text"
            id={ field.name }
            name={ field.name }
            value={ field.value }
            placeholder={ placeholder }
            onChange={ e => form.setFieldValue(field.name, e.target.value) }
            onBlur={ field.onBlur }
        />
    </div>
  )
}

export default CustomRadioButton