import { type } from "os";
import { title } from "process";
import React from "react";

interface InputFieldProps{
  size: string,
  type: string,
  title: string,
  name: string,
  value?: string,
  disabled?: boolean,
  placeholder: string,
  handleChange: (e: any) => void
}

const InputField: React.FC<InputFieldProps> = ({
  size,
  type,
  title,
  name,
  value,
  disabled,
  placeholder,
  handleChange
}) => {
  return (
    <div className={`col-12 col-xl-${size}`}>
      <div className="form__group">
        <label htmlFor={name} className="form__label">
          {title}
        </label>
        <input
          type="type"
          id={name}
          name={name}
          className="form__input"
          onChange={handleChange}
          placeholder={placeholder}
          value={value}
          disabled={disabled} />
      </div>
    </div>
  )
};

export default InputField;
