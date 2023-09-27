interface Props {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  name: string;
}

const Filter = ({ value, onChange, title, name }: Props) => (
  <div>
    <label>
      {title}
      <input type="text" name={name} value={value} onChange={onChange} />
    </label>
  </div>
);
export default Filter;
