import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Grid,
  Button,
  Typography,
  Paper,
  TextField,
  Divider,
} from "@mui/material";
import { Save } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import FormTextField from "../../../components/admin/reusableComponent/FormTextField";
import FormSelect from "../../../components/admin/reusableComponent/FormSelect";
import ProfilePicture from "../../../components/admin/reusableComponent/ProfilePicture";
import Sidenavbar from "../../../components/Sidenavbar";
import NavigationButtons from "../../../components/admin/reusableComponent/NavigationButtons";
import ApiInstance from "../../../ApiInstance";

const AddEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profilePicture, setProfilePicture] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  let [editEmployeeData, setEditEmployeeData] = useState({});

  editEmployeeData = {
    profilepicture: editEmployeeData.profilePicture || "",
    employeeId: editEmployeeData.employeeId || "",
    role: editEmployeeData.role || "",
    fullName: editEmployeeData.fullName || "",
    hiringDate: editEmployeeData.hiringDate || "",
    position: editEmployeeData.position || "",
    companyMail: editEmployeeData.companyMail || "",
    personalMail: editEmployeeData.personalMail || "",
    phoneNo: editEmployeeData.phoneNo || "",
    salary: editEmployeeData.salary || "",
    category: editEmployeeData.category || "",
    experienceYears: editEmployeeData.experienceYears || 0,
    birthdate: editEmployeeData. birthdate || "",
    gender: editEmployeeData.gender || "",
    bloodType: editEmployeeData.bloodType || "",
    panCardNo: editEmployeeData.panCardNo || "",
    address: editEmployeeData.address || "",
    postalCode: editEmployeeData.postalCode ||  "",
    ssn: editEmployeeData.ssn || "",
    bankName: editEmployeeData.bankName || "",
    accountNumber: editEmployeeData.accountNumber || "",
    routingNumber: editEmployeeData.routingNumber || "",
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      if (id) { // Ensure the `id` exists
        try {
          // Corrected the URL to pass the `id` dynamically
          const response = await ApiInstance.get(`/api/getEmployeeById/${id}`);
          console.log("Successfully getting the values by id:", response.data);
          
          setEditEmployeeData(response.data); 
          
        } catch (error) {
          console.error("Error fetching employee by ID:", error); 
        }
      }
    };
    fetchEmployees();
  }, [id]); 

  useEffect(() => {
    const fetchEmployees = async () => {
      if (id) { // Ensure the `id` exists
        try {
          // Corrected the URL to pass the `id` dynamically
          const response = await ApiInstance.get(`/api/getEmployeeById/${id}`);
          console.log("Successfully getting the values by id:", response.data);
          
          setEditEmployeeData(response.data); 
          
        } catch (error) {
          console.error("Error fetching employee by ID:", error); 
        }
      }
    };
    fetchEmployees();
  }, [id]);
  
  useEffect(() => {
    console.log("Updated editEmployeeData:", editEmployeeData.fullName);
  }, [editEmployeeData]);

  const validationSchema = Yup.object({
    employeeId: Yup.string().required("Employee ID is required"),
    role: Yup.string().required("Role is required"),
    fullName: Yup.string().required("Full Name is required"),
    position: Yup.string().required("Position is required"),
    companyMail: Yup.string()
      .email("Invalid email format")
      .required("Company Mail is required"),
    personalMail: Yup.string()
      .email("Invalid email format") 
      .required("Personal Mail is required"),
    phoneNo: Yup.string()
      .matches(/^\d{10}$/, "Must be a 10-digit number")
      .required("Phone Number is required"),
    salary: Yup.number()
      .positive("Must be a positive number")
      .required("Salary is required"),
    category: Yup.string().required("Categroy is required"),
    experienceYears: Yup.number().positive("Year must be Positive Number").required("Experience Year is required"),
    panCardNo: Yup.string().required("PAN Card Number is required"),
    postalCode: Yup.number().positive("Must be a Positive Number")
      .required("Postal Code is required")
      .positive("Must be a Positive Number"),
    ssn: Yup.number("Only Integer value Accepted")
      .required("SSN is required")
      .positive("Must be a Positive Number"),
    bankName: Yup.string().required("Bank Name is required"),
    accountNumber: Yup.number("Only Integer value Accepted").positive("Account number must be Positive")
      .required("Account Number is required")
      .positive("Must be a Positive Number"),
    routingNumber: Yup.number("Enter Number only")
      .required("Routing Number is required")
      .positive("Must be a Positive Number"),
  });

  const roleOptions = [
    { value: "Admin", label: "Admin" },
    { value: "Manager", label: "Manager" },
    { value: "TeamLead", label: "Team Lead" },
    { value: "Employee", label: "Employee" },
  ];

  const positionOptions = [
    { value: "Developer", label: "Developer" },
    { value: "Manager", label: "Manager" },
    { value: "HR", label: "HR" },
  ];

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  const categoryOptions = [
    { value: "Fresher", label: "Fresher" },
    { value: "Experienced", label: "Experienced" },
  ];
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("file ", file);
    if (file && file.size < 5000000) {
      setProfilePicture(URL.createObjectURL(file));
      // Set the file URL
    } else {
      alert("File size is too large. Please upload a smaller file.");
    }
  };

  const handleEditProfile = () => {
    setIsEditingProfile(true);
  };

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      <Sidenavbar />
      <NavigationButtons
        buttons={[
          {
            label: "Employee List",
            path: "/employeeListPage",
            color: "primary",
          },
          {
            label: "TeamLead List",
            path: "/teamLeadListPage",
            color: "secondary",
          },
          { 
            label: "Manager List", 
            path: "/managerListPage", 
            color: "success" },
        ]}
      />
      <Paper elevation={10} sx={{ p: 2 }}>
        <Typography
          variant="h4"
          style={{
            marginBottom: "20px",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          Add Employee
        </Typography>
        <Formik
          initialValues={editEmployeeData}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            values.profilepicture = profilePicture;
            console.log("profilepicture", profilePicture);
            console.log("Submitted values:", values);
            alert(`${values.fullName} ${values.role} is added successfully!`);
            resetForm();
            try {
              const response = await ApiInstance.post(
                "/api/addEmployee",
                values
              );
              if (response.status === 201) {
                console.log("Employee added is successfully!!!");
                
                navigate("/employeeListPage");
              }
            } catch (error) {
              console.log("Error while adding employee", error);
            }
          }}
        >
          {({ values, errors, touched, handleChange }) => (
            <Form style={{ width: "100%", maxWidth: "800px" }}>
              <Grid container spacing={3} sx={{ p: 2 }}>
                {/* Profile Picture */}
                <Grid
                  item
                  xs={12}
                  container
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <ProfilePicture
                    name="profilepicture"
                    value={editEmployeeData.profilepicture}
                    profilePicture={profilePicture}
                    handleFileChange={handleFileChange}
                    isEditingProfile={isEditingProfile}
                    handleEditProfile={handleEditProfile}
                    handleSaveProfile={handleSaveProfile}
                  />
                </Grid>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    mt: 4,
                    fontWeight: "bold",
                    color: "darkblue",
                    marginLeft: "20px",
                  }}
                >
                  Basic Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={3} sx={{ p: 2 }}>
                  {/* Employee ID */}
                  <Grid item xs={12} sm={6}>
                    <FormTextField
                      label="Employee ID*"
                      name="employeeId"
                      value={editEmployeeData.employeeId}
                      onChange={handleChange}
                      error={touched.employeeId && Boolean(errors.employeeId)}
                      helperText={touched.employeeId && errors.employeeId}
                    />
                  </Grid>

                  {/* Role */}
                  <Grid item xs={12} sm={6}>
                    <FormSelect
                      label="Role*"
                      name="role"
                      value={editEmployeeData.role}
                      onChange={handleChange}
                      error={touched.role && Boolean(errors.role)}
                      helperText={touched.role && errors.role}
                      options={roleOptions}
                    />
                  </Grid>

                  {/* Full Name (spans the entire width) */}
                  <Grid item xs={12}>
                    <FormTextField
                      label="Full Name*"
                      name="fullName"
                      value={editEmployeeData.fullName}
                      onChange={handleChange}
                      error={touched.fullName && Boolean(errors.fullName)}
                      helperText={touched.fullName && errors.fullName}
                      fullWidth
                    />
                  </Grid>

                  {/* Hiring Date */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Hiring Date*"
                      name="hiringDate"
                      value={editEmployeeData.hiringDate}
                      onChange={handleChange}
                      type="date"
                      error={touched.hiringDate && Boolean(errors.hiringDate)}
                      helperText={touched.hiringDate && errors.hiringDate}
                      InputLabelProps={{
                        shrink: true, // Ensures the label doesn't overlap
                      }}
                      inputProps={{
                        min: "1900-01-01", // Optional: Set a minimum date
                        max: new Date().toISOString().split("T")[0], // Optional: Set a maximum date
                      }}
                      style={{ width: "100%" }} // You can adjust this width as needed (for example, '80%' or '400px')
                    />
                  </Grid>

                  {/* Position */}
                  <Grid item xs={12} sm={6}>
                    <FormSelect
                      label="Position*"
                      name="position"
                      value={editEmployeeData.position}
                      onChange={handleChange}
                      error={touched.position && Boolean(errors.position)}
                      helperText={touched.position && errors.position}
                      options={positionOptions}
                    />
                  </Grid>

                  {/* Company Email */}
                  <Grid item xs={12} sm={6}>
                    <FormTextField
                      label="Company Email*"
                      name="companyMail"
                      value={editEmployeeData.companyMail}
                      onChange={handleChange}
                      error={touched.companyMail && Boolean(errors.companyMail)}
                      helperText={touched.companyMail && errors.companyMail}
                    />
                  </Grid>

                  {/* Personal Email */}
                  <Grid item xs={12} sm={6}>
                    <FormTextField
                      label="Personal Email*"
                      name="personalMail"
                      value={editEmployeeData.personalMail}
                      onChange={handleChange}
                      error={
                        touched.personalMail && Boolean(errors.personalMail)
                      }
                      helperText={touched.personalMail && errors.personalMail}
                    />
                  </Grid>

                  {/* Phone No. */}
                  <Grid item xs={12} sm={6}>
                    <FormTextField
                      label="Phone No.*"
                      name="phoneNo"
                      value={editEmployeeData.phoneNo}
                      onChange={handleChange}
                      error={touched.phoneNo && Boolean(errors.phoneNo)}
                      helperText={touched.phoneNo && errors.phoneNo}
                    />
                  </Grid>

                  {/* Salary */}
                  <Grid item xs={12} sm={6}>
                    <FormTextField
                      label="Salary*"
                      name="salary"
                      value={editEmployeeData.salary}
                      onChange={handleChange}
                      type="number"
                      error={touched.salary && Boolean(errors.salary)}
                      helperText={touched.salary && errors.salary}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormSelect
                      label="Category*"
                      name="category"
                      value={editEmployeeData.category}
                      onChange={handleChange}
                      error={touched.category && Boolean(errors.category)}
                      helperText={touched.category && errors.category}
                      options={categoryOptions}
                    ></FormSelect>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {values.category === "Experienced" && (
                      <FormTextField
                        label="Years of Experience*"
                        name="experienceYears"
                        value={editEmployeeData.experienceYears || ""}
                        onChange={handleChange}
                        error={
                          touched.experienceYears &&
                          Boolean(errors.experienceYears)
                        }
                        helperText={
                          touched.experienceYears && errors.experienceYears
                        }
                        />
                      )}
                  </Grid>
                  
                </Grid>

                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    mt: 4,
                    fontWeight: "bold",
                    color: "darkblue",
                    marginLeft: "20px",
                  }}
                >
                  Personal Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={3} sx={{ p: 2 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="BirthDate*"
                      name="birthdate"
                      value={editEmployeeData.birthdate}
                      onChange={handleChange}
                      type="date"
                      error={touched.birthdate && Boolean(errors.birthdate)}
                      helperText={touched.birthdate && errors.birthdate}
                      InputLabelProps={{
                        shrink: true, // Ensures the label doesn't overlap
                      }}
                      inputProps={{
                        min: "1900-01-01", // Optional: Set a minimum date
                        max: new Date().toISOString().split("T")[0], // Optional: Set a maximum date
                      }}
                      style={{ width: "100%" }} // You can adjust this width as needed (for example, '80%' or '400px')
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormSelect
                      label="Gender"
                      name="gender"
                      value={editEmployeeData.gender}
                      onChange={handleChange}
                      error={touched.gender && Boolean(errors.gender)}
                      helperText={touched.gender && errors.gender}
                      options={genderOptions}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormTextField
                      label="Blood Type"
                      name="bloodType"
                      value={editEmployeeData.bloodType}
                      onChange={handleChange}
                      type="text"
                      error={touched.bloodType && Boolean(errors.bloodType)}
                      helperText={touched.bloodType && errors.bloodType}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormTextField
                      label="PAN Card No.*"
                      name="panCardNo"
                      value={editEmployeeData.panCardNo}
                      onChange={handleChange}
                      type="text"
                      error={touched.panCardNo && Boolean(errors.panCardNo)}
                      helperText={touched.panCardNo && errors.panCardNo}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormTextField
                      label="Address*"
                      name="address"
                      value={editEmployeeData.address}
                      onChange={handleChange}
                      type="text"
                      error={touched.address && Boolean(errors.address)}
                      helperText={touched.address && errors.address}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormTextField
                      label="Postal Code*"
                      name="postalCode"
                      value={editEmployeeData.postalCode}
                      onChange={handleChange}
                      type="number"
                      error={touched.postalCode && Boolean(errors.postalCode)}
                      helperText={touched.postalCode && errors.postalCode}
                    />
                  </Grid>
                </Grid>

                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    mt: 4,
                    fontWeight: "bold",
                    color: "darkblue",
                    marginLeft: "20px",
                  }}
                >
                  Financial Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={3} sx={{ p: 2 }}>
                  <Grid item xs={12} sm={6}>
                    <FormTextField
                      label="SSN*"
                      name="ssn"
                      value={editEmployeeData.ssn}
                      onChange={handleChange}
                      type="text"
                      error={touched.ssn && Boolean(errors.ssn)}
                      helperText={touched.ssn && errors.ssn}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormTextField
                      label="Bank Name*"
                      name="bankName"
                      value={editEmployeeData.bankName}
                      onChange={handleChange}
                      type="text"
                      error={touched.bankName && Boolean(errors.bankName)}
                      helperText={touched.bankName && errors.bankName}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormTextField
                      label="Account Number*"
                      name="accountNumber"
                      value={editEmployeeData.accountNumber}
                      onChange={handleChange}
                      type="number"
                      error={
                        touched.accountNumber && Boolean(errors.accountNumber)
                      }
                      helperText={touched.accountNumber && errors.accountNumber}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormTextField
                      label="Routing Number*"
                      name="routingNumber"
                      value={editEmployeeData.routingNumber}
                      onChange={handleChange}
                      type="text"
                      error={
                        touched.routingNumber && Boolean(errors.routingNumber)
                      }
                      helperText={touched.routingNumber && errors.routingNumber}
                    />
                  </Grid>
                </Grid>
                {/* Save Button */}
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    startIcon={<Save />}
                    type="submit"
                    style={{ marginTop: "20px" }}
                  >
                    Add Employee
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </div>
  );
};

export default AddEmployee;
