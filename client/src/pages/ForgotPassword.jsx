import { useForm } from "react-hook-form";
import avtar from "../images/purpale.jpg";
import { Button, TextField, Link, Box, Typography, Container } from "@mui/material";
import ApiInstance from "../ApiInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async ({ email }) => {
    try {
      const response = await ApiInstance.post("/forgot/forgot-password", { email });

      if (response.status === 200) {
        toast.success("OTP sent to email");
        setTimeout(() => {
          navigate("/email-verification", { state: { email } });
        }, 2000);
      }
    } catch (error) {
      toast.error("Error sending mail");
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
              Forgot Password
            </Typography>
            <Link
              variant="body2"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textDecoration: "none",
                cursor: "pointer",
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
                Send OTP
              </Button>

              <Link
                variant="body2"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                Already have an account?
                <p
                  style={{ color: "#A767E7", fontWeight: "bolder" }}
                  onClick={() => navigate("/login")}
                >
                  Login
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

export default ForgotPassword;
