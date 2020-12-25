const express = require("express");
const authCheck = require("../config/auth-check");
const Employee = require("../models/Employee");

const router = new express.Router();

function validateEmployeeCreateForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = "";

  payload.mobile_no = parseInt(payload.mobile_no);

  if (
    !payload ||
    typeof payload.name !== "string" ||
    payload.name.trim().length < 4
  ) {
    isFormValid = false;
    errors.name = "Username must be at least 4 characters long";
  }

  if (
    !payload ||
    typeof payload.email !== "string" 
  ) {
    isFormValid = false;
    errors.email = "Please provide a correct email address";
  }

  if (
    !payload ||
    typeof payload.photo !== "string" ||
    !(
      payload.photo.startsWith("https://") ||
      payload.photo.startsWith("http://")
    ) 
    ||
    payload.photo.length < 14
  ) {
    isFormValid = false;
    errors.photo =
      "Please enter valid photo URL. photo URL must be at least 14 symbols.";
  }

  if (
    !payload ||
    !payload.mobile_no ||
    payload.mobile_no.toString().length != 10
  ) {
    isFormValid = false;
    errors.price = "mobile no. should be exactly of 10 digits.";
  }

  if (
    !payload ||
    typeof payload.address !== "string" ||
    payload.address.length < 10 ||
    payload.address.length > 200
  ) {
    isFormValid = false;
    errors.address =
      "address must be at least 10 symbols and less than 120 symbols.";
  }


  if (
    !payload || typeof payload.adhar_card !== "string"
    ||!(payload.adhar_card.startsWith("https://") || payload.adhar_card.startsWith("http://")) 
    ||
    payload.adhar_card.length < 14
  ) {
    isFormValid = false;
    errors.adhar_card =
      "Please enter valid adhar_card URL. adhar_card URL must be at least 14 symbols.";
  }

  if (!isFormValid) {
    message = "Check the form for errors.";
  }

  return {
    success: isFormValid,
    message,
    errors,
  };
}

router.post("/create", authCheck, (req, res) => {
  const employeeObj = req.body;
  if (req.user.roles.indexOf("Admin") > -1) {
    const validationResult = validateEmployeeCreateForm(employeeObj);
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors,
      });
    }

    Employee.create(employeeObj)
      .then((createdEmployee) => {
        res.status(200).json({
          success: true,
          message: "Pizza added successfully.",
          data: createdEmployee,
        });
      })
      .catch((err) => {
        console.log(err);
        let message = "Something went wrong :( Check the form for errors.";
        if (err.code === 11000) {
          message = "employee with the given name already exists.";
        }
        return res.status(200).json({
          success: false,
          message: message,
        });
      });
  } else {
    return res.status(200).json({
      success: false,
      message: "Invalid credentials!",
    });
  }
});

router.post("/edit/:id", authCheck, (req, res) => {
  if (req.user.roles.indexOf("Admin") > -1) {
    const employeeId = req.params.id;
    const employeeObj = req.body;
    const validationResult = validateEmployeeCreateForm(employeeObj);
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors,
      });
    }

    Employee.findById(employeeId)
      .then((existingEmployee) => {
        existingEmployee.name = employeeObj.name;
        existingEmployee.email = employeeObj.email;
        existingEmployee.photo = employeeObj.photo;
        existingEmployee.mobile_no = employeeObj.mobile_no;
        existingEmployee.address = employeeObj.address;
        existingEmployee.aadhar_card = employeeObj.aadhar_card;

        existingEmployee
          .save()
          .then((editedEmployee) => {
            res.status(200).json({
              success: true,
              message: "employee edited successfully.",
              data: editedEmployee,
            });
          })
          .catch((err) => {
            console.log(err);
            let message = "Something went wrong :( Check the form for errors.";
            if (err.code === 11000) {
              message = "employee with the given name already exists.";
            }
            return res.status(200).json({
              success: false,
              message: message,
            });
          });
      })
      .catch((err) => {
        console.log(err);
        const message = "Something went wrong :( Check the form for errors.";
        return res.status(200).json({
          success: false,
          message: message,
        });
      });
  } else {
    return res.status(200).json({
      success: false,
      message: "Invalid credentials!",
    });
  }
});

router.get("/all", (req, res) => {
  Employee.find().then((employee) => {
    res.status(200).json(employee);
  });
});

router.delete("/delete/:id", authCheck, (req, res) => {
  const id = req.params.id;
  if (req.user.roles.indexOf("Admin") > -1) {
    Employee.findById(id)
      .then((employee) => {
        employee.remove().then(() => {
          return res.status(200).json({
            success: true,
            message: "employee deleted successfully!",
          });
        });
      })
      .catch(() => {
        return res.status(200).json({
          success: false,
          message: "Entry does not exist!",
        });
      });
  } else {
    return res.status(200).json({
      success: false,
      message: "Invalid credentials!",
    });
  }
});

module.exports = router;
