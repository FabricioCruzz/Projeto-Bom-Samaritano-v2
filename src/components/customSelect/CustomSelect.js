import React from 'react'
import Select from 'react-select'

const CustomSelect = ({ id, options, field, form }) => {

    const selectClassName = 'custom-select'
    const selectClassPlaceholder = 'custom-select-placeholder'
    const selectPlaceholder = 'Selecione uma opção...'

    const customTheme = theme => {
        return {
            ...theme,
            colors: {
                ...theme.colors,
                primary25: '#ec847d',
                primary: '#ec847db3',
            }
        }
    }

    const defaultValue = (options, value) => {
        return options ? options.find(option => option.value === value) : ""
    }

    return (
        <>
            <Select
                theme={ customTheme }
                options={ options }
                className={ selectClassName }
                inputId={ id }
                name={ field.name }
                placeholder={ <div className={ selectClassPlaceholder }>{ selectPlaceholder }</div> }
                value={ defaultValue(options, field.value) }
                onChange={ option => form.setFieldValue(field.name, option.value) }
                onBlur={ field.onBlur }
            />
        </>
    )
}

export default CustomSelect