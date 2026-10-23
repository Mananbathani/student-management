import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Login from './components/Login.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import StudentList from './components/StudentList.jsx';
import StudentForm from './components/StudentForm.jsx';
import StudentDetails from './components/StudentDetails.jsx';

function App() {
  return (
    <>
      <Navbar />
      <main className="container py-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/students"
            element={
              <PrivateRoute>
                <StudentList />
              </PrivateRoute>
            }
          />
          <Route
            path="/students/add"
            element={
              <PrivateRoute>
                <StudentForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/students/:id"
            element={
              <PrivateRoute>
                <StudentDetails />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/students" replace />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
