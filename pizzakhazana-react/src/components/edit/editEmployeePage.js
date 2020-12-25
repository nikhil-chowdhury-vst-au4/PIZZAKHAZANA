import React, { Component } from "react";
import Input from "../common/Input";
import toastr from "toastr";
import createEmployeeValidator from "../../utils/employeeValidator";
import NotFoundPage from "../common/NotFound/NotFoundPage";
import { createEmployeeValidationFunc } from "../../utils/formValidator";
import {
  fetchEmployeesAction,
  editEmployeeAction,
} from "../../actions/employeeActions";
import { redirectAction } from "../../actions/authActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class EditEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      photo: "",
      mobile_no: "",
      adhar_card: "",
      address: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillMount() {
    const employeeId = this.props.match.params.id;
    let employee = this.props.employee.find((e) => e._id === employeeId);
    if (employee) {
      this.setState({
        name: employee.name,
        email: employee.email,
        photo: employee.photo,
        mobile_no: employee.mobile_no,
        adhar_card: employee.adhar_card,
        address: employee.address,
      });
    } else {
      this.props.fetchEmployees();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.editEmployeeError.hasError) {
      toastr.error(nextProps.editEmployeeError.message);
    } else if (nextProps.editEmployeeSuccess) {
      this.props.redirect();
      toastr.success("Product edited successfully");
      this.props.history.push("/admin/employee");
    } else {
      const employeeId = this.props.match.params.id;
      let employee = this.props.employee.find((e) => e._id === employeeId);
      if (employee) {
        this.setState({
          name: employee.name,
          email: employee.email,
          photo: employee.photo,
          mobile_no: employee.mobile_no,
          adhar_card: employee.adhar_card,
          address: employee.address,
        });
      }
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    if (
      !createEmployeeValidator(
        this.state.name,
        this.state.email,
        this.state.photo,
        this.state.mobile_no,
        this.state.adhar_card,
        this.state.address
      )
    ) {
      return;
    }
    this.props.editEmployee(
      this.props.match.params.id,
      this.state.name,
      this.state.email,
      this.state.photo,
      this.state.mobile_no,
      this.state.adhar_card,
      this.state.address
    );
  }
  render() {
    const employeeId = this.props.match.params.id;
    let employee = this.props.employee.find((e) => e._id === employeeId);
    if (!employee) {
      return <NotFoundPage errMessage="EMPLOYEE NOT FOUND" />;
    }

    let validObj = createEmployeeValidationFunc(
      // this.state.name,
      // this.state.email,
      // this.state.description,
      // this.state.image,
      // this.state.weight,
      // this.state.price
      this.state.name,
        this.state.email,
        this.state.photo,
        this.state.mobile_no,
        this.state.adhar_card,
        this.state.address
    );

    return (
      <div className="row">
        <div className="container mt-5 col-6">
          <div className="card near-moon-gradient form-white">
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <h1 className="text-center indigo-text font-bold">
                  Add employee
                </h1>
                <div className="md-form">
                  <Input
                    type="text"
                    name="name"
                    // label='Name'
                    placeholder="Enter employee's name"
                    value={this.state.name}
                    onChange={this.onChange}
                    valid={validObj.validName}
                  />
                </div>
                <div className="md-form">
                  <Input
                    type="email"
                    name="email"
                    // label='Ingredients'
                    placeholder="Enter employee's email"
                    value={this.state.email}
                    onChange={this.onChange}
                    valid={validObj.validEmail}
                  />
                </div>
                <div className="md-form">
                  <Input
                    type="text"
                    name="photo"
                    // label='Description'
                    placeholder="Enter URL of employee's photo"
                    value={this.state.photo}
                    onChange={this.onChange}
                    valid={validObj.validPhoto}
                  />
                </div>

                <div className="md-form">
                  <Input
                    type="number"
                    name="mobile_no"
                    // label='Weight'
                    placeholder="Enter employee's mobile number"
                    value={this.state.mobile_no}
                    onChange={this.onChange}
                    valid={validObj.validMobile}
                  />
                </div>
                <div className="md-form">
                  <Input
                    type="text"
                    name="adhar_card"
                    // label='Image URL'
                    placeholder="Enter URL of employee's adhar card"
                    value={this.state.adhar_card}
                    onChange={this.onChange}
                    valid={validObj.validAdhar}
                  />
                </div>
                <div className="md-form">
                  <Input
                    type="text"
                    name="address"
                    // label='Price'
                    placeholder="Enter employee's address"
                    value={this.state.address}
                    onChange={this.onChange}
                    valid={validObj.validAddress}
                  />
                </div>
                <div className="md-form text-center">
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="UPDATE"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    editEmployeeSuccess: state.editEmployee.success,
    editEmployeeError: state.editEmployeeError,
    employee: state.employees,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    editEmployee: (id, name, email, photo, mobile_no, adhar_card, address) => {
      dispatch(
        editEmployeeAction(id, {
          name,
          email,
          photo,
          mobile_no,
          adhar_card,
          address,
        })
      );
    },
    redirect: () => dispatch(redirectAction()),
    fetchEmployees: () => dispatch(fetchEmployeesAction()),
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditEmployee)
);
