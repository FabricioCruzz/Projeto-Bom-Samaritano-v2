import React from 'react'
import Select from 'react-select'


const CustomSelect = ({ options, field, form }) => {

    const defaultValue = (options, value) => {
        return options ? options.find(option => option.value === value) : ""
    }

    return (
        <Select
            options={ options }
            name={ field.name }
            value={ defaultValue(options, field.value) }
            onChange={ option => form.setFieldValue(field.name, option.value) }
            onBlur={ field.onBlur }
        />
    )
}

export default CustomSelect