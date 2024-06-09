import React, { useState } from 'react';
import '../../css/select_input.css'
const SelectInput = ({ options, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(options[0].value);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <div className="select-box">
      <div className="select-box__current" tabIndex="1">
        {options.map((option, index) => (
          <div key={index} className="select-box__value">
            <input
              className="select-box__input"
              type="radio"
              id={index}
              value={option.value}
              name={option.name}
              checked={option.value === selectedValue}
              onChange={handleChange}
            />
            <p className="select-box__input-text">{option.label}</p>
          </div>
        ))}
        <img className="select-box__icon" src="http://cdn.onlinewebfonts.com/svg/img_295694.svg" alt="Arrow Icon" aria-hidden="true" />
      </div>
      <ul className="select-box__list">
        {options.map((option, index) => (
          <li key={index}>
            <label className="select-box__option" htmlFor={index} aria-hidden="aria-hidden">{option.label}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectInput;
