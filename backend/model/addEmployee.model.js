const mongoose = require("mongoose");

const addEmployeeSchema = new mongoose.Schema({
    employeeId:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum: ["Admin", "Manager", "TeamLead", "Employee"],default:"Employee",
        required:true,
    },
    fullName: { 
        type: String, 
        required: true 
    },
    hiringDate: { 
        type: Date, 
        required: true 
    },
    position: { 
        type: String, 
        required: true 
    },
    companyMail: { 
        type: String, 
        required: true, 
        unique: true 
    },
    category: { 
        type: String, 
        enum: ["Fresher", "Experienced"], 
        required: true 
    },
    experienceYears: { 
        type: Number, 
        default: 0 
    },
    personalMail: { 
        type: String, 
        required: true 
    },
    phoneNo: { 
        type: String, 
        required: true 
    },
    birthdate: { 
        type: Date, 
        required: true 
    },
    gender: { 
        type: String, 
        enum: ["Male", "Female", "Other"], 
        required: true 
    },
    bloodType: { 
        type: String 
    },
    PANCardNo: { 
        type: String 
    },
    address: { 
        type: String 
    },
    postalCode: { 
        type: String 
    },
    ssn: { 
        type: String, 
        required: true 
    },
    bankName: { 
        type: String 
    },
    accountNumber: { 
        type: String 
    },
    routingNumber: { 
        type: String 
    },
    salary: { 
        type: Number, 
        required: true 
    },
    profilePicture: { 
        type: String 
    },
},{timestamps: true });

const addEmployeeSch = mongoose.model("addEmployee",addEmployeeSchema);
module.exports = addEmployeeSch;