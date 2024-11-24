import { Button } from "@mui/material";
import linkedIn from "../images/linkedIn.png";

const Linkedin = () => {
  return (
    <Button
      variant="outlined"
      startIcon={<img src={linkedIn} alt="Logo" width="20" />}
      sx={{
        mt: 2,
        width: "30%",
        color: "white",
        backgroundColor: "#4267B2",
        "&:hover": {
          backgroundColor: "#4267B2",
        },
      }}
    >
      LinkedIn
    </Button>
  );
};

export default Linkedin;
