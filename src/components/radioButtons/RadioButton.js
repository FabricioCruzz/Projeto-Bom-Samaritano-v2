import React from 'react'
import get from 'lodash/get'

const RadioButons = ({
          id,
          label = '',
          form: { values, touched, errors },
          field,
          disabled = false,
          className,
}) => {
        const currentFormValue = get(values, field.name);
      
        return (
          <div className={ className }>
            <input
              checked={currentFormValue === field.value}
              {...field}
              type="radio"
              id={id}
              disabled={disabled}
            />
            <label htmlFor={id}>
              {label}
            </label>
          </div>
        );
      }

export default RadioButons