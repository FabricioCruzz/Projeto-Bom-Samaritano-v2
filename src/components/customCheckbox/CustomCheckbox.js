import React from 'react'
import CheckboxButton from './CheckboxButton'

const CustomCheckbox = ({ options, field, form }) => {  

    const handleChange = e => {
        const { checked, name, value } = e.target
        return checked 
        ? form.setFieldValue(field.name, [ ...(form.values)[name], value ])
        : form.setFieldValue(field.name, ((form.values)[name]).filter(v => v !== value))

    }


  return (
    <CheckboxButton
      options={ options }
      name={ field.name }
      onChange={ handleChange }
      onBlur={ field.onBlur }
    />
  )
}

export default CustomCheckbox