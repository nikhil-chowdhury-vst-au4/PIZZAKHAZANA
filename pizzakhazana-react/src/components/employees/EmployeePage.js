import React, {Component} from 'react'
import Input from '../common/Input'
import toastr from 'toastr'
import {createEmployeeValidationFunc} from '../../utils/formValidator'
// import {createProductAction} from '../../actions/productsActions'
// import {redirectAction} from '../../actions/authActions'
import { createEmployeesAction } from "../../actions/employeeActions";
import { redirectAction } from "../../actions/authActions";
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import employeeValidator from '../../utils/employeeValidator'


class EmployeePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      photo: '',
      mobile_no: '',
      adhar_card: '',
      address: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.createEmployeeError.hasError) {
      toastr.error(nextProps.createEmployeeError.message);
    } else if (nextProps.createEmployeeSuccess) {
      this.props.redirect();
      toastr.success("employee created successfully");
      this.props.history.push("/menu");
    }
  }

  onChange (e) {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit (e) {
    e.preventDefault()
    if (!employeeValidator(this.state.name, this.state.email,
      this.state.photo, this.state.mobile_no, this.state.adhar_card, this.state.address)) {
      return
    }
    this.props.createEmployee(this.state.name, this.state.email,
      this.state.photo, this.state.mobile_no, this.state.adhar_card, this.state.address)
  }

  render () {
    let validObj = createEmployeeValidationFunc(
      this.state.name,
      this.state.email,
      this.state.photo,
      this.state.mobile_no,
      this.state.adhar_card,
      this.state.address
    )

    return (

      <div className="row">
        <div className="container mt-5 col-6">
          <div className="card near-moon-gradient form-white">
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <h1 className="text-center indigo-text font-bold">Add employee</h1>
                <div className="md-form">
                  <Input
                  type='text'
                  name='name'
                  // label='Name'
                  placeholder="Enter employee's name"
                  value={this.state.name}
                  onChange={this.onChange}
                  valid={validObj.validName} />
                </div>
                <div className="md-form">
                  <Input
                  type='email'
                  name='email'
                  // label='Ingredients'
                  placeholder="Enter employee's email"
                  value={this.state.email}
                  onChange={this.onChange}
                  valid={validObj.validEmail} />
                </div>
                <div className="md-form">
                  <Input
                  type='text'
                  name='photo'
                  // label='Description'
                  placeholder="Enter URL of employee's photo"
                  value={this.state.photo}
                  onChange={this.onChange}
                  valid={validObj.validPhoto} />
                </div>
                
                <div className="md-form">
                  <Input
                  type='number'
                  name='mobile_no'
                  // label='Weight'
                  placeholder="Enter employee's mobile number"
                  value={this.state.mobile_no}
                  onChange={this.onChange}
                  valid={validObj.validMobile} />
                </div>
                <div className="md-form">
                  <Input
                  type='text'
                  name='adhar_card'
                  // label='Image URL'
                  placeholder="Enter URL of employee's adhar card"
                  value={this.state.adhar_card}
                  onChange={this.onChange}
                  valid={validObj.validAdhar} />
                </div>
                <div className="md-form">
                  <Input
                  type='text'
                  name='address'
                  // label='Price'
                  placeholder="Enter employee's address"
                  value={this.state.address}
                  onChange={this.onChange}
                  valid={validObj.validAddress} />
                </div>
                <div className="md-form text-center">
                  <input type='submit' className='btn btn-primary' value='Add' />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    createEmployeeSuccess: state.createEmployee.success,
    createEmployeeError: state.createEmployeeError,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    createEmployee: (name, email, photo, mobile_no, adhar_card, address) => {
      dispatch(
        createEmployeesAction({
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
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EmployeePage))
