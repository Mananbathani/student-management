import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStudents } from '../redux/actions';

function StudentList() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.students);

  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState('asc');

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const classes = useMemo(
    () => ['All', ...Array.from(new Set(list.map((s) => s.class))).sort()],
    [list]
  );

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    const filtered = list.filter(
      (s) =>
        (classFilter === 'All' || s.class === classFilter) &&
        (!q || s.name.toLowerCase().includes(q) || String(s.rollNumber).includes(q))
    );
    const dir = sortDir === 'asc' ? 1 : -1;
    return [...filtered].sort((a, b) =>
      sortBy === 'name'
        ? a.name.localeCompare(b.name) * dir
        : (Number(a.rollNumber) - Number(b.rollNumber)) * dir
    );
  }, [list, search, classFilter, sortBy, sortDir]);

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
        <h2 className="mb-0">Students</h2>
        <Link to="/students/add" className="btn btn-primary">
          + Add Student
        </Link>
      </div>

      <div className="card page-card p-3 mb-4">
        <div className="row g-2">
          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Search by name or roll number"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col-6 col-md-3">
            <select
              className="form-select"
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              aria-label="Filter by class"
            >
              {classes.map((c) => (
                <option key={c} value={c}>
                  {c === 'All' ? 'All classes' : `Class ${c}`}
                </option>
              ))}
            </select>
          </div>
          <div className="col-6 col-md-3">
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort by"
            >
              <option value="name">Sort by name</option>
              <option value="rollNumber">Sort by roll number</option>
            </select>
          </div>
          <div className="col-12 col-md-2">
            <button
              className="btn btn-outline-secondary w-100"
              onClick={() => setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))}
            >
              {sortDir === 'asc' ? '↑ Ascending' : '↓ Descending'}
            </button>
          </div>
        </div>
      </div>

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" />
        </div>
      )}

      {error && (
        <div className="alert alert-danger">
          {error}. Is the JSON Server running? Start it with <code>npm run server</code>.
        </div>
      )}

      {!loading && !error && visible.length === 0 && (
        <div className="alert alert-info">No students match your criteria.</div>
      )}

      <div className="row g-3">
        {visible.map((s) => (
          <div className="col-12 col-sm-6 col-lg-4" key={s.id}>
            <div className="card student-card shadow-sm h-100">
              <div className="card-body d-flex align-items-center gap-3">
                <img
                  className="avatar"
                  src={s.image || 'https://via.placeholder.com/150?text=No+Image'}
                  alt={s.name}
                />
                <div className="flex-grow-1">
                  <h5 className="card-title mb-1">{s.name}</h5>
                  <div className="text-muted small">Roll #{s.rollNumber}</div>
                  <div>
                    <span className="badge bg-primary me-1">Class {s.class}</span>
                    <span className="badge bg-success">Grade {s.grade}</span>
                  </div>
                </div>
              </div>
              <div className="card-footer bg-transparent border-0 pb-3">
                <Link to={`/students/${s.id}`} className="btn btn-outline-primary btn-sm w-100">
                  View details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentList;
