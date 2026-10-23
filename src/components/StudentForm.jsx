import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addStudent } from '../redux/actions';

const emptyForm = {
  name: '',
  rollNumber: '',
  phone: '',
  email: '',
  class: '',
  grade: '',
  image: '',
};

function StudentForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await dispatch(
        addStudent({ ...form, rollNumber: Number(form.rollNumber), name: form.name.trim() })
      );
      navigate('/students');
    } catch (err) {
      setError(err.message || 'Could not add student.');
      setSaving(false);
    }
  };

  return (
    <div className="card page-card p-4 mx-auto" style={{ maxWidth: 720 }}>
      <h3 className="mb-3">Add New Student</h3>
      {error && <div className="alert alert-danger py-2">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-8">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Roll number</label>
            <input
              type="number"
              min="1"
              className="form-control"
              name="rollNumber"
              value={form.rollNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Phone</label>
            <input
              type="tel"
              className="form-control"
              name="phone"
              pattern="[0-9+\- ]{7,15}"
              title="Enter a valid phone number"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Class</label>
            <input
              className="form-control"
              name="class"
              placeholder="e.g. 10-A"
              value={form.class}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Grade</label>
            <input
              className="form-control"
              name="grade"
              placeholder="e.g. A+"
              value={form.grade}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12">
            <label className="form-label">Image URL</label>
            <input
              type="url"
              className="form-control"
              name="image"
              placeholder="https://..."
              value={form.image}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="d-flex gap-2 mt-4">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving…' : 'Add student'}
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => navigate('/students')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default StudentForm;
