// boolean
const BooleanField = (props) => {
  const { dataItem, field } = props;
  const isTruthy = dataItem[field];
  const color = isTruthy ? 'green' : 'red';
  return (
    <td>
      <p style={{ color }}>{isTruthy ? 'Yes' : 'No'}</p>
    </td>
  );
};

// Date
const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const DateField = (props) => {
  const { dataItem, field } = props;
  const date = new Date(dataItem[field]);
  return (
    <td>
      <p>{date.toLocaleString('en-US', options)}</p>
    </td>
  );
};

const FieldExtension = {
  BooleanField,
  DateField,
};

export default FieldExtension;
