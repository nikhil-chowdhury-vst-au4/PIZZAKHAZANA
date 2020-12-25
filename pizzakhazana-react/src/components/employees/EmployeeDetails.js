import React, { Component } from "react";
import NotFoundPage from "../common/NotFound/NotFoundPage";
import { connect } from "react-redux";
// import employeeInfo from "./employeeInfo";

class employeeDetailsPage extends Component {
  render() {
    const employeeId = this.props.match.params.id;
    const employee = this.props.employee.find((p) => p._id === employeeId);
    if (!employee) {
      return <NotFoundPage errMessage="employee NOT FOUND" />;
    }
    return (
      <div className="container near-moon-gradient">
        <div className="row space-top">
          <div className="col-md-12">
            <h1 className="indigo-text font-weight-bold">Details of employee : {employee.name}</h1>
          </div>
        </div>
        <div className="row space-top">
          <div className="col-md-4">
            <div className="card text-white bg-primary">
              <div className="card-body bg-light">
                <blockquote className="card-blockquote">
                  <img
                    src={employee.photo}
                    alt={employee.name}
                    className="card-image"
                  />
                </blockquote>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <p>
              <span className="indigo-text font-weight-bold">NAME</span>:
              {employee.name}
            </p>
            <p>
              <span className="indigo-text font-weight-bold">EMAIL</span>:
              {employee.email}
            </p>
            <p>
              <span className="indigo-text font-weight-bold">MOBILE_NO</span>:
              {employee.mobile_no}
            </p>
            <p>
              <span className="indigo-text font-weight-bold">ADDRESS</span>:
              {employee.address}
            </p>
          </div>
          <div className="col-md-4">
          {/* <h1>aadhar_card</h1> */}
          <span className="indigo-text font-weight-bold">AADHAR CARD</span>
            <div className="card text-white bg-primary">
              <div className="card-body bg-light">
                <blockquote className="card-blockquote">
                  <img
                    src={employee.photo}
                    alt={employee.name}
                    className="card-image"
                  />
                </blockquote>
              </div>
              </div>
              </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    employee: state.employees,
  };
}
export default connect(mapStateToProps)(employeeDetailsPage);