import React, { Component } from "react";
import Auth from "../../utils/auth";
import { deleteEmployeeAction } from "../../actions/employeeActions";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import InfoIcon from '@material-ui/icons/Info';

AOS.init();
class EmployeeCard extends Component {
  constructor(props) {
    super(props);
    this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this);
  }
  onDeleteButtonClick(e) {
    this.props.deleteEmployee(this.props.id);
  }
  render() {
    const {id, name, email, photo, mobile_no } = this.props;
    let footer;
    if (Auth.isUserAdmin()) {
      footer = (
        <div className="buttons">
          <Link to={`/admin/employee/edit/${id}`} className="btn" style={{background: "#d3d3d3", padding:"15px", borderRadius: "50%"}}>
            <EditIcon color="primary" />
          </Link >
          <Link to={`/admin/employee/details/${id}`} className="btn" style={{background: "#d3d3d3", padding:"15px", borderRadius: "50%"}}>
            <InfoIcon color="primary" style={{verticalAlign:"baseline" }}/>
          </Link >
          <button onClick={this.onDeleteButtonClick} className="btn" style={{background: "#d3d3d3", padding:"15px", borderRadius: "50%"}}>
            <DeleteIcon color="secondary" />
          </button>
        </div>
      );
    }

    
    return (
      <div
        className="card mt-3 shadow p-3 mb-5 bg-white rounded"
        style={{ width: "22rem", height: "30rem" }}
        data-aos="zoom-in"
        data-aos-duration="1200"
      >
        <img className="card-img-top" src={photo} alt={name} />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{email}</p>
          <p className="card-text">mobile_no - {mobile_no}</p>
        </div>
        {/* <br></br> */}
        {footer}
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    deleteEmployee: (id) => dispatch(deleteEmployeeAction(id)),
  };
}
export default withRouter(
  connect(() => {
    return {};
  }, mapDispatchToProps)(EmployeeCard)
);