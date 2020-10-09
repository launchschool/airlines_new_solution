import React from "react";

const Select = ({
  options = [],
  valueKey = "",
  titleKey = "",
  value = "all",
  allTitle = "all",
  onSelect = (_) => null,
  enabledKey = undefined,
}) => {
  const handleChange = (e) => {
    e.preventDefault();
    onSelect(e.target.value);
  };
  let optionElements = options.map((option) => {
    const value = option[valueKey];
    const enabled = enabledKey === undefined || !!option[enabledKey];
    return (
      <option key={value} value={value} disabled={!enabled}>
        {option[titleKey]}
      </option>
    );
  });
  optionElements.unshift(
    <option key="all" value="all">
      {allTitle}
    </option>
  );

  return (
    <select value={value} onChange={handleChange}>
      {optionElements}
    </select>
  );
};

export default Select;
