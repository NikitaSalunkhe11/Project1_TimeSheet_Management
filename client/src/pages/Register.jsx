import { useState } from "react";
import { useForm } from "react-hook-form";
import avtar from "../images/avtar.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Button,
  TextField,
  Link,
  Box,
  Typography,
  Container,
} from "@mui/material";
import ApiInstance from "../ApiInstance";
import { useNavigate } from "react-router-dom";
import Google from "../components/Google";
import Linkedin from "../components/Linkedin";
import Facebook from "../components/Facebook";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const password = watch("password");
  const [formReset, setFormReset] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    const data = {
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
    };

    try {
      await ApiInstance.post("/auth/register", data);
      toast.success("Registration successful. Thank you!");
      reset();
      setFormReset(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Wait for 2 seconds before navigating to the login page
    } catch (error) {
      console.error(
        "Error registering user",
        error.response?.data || error.message
      );
      toast.error(`Registration failed: ${error.response?.data?.error || "Unknown error"}`);
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
              Registration
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
                id="fullName"
                label="Full Name"
                name="fullName"
                autoComplete="name"
                autoFocus
                {...register("fullName", { required: "Full Name is required" })}
                error={!!errors.fullName}
                helperText={errors.fullName ? errors.fullName.message : ""}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
              />
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
                register
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <Linkedin/>
              <Google/>
              <Facebook/>
            </Box>
            <Link
              href="#"
              variant="body2"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              Already have an account?
              <p style={{ color: "#A767E7", fontWeight: "bolder" }} onClick={() => navigate("/login")}>Login</p>
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

export default Register;
