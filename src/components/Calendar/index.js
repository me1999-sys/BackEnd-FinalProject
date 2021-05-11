import React,{useState} from 'react'
import DatePicker from 'react-date-picker';

const Cal = () => {
    const [value, onChange] = useState("");

  return (
    <div>
      <DatePicker
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default Cal;