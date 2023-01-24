import React from 'react'
import RadioButton from './RadioButton'

const CustomRadioButton = ({ options, field, form }) => {  

  return (
    <RadioButton
      options={ options }
      name={ field.name }
      onChange={ option => form.setFieldValue(field.name, option.value) }
      onBlur={ field.onBlur }
    />
  )
}

export default CustomRadioButton