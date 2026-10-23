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

export const API_URL = 'http://localhost:5000/students';

const request = async (url, options) => {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.status === 204 ? null : res.json();
};

// ---------- Student thunks ----------

export const fetchStudents = () => async (dispatch) => {
  dispatch({ type: FETCH_STUDENTS_REQUEST });
  try {
    const data = await request(API_URL);
    dispatch({ type: FETCH_STUDENTS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: FETCH_STUDENTS_FAILURE, payload: err.message });
  }
};

export const addStudent = (student) => async (dispatch) => {
  try {
    const data = await request(API_URL, {
      method: 'POST',
      body: JSON.stringify(student),
    });
    dispatch({ type: ADD_STUDENT_SUCCESS, payload: data });
    return data;
  } catch (err) {
    dispatch({ type: STUDENT_OPERATION_FAILURE, payload: err.message });
    throw err;
  }
};

export const updateStudent = (id, student) => async (dispatch) => {
  try {
    const data = await request(`${API_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(student),
    });
    dispatch({ type: UPDATE_STUDENT_SUCCESS, payload: data });
    return data;
  } catch (err) {
    dispatch({ type: STUDENT_OPERATION_FAILURE, payload: err.message });
    throw err;
  }
};

export const deleteStudent = (id) => async (dispatch) => {
  try {
    await request(`${API_URL}/${id}`, { method: 'DELETE' });
    dispatch({ type: DELETE_STUDENT_SUCCESS, payload: id });
  } catch (err) {
    dispatch({ type: STUDENT_OPERATION_FAILURE, payload: err.message });
    throw err;
  }
};

// ---------- Auth actions ----------

const DEMO_USER = { username: 'admin', password: 'admin123' };

export const login = (username, password) => (dispatch) => {
  if (username === DEMO_USER.username && password === DEMO_USER.password) {
    localStorage.setItem('sms_user', username);
    dispatch({ type: LOGIN_SUCCESS, payload: username });
    return true;
  }
  return false;
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('sms_user');
  dispatch({ type: LOGOUT });
};
