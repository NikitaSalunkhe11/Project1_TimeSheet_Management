const User = require("./model/User")
const DbConnect = require("./config/dbConnect");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
dotenv.config();

const userRegister = async(req, res)=>{
    DbConnect();
    try {
        const encryptedPassword = await bcrypt.hash("admin@123", 10) 
        const adminUser = new User({
            name: "Admin",
            email: "admin@gmail.com",
            password: encryptedPassword,
            role: "admin",
            phone: "1234567890",
            company: "NWS"
        })
        await adminUser.save();
    } catch (error) {
        console.log(error.message);
    }
}

userRegister();