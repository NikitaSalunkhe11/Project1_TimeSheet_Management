import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";

const FormSelect = ({ label, name, value, onChange, error, helperText, options }) => {
  return (
    <FormControl fullWidth error={error} variant="outlined">
      <InputLabel>{label}</InputLabel>
      <Select name={name} value={value} onChange={onChange} label={label}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default FormSelect;
