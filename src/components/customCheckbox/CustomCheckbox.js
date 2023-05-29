import React from "react";
import CheckboxButton from "./CheckboxButton";

const CustomCheckbox = ({ options, field, form }) => {
  const handleChange = (e) => {
    const { checked, name, value } = e.target;

    if (String(name).includes("dependents")) {
      let nameString = String(name).split(".");
      let index = nameString[0].substring(11, 12); // returns [index]
      let dependent = form.values["dependents"][index];
      let fieldValue = dependent[nameString[1]];

      return checked
        ? form.setFieldValue(field.name, [...fieldValue, value])
        : form.setFieldValue(
            field.name,
            fieldValue.filter((v) => v !== value)
          );
    }

    return checked
      ? form.setFieldValue(field.name, [...form.values[name], value])
      : form.setFieldValue(
          field.name,
          form.values[name].filter((v) => v !== value)
        );
  };

  return (
    <CheckboxButton
      options={options}
      name={field.name}
      onChange={handleChange}
      onBlur={field.onBlur}
    />
  );
};

export default CustomCheckbox;
