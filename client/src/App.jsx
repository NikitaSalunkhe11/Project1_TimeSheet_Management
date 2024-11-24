import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ChangePassword from "./pages/ChangePassword";
import EmailVerification from "./pages/EmailVerification";
import ForgotPassword from "./pages/ForgotPassword";
import Schedule from "./pages/Schedule";
import EmployeeProfile from "./components/EmployeeProfile";
import Employedetail from "./pages/Employedetail";
import Admindashboard from "./pages/admin/Admindashboard";
import Addproject from "./pages/admin/project/Addproject";
import AddEmployee from "./pages/admin/project/AddEmployee";
import EmployeeListPage from "./pages/admin/project/EmployeeListPage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Admindashboard />,
    },
    {
      path:"/employeeListPage",
      element:<EmployeeListPage/>
    },
    {
      path:"/addEmployee/:id",
      element:<AddEmployee />
    },
    {
      path:"/addEmployee",
      element:<AddEmployee/>
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/change-password",
      element: <ChangePassword />,
    },
    {
      path: "/email-verification",
      element: <EmailVerification />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/schedule",
      element: <Schedule />,
    },
    {
      path: "/EmployeeProfile",
      element: <EmployeeProfile />,
    },
    {
      path: "/demo",
      element: <Employedetail />,
    },
    {
      path: "/Admindashboard",
      element: <Admindashboard />,
    },
    {
      path: "/Addproject",
      element: <Addproject />,
    },
    
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;