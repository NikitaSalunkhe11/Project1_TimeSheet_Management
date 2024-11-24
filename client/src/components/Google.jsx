import { Button } from "@mui/material";
import google from "../images/google.png";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import { auth } from "./firebase";
import { toast } from "react-toastify";

const Google = () => {

  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result)=> {
      console.log(result)

      if(result.user) {
        toast.success("Logged in successfully")
        window.location.href = "/"
      }
    })
  }

  return (
    <Button
      variant="outlined"
      startIcon={<img src={google} alt="Logo" width="15" />}
      sx={{
        mt: 2,
        width: "35%",
        border: "1px solid red",
        color: "red",
        "&:hover": {
          border: "1px solid red",
        },
      }}
      onClick={googleLogin}
    >
      Google
    </Button>
  );
};

export default Google;
