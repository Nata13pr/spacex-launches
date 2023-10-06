import React from "react";

interface Props {
  value: string;
  onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
}

const Filter = ({ value, title, onFilterChange }: Props) => (
  <div>
    <label>
      {title}
      <input type="text" value={value} onChange={onFilterChange} />
    </label>
  </div>
);
export default Filter;
