interface Props {
  value: string;
  onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  name: string;
}

const Filter = ({ value, onFilterChange, title, name }: Props) => (
  <div>
    <label>
      {title}
      <input type="text" name={name} value={value} onChange={onFilterChange} />
    </label>
  </div>
);
export default Filter;
