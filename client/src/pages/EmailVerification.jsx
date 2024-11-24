import { useForm } from "react-hook-form";
import avtar from "../images/purpale.jpg";
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  Link,
} from "@mui/material";
import ApiInstance from "../ApiInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const EmailVerification = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    } else {
      navigate("/forgot-password"); // Redirect if no email is found in the state
    }
  }, [location, navigate]);

  const onSubmit = async (data) => {
    try {
      const response = await ApiInstance.post("/forgot/verify-otp", { otp: data.otp, email });

      if (response.status === 200) {
        toast.success("OTP verified");
        setTimeout(() => {
          navigate("/change-password", { state: { email } });
        }, 2000);
      }
    } catch (error) {
      toast.error("Invalid or expired OTP");
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Box
        sx={{
          backgroundColor: "#A767E7",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            height: "90vh",
            width: "90vw",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "8px",
            padding: "16px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
          }}
        >
          <Container
            sx={{
              border: "1px solid #000",
              height: "100%",
              flex: "2",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontWeight: "bolder",
                textAlign: "center",
              }}
              component="h1"
              variant="h5"
            >
              Email Verification
            </Typography>
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textDecoration: "none",
                cursor: "pointer",
                marginTop: "20px"
              }}
            >
              Please enter the 4-digit code that was sent to your email address.
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{
                width: "100%",
                maxWidth: "400px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="otp"
                label="OTP"
                name="otp"
                {...register("otp", {
                  required: "OTP is required",
                  pattern: {
                    value: /^\d{4}$/,
                    message: "OTP must be a 4-digit number",
                  },
                })}
                error={!!errors.otp}
                helperText={errors.otp ? errors.otp.message : ""}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "#A767E7",
                  fontSize: "20px",
                  fontWeight: "900",
                  mt: 2,
                  "&:hover": {
                    backgroundColor: "#A767E7", // Keep the color the same on hover
                  },
                }}
              >
                Change Password
              </Button>
              <Link
                variant="body2"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textDecoration: "none",
                }}
              >
                Doesn&apos;t receive code,{" "}
                <p
                  style={{ color: "#A767E7", fontWeight: "bolder", cursor: "pointer" }}
                >
                  Resend
                </p>
              </Link>
            </Box>
          </Container>

          <Container
            component="img"
            sx={{
              height: "auto",
              flex: "4",
              width: "50%",
              maxWidth: "400px",
              maxHeight: "400px",
            }}
            alt="Illustration"
            src={avtar}
          />
        </Box>
      </Box>
    </>
  );
};

export default EmailVerification;
