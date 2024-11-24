import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import avtar from "../images/avtar.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, TextField, Link, Box, Typography, Container } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import ApiInstance from "../ApiInstance";

const ChangePassword = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const password = watch("password");

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
      const response = await ApiInstance.post("/forgot/change-password", { ...data, email });

      if (response.status === 200) {
        toast.success("Password changed successfully");
        setTimeout(() => {
          navigate("/login"); // Navigate to Login page after password change
        }, 2000);
      }
    } catch (error) {
      toast.error("Failed to change password");
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
              Create New Password
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
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                error={!!errors.confirmPassword}
                helperText={
                  errors.confirmPassword ? errors.confirmPassword.message : ""
                }
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
                    backgroundColor: "#A767E7",
                  },
                }}
              >
                Reset Password
              </Button>
            </Box>
            <Link
              variant="body2"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              Back to,
              <p
                style={{
                  color: "#A767E7",
                  fontWeight: "bolder",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/login")}
              >
                Login
              </p>
            </Link>
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

export default ChangePassword;
