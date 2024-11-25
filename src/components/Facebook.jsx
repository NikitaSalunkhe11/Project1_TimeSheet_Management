import { Button } from "@mui/material";
import facebook from "../images/facebook.png";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";
import { toast } from "react-toastify";

const Facebook = () => {

  const facebookLogin = () => {
    const provider = new FacebookAuthProvider();
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
      startIcon={<img src={facebook} alt="Logo" width="15" />}
      sx={{
        mt: 2,
        width: "30%",
        color: "white",
        backgroundColor: "#4267B2",
        "&:hover": {
          backgroundColor: "#4267B2",
        },
      }}
      onClick={facebookLogin}
    >
      Facebook
    </Button>
  );
};

export default Facebook;
