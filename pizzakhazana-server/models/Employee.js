const mongoose = require("mongoose");

const REQUIRED_VALIDATION_MESSAGE = "{PATH} is required";

let employeeSchema = new mongoose.Schema({
  name: { 
    type: mongoose.Schema.Types.String, 
    required: REQUIRED_VALIDATION_MESSAGE 
  },
  email: { 
    type: mongoose.Schema.Types.String, 
    required: REQUIRED_VALIDATION_MESSAGE, 
    unique: true 
  },
  photo: {
    type: mongoose.Schema.Types.String,
    required: REQUIRED_VALIDATION_MESSAGE,
  },

  mobile_no: {
    type: mongoose.Schema.Types.Number,
    required: REQUIRED_VALIDATION_MESSAGE,
  },
  address: { type: mongoose.Schema.Types.String },

  adhar_card: {
    type: mongoose.Schema.Types.String,
    required: REQUIRED_VALIDATION_MESSAGE,
  },
});

let Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
