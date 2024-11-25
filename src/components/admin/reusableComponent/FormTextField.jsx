import { TextField } from "@mui/material";

const FormTextField = ({ label, name, value, onChange, error, helperText, type = "text", fullWidth = true }) => {
  return (
    <TextField
      fullWidth={fullWidth}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      type={type}
      variant="outlined"
    />
  );
};

export default FormTextField;
