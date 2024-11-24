const mongoose = require("mongoose");

const DbConnect = () => {
  mongoose.connect(`${process.env.MONGODB_URL}`).then(()=>{
    console.log("connection established");
  });
};

module.exports = DbConnect;