import {
  FETCH_EMPLOYEE_DATA_SUCCESS,
  CREATE_EMPLOYEE_SUCCESS,
  CREATE_EMPLOYEE_ERROR,
  EDIT_EMPLOYEE_SUCCESS,
  EDIT_EMPLOYEE_ERROR,
  DELETE_EMPLOYEE,
  REDIRECTED,
} from "../actions/actionTypes";

function employeesReducer(state = [], action) {
  switch (action.type) {
    case FETCH_EMPLOYEE_DATA_SUCCESS:
      return reconcile(state, action.data);
    case CREATE_EMPLOYEE_SUCCESS:
      return reconcile(state, [action.data]);
    case EDIT_EMPLOYEE_SUCCESS:
      return reconcile(state, [action.data]);
    case DELETE_EMPLOYEE:
      return state.filter((e) => e._id !== action.id);
    default:
      return state;
  }
}

function createEmployeeReducer(state = { success: false }, action) {
  switch (action.type) {
    case CREATE_EMPLOYEE_SUCCESS:
      return Object.assign({}, state, { success: true });
    case REDIRECTED:
      return Object.assign({}, state, { success: false });
    default:
      return state;
  }
}

function createEmployeeErrorReducer(
  state = { hasError: false, message: "" },
  action
) {
  switch (action.type) {
    case CREATE_EMPLOYEE_ERROR:
      return Object.assign({}, state, {
        hasError: true,
        message: action.error,
      });
    case CREATE_EMPLOYEE_SUCCESS:
      return Object.assign({}, state, { hasError: false, message: "" });
    default:
      return state;
  }
}

function editEmployeeReducer(state = { success: false }, action) {
  switch (action.type) {
    case EDIT_EMPLOYEE_SUCCESS:
      return Object.assign({}, state, { success: true });
    case REDIRECTED:
      return Object.assign({}, state, { success: false });
    default:
      return state;
  }
}

function editEmployeeErrorReducer(
  state = { hasError: false, message: "" },
  action
) {
  switch (action.type) {
    case EDIT_EMPLOYEE_ERROR:
      return Object.assign({}, state, {
        hasError: true,
        message: action.error,
      });
    case EDIT_EMPLOYEE_SUCCESS:
      return Object.assign({}, state, { hasError: false, message: "" });
    default:
      return state;
  }
}

function reconcile(oldData, newData) {
  const newDataById = {};
  for (const entry of newData) {
    newDataById[entry._id] = entry;
  }

  const result = [];
  for (const entry of oldData) {
    if (newDataById[entry._id]) {
      result.push(newDataById[entry._id]);
      delete newDataById[entry._id];
    } else {
      result.push(entry);
    }
  }

  for (const entryId in newDataById) {
    result.push(newDataById[entryId]);
  }

  return result;
}

export {
  employeesReducer,
  createEmployeeReducer,
  createEmployeeErrorReducer,
  editEmployeeReducer,
  editEmployeeErrorReducer,
};
