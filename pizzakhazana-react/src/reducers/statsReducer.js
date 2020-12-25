import {FETCH_STATS_SUCCESS, REGISTER_SUCCESS, CREATE_PIZZA_SUCCESS, DELETE_PIZZA,DELETE_EMPLOYEE, CREATE_EMPLOYEE_SUCCESS} from '../actions/actionTypes'

function statsReducer (state = {usersCount: 0, productsCount: 0, employeeCount:0}, action) {
  switch (action.type) {
    case FETCH_STATS_SUCCESS:
      return {
        usersCount: action.data.users,
        productsCount: action.data.products,
        employeeCount: action.data.employees
      }
    case REGISTER_SUCCESS:
      return {
        usersCount: state.usersCount + 1,
        productsCount: state.productsCount,
        employeeCount: state.employeeCount
      }
    case CREATE_PIZZA_SUCCESS:
      return {
        usersCount: state.usersCount,
        productsCount: state.productsCount + 1,
        employeeCount: state.employeeCount
      }
    case DELETE_PIZZA:
      return {
        usersCount: state.usersCount,
        productsCount: state.productsCount - 1,
        employeeCount: state.employeeCount
      }
    case CREATE_EMPLOYEE_SUCCESS:
      return {
        usersCount: state.usersCount,
        productsCount: state.productsCount,
        employeeCount: state.employeeCount + 1
      }
    case DELETE_EMPLOYEE:
      return {
        usersCount: state.usersCount,
        productsCount: state.productsCount,
        employeeCount: state.employeeCount - 1
      }
    default:
      return state
  }
}


export default statsReducer
