import { useForm } from "react-hook-form";
import avtar from "../images/purpale.jpg";
import {
  Button,
  TextField,
  Link,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApiInstance from "../ApiInstance";
import { useNavigate } from "react-router-dom";
import Google from "../components/Google";
import Linkedin from "../components/Linkedin";
import Facebook from "../components/Facebook";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const password = watch("password");

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const response = await ApiInstance.post("/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/"); // Navigate to the  home page after successful login
        }, 2000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  const navigate = useNavigate();

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
              Login
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

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%",
                  margin: "-10px",
                }}
              >
                <p
                  style={{
                    color: "#A767E7",
                    fontWeight: "bolder",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot Password?
                </p>
              </Box>

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
                Login
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
              Doesn&apos;t have an account?
              <p
                style={{ color: "#A767E7", fontWeight: "bolder" }}
                onClick={() => navigate("/register")}
              >
                Register
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

export default Login;
