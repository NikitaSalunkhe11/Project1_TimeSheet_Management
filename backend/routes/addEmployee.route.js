const {addEmployee, getEmployees, updateEmployee, getEmployeeById, deleteEmployee }= require("../controller/addEmployee.controller");

const router = require("express").Router();

router.post("/addEmployee", addEmployee);
router.get("/getEmployees", getEmployees);
router.get("/getEmployeeById/:id", getEmployeeById);
router.put("/addEmployee/:id", updateEmployee);
router.delete("/deleteEmployee/:id", deleteEmployee )

module.exports = router;