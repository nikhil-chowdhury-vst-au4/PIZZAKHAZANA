import {
  FETCH_EMPLOYEE_DATA_SUCCESS,
  CREATE_EMPLOYEE_SUCCESS,
  CREATE_EMPLOYEE_ERROR,
  EDIT_EMPLOYEE_SUCCESS,
  EDIT_EMPLOYEE_ERROR,
  DELETE_EMPLOYEE,
} from "./actionTypes";

import { beginAjax, endAjax } from "./ajaxStatusActions";

import {
  fetchEmployees,
  createEmployee,
  editEmployee,
  deleteEmployee,
} from "../api/remote";

import errorHandler from "../utils/errorHandler";

function fetchEmployeeDataSuccess(data) {
  return {
    type: FETCH_EMPLOYEE_DATA_SUCCESS,
    data,
  };
}

function createEmployeeSuccess(data) {
  return {
    type: CREATE_EMPLOYEE_SUCCESS,
    data,
  };
}

function createEmployeeError(error) {
  return {
    type: CREATE_EMPLOYEE_ERROR,
    error,
  };
}

function editEmployeeSuccess(data) {
  return {
    type: EDIT_EMPLOYEE_SUCCESS,
    data,
  };
}

function editEmployeeError(error) {
  return {
    type: EDIT_EMPLOYEE_ERROR,
    error,
  };
}

function deleteEmployeeSuccess(id) {
  return {
    type: DELETE_EMPLOYEE,
    id,
  };
}

function fetchEmployeesAction() {
  return async (dispatch) => {
    dispatch(beginAjax());
    const data = await fetchEmployees();
    dispatch(fetchEmployeeDataSuccess(data));
    dispatch(endAjax());
  };
}

function createEmployeesAction(data) {
  return (dispatch) => {
    dispatch(beginAjax());
    return createEmployee(data).then((json) => {
      if (json.success) {
        dispatch(createEmployeeSuccess(json.data));
      } else {
        const error = errorHandler(json);
        dispatch(createEmployeeError(error));
      }
      dispatch(endAjax());
    });
  };
}

function editEmployeeAction(id, data) {
  return (dispatch) => {
    dispatch(beginAjax());
    return editEmployee(id, data).then((json) => {
      if (json.success) {
        dispatch(editEmployeeSuccess(json.data));
      } else {
        const error = errorHandler(json);
        dispatch(editEmployeeError(error));
      }
      dispatch(endAjax());
    });
  };
}

function deleteEmployeeAction(id) {
  return (dispatch) => {
    return deleteEmployee(id).then((json) => {
      if (json.success) {
        dispatch(deleteEmployeeSuccess(id));
      }
    });
  };
}

export {
  fetchEmployeesAction,
  createEmployeesAction,
  editEmployeeAction,
  deleteEmployeeAction,
};
