const express = require("express");
const app = express();
const dotenv = require("dotenv");
const DbConnect = require("./config/dbConnect");
const AuthRouter = require("./routes/auth.route");
const taskRoutes = require("./routes/taskRoutes");
const ForgotPasswordRouter = require("./routes/forgotPassword.route")
const cors = require("cors")
const addEmployeeRoutes = require("./routes/addEmployee.route");

dotenv.config();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true 
}));

// authentication routes
app.use("/auth", AuthRouter);

// forgot-password routes
app.use('/forgot',ForgotPasswordRouter);

// add_employee Routes
app.use("/api", addEmployeeRoutes);

//add task routes
app.use('/api', taskRoutes);

app.listen(port, () => {
  console.log(`server listening on ${port}`);
  DbConnect();
});

