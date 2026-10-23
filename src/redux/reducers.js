import { combineReducers } from 'redux';
import {
  FETCH_STUDENTS_REQUEST,
  FETCH_STUDENTS_SUCCESS,
  FETCH_STUDENTS_FAILURE,
  ADD_STUDENT_SUCCESS,
  UPDATE_STUDENT_SUCCESS,
  DELETE_STUDENT_SUCCESS,
  STUDENT_OPERATION_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
} from './actionTypes';

const studentsInitial = { list: [], loading: false, error: null };

const studentsReducer = (state = studentsInitial, action) => {
  switch (action.type) {
    case FETCH_STUDENTS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_STUDENTS_SUCCESS:
      return { list: action.payload, loading: false, error: null };
    case FETCH_STUDENTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_STUDENT_SUCCESS:
      return { ...state, list: [...state.list, action.payload], error: null };
    case UPDATE_STUDENT_SUCCESS:
      return {
        ...state,
        list: state.list.map((s) => (s.id === action.payload.id ? action.payload : s)),
        error: null,
      };
    case DELETE_STUDENT_SUCCESS:
      return {
        ...state,
        list: state.list.filter((s) => s.id !== action.payload),
        error: null,
      };
    case STUDENT_OPERATION_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const authInitial = { user: localStorage.getItem('sms_user') };

const authReducer = (state = authInitial, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { user: action.payload };
    case LOGOUT:
      return { user: null };
    default:
      return state;
  }
};

export default combineReducers({
  students: studentsReducer,
  auth: authReducer,
});
