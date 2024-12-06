
const Employee = require("../model/addEmployee.model");
const addEmployeeTransporter = require("../config/nodeMailer");

const addEmployee = async (req, res)=>{
    try {
      
        const newEmployee = new Employee(req.body);
        await newEmployee.save();

        const addEmpMailOption = {
          from:process.env.ADD_EMP_EMAIL,
          to:newEmployee.personalMail,
          subject:"Successfully added Employee",
          html:`<h2>Welcome ${newEmployee.fullName}</h2>
          <h3>You are Successfully added in Company Timesheet Recorder System</h3>`
        }    
        
        addEmployeeTransporter.sendMail(addEmpMailOption, (err, result)=>{
          if(err){
            console.log(err)
          }else{
            console.log(result);
          }
        })

        console.log("Employee Added Successfully !!!", newEmployee);
        res.status(200).send({message:"new Employee added Successfully !!!", newEmployee})

    } catch (error) {
        console.log("Internal Server Error in addEmployee Controller", error.message);
        res.send({message:"Internal server Error", error});
    }
}

const getEmployees = async (req, res) => {
    try {
      const employees = await Employee.find();
      res.status(200).json(employees);

      console.log("All Employee data fetched Successfully "); 
    } catch (error) {
        console.log("Internal server error in getEmployees controller");
        res.status(500).json({ error: error.message });
    }
};

//Search the employee by id
const getEmployeeById = async (req, res) => {
  try {
    const employeeId = req.params.id; // Corrected to match the route parameter name
    const employee = await Employee.findOne({ employeeId }); // Use a query object to search by employeeId
    console.log("getEmployeeById API backend employee value:", employee);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found!" });
    }
    res.status(200).json(employee); // Return the found employee
  } catch (error) {
    console.log("getEmployeeById error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// // Update an employee
// const updateEmployee = async (req, res) => {
//     try {
//       const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
//       console.log("req.params.id : ",req.params.id);
//       res.status(200).json({ message: "Employee updated successfully!", employee: updatedEmployee });
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
// };

// const deleteEmployee = async (req, res) => {
//     try {
//       await Employee.findByIdAndDelete(req.params.id);
//       console.log("DeleteEmployee req.params.id ",req.params.id);
//       res.status(200).json({ message: "Employee deleted successfully!" });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
// };
  
  // Update an employee
  const updateEmployee = async (req, res) => {
    try {
      const { employeeId } = req.params;
  
      if (!employeeId|| !req.body) {
        return res.status(400).json({ message: "Invalid request data. Please provide valid employee ID and data." });
      }
  
      const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, req.body, { new: true });
  
      if (!updatedEmployee) {
        return res.status(404).json({ message: "Employee not found!" });
      }
  
      console.log(`Employee updated with ID: ${id}`);
      res.status(200).json({ message: "Employee updated successfully!", employee: updatedEmployee });
    } catch (error) {
      console.error("Error updating employee:", error.message);
      res.status(500).json({ error: "Internal server error. Please try again later." });
    }
  };
  
  // Delete an employee
  const deleteEmployee = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!id) {
        return res.status(400).json({ message: "Invalid employee ID." });
      }
  
      const deletedEmployee = await Employee.findByIdAndDelete(id);
  
      if (!deletedEmployee) {
        return res.status(404).json({ message: "Employee not found!" });
      }
  
      console.log(`Employee deleted with ID: ${id}`);
      res.status(200).json({ message: "Employee deleted successfully!" });
    } catch (error) {
      console.error("Error deleting employee:", error.message);
      res.status(500).json({ error: "Internal server error. Please try again later." });
    }
  };
module.exports = {addEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee};