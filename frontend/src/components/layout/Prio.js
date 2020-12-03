import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function RadioButtonsGroup() {
  const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl component="fieldset" >
      <FormLabel component="legend">Priorität</FormLabel>
      <RadioGroup row aria-label="gender" name="priority" value={value} onChange={handleChange}>
        <FormControlLabel value="Prio 1" control={<Radio />} label="Prio 1" />
        <FormControlLabel value="Prio 2" control={<Radio />} label="Prio 2" />
        <FormControlLabel value="Prio 3" control={<Radio />} label="Prio 3" />
      </RadioGroup>
    </FormControl>
  );
}
