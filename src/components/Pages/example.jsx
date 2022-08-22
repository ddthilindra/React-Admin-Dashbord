import { DropDownList } from "@progress/kendo-react-dropdowns";
import React from "react";
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const Example = () => {
    const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const sizes = ["X-Small", "Small", "Medium", "Large", "X-Large", "2X-Large"];
  return (
    <div>
      <div style={{"margin-left": "18vw"}}>
        <div>T-shirt size:</div>
        <DropDownList
          style={{
            width: "300px",
          }}
          data={sizes}
        />


      </div>
    </div>
  );
};

export default Example;
