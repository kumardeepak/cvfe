import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";
import React from "react";

class SimpleSelect extends React.Component {

  render() {
    const { id, MenuItemValues, handleChange, value, name } = this.props;

    return (
      <form>
        <FormControl>
          <Select
            style={{ minWidth: 145 }}
            value={value}

            onChange={handleChange}
            input={
              <OutlinedInput name={name} id={id} />
            }
          >
            {MenuItemValues &&
            MenuItemValues.map((item) => (
              <MenuItem value={item} key ={item}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </form>
    );
  }
}




export default (SimpleSelect);