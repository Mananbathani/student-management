import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchStudents, updateStudent, deleteStudent } from '../redux/actions';

function StudentDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, loading } = useSelector((state) => state.students);
  const student = list.find((s) => String(s.id) === id);

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  // Load data if the page is opened directly (e.g. on refresh)
  useEffect(() => {
    if (list.length === 0) dispatch(fetchStudents());
  }, [dispatch, list.length]);

  if (loading && !student) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  if (!student) {
    return (
      <div className="alert alert-warning">
        Student not found. <Link to="/students">Back to list</Link>
      </div>
    );
  }

  const startEdit = () => {
    setForm({ ...student });
    setEditing(true);
    setError('');
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await dispatch(updateStudent(student.id, { ...form, rollNumber: Number(form.rollNumber) }));
      setEditing(false);
    } catch (err) {
      setError(err.message || 'Update failed.');
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete ${student.name}? This cannot be undone.`)) return;
    setBusy(true);
    try {
      await dispatch(deleteStudent(student.id));
      navigate('/students');
    } catch (err) {
      setError(err.message || 'Delete failed.');
      setBusy(false);
    }
  };

  return (
    <div className="card page-card p-4 mx-auto" style={{ maxWidth: 760 }}>
      {error && <div className="alert alert-danger py-2">{error}</div>}

      {!editing ? (
        <>
          <div className="d-flex flex-column flex-md-row align-items-center gap-4">
            <img
              className="avatar avatar-lg"
              src={student.image || 'https://via.placeholder.com/150?text=No+Image'}
              alt={student.name}
            />
            <div className="flex-grow-1 text-center text-md-start">
              <h3 className="mb-1">{student.name}</h3>
              <div className="mb-2">
                <span className="badge bg-primary me-1">Class {student.class}</span>
                <span className="badge bg-success">Grade {student.grade}</span>
              </div>
              <ul className="list-unstyled mb-0">
                <li><strong>Roll number:</strong> {student.rollNumber}</li>
                <li><strong>Phone:</strong> {student.phone}</li>
                <li><strong>Email:</strong> {student.email}</li>
              </ul>
            </div>
          </div>

          <div className="d-flex flex-wrap gap-2 mt-4">
            <button className="btn btn-primary" onClick={startEdit} disabled={busy}>
              Edit
            </button>
            <button className="btn btn-outline-danger" onClick={handleDelete} disabled={busy}>
              Delete
            </button>
            <Link to="/students" className="btn btn-outline-secondary ms-md-auto">
              ← Back
            </Link>
          </div>
        </>
      ) : (
        <form onSubmit={handleUpdate}>
          <h4 className="mb-3">Edit student</h4>
          <div className="row g-3">
            <div className="col-md-8">
              <label className="form-label">Name</label>
              <input className="form-control" name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <label className="form-label">Roll number</label>
              <input type="number" min="1" className="form-control" name="rollNumber" value={form.rollNumber} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Phone</label>
              <input type="tel" className="form-control" name="phone" value={form.phone} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Class</label>
              <input className="form-control" name="class" value={form.class} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Grade</label>
              <input className="form-control" name="grade" value={form.grade} onChange={handleChange} required />
            </div>
            <div className="col-12">
              <label className="form-label">Image URL</label>
              <input type="url" className="form-control" name="image" value={form.image} onChange={handleChange} />
            </div>
          </div>
          <div className="d-flex gap-2 mt-4">
            <button type="submit" className="btn btn-primary" disabled={busy}>
              {busy ? 'Saving…' : 'Save changes'}
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default StudentDetails;
