# Student Management System

React + Redux (thunk) + React Router + Bootstrap 5, with a JSON Server backend.
All components are `.jsx` files.

## Run it

```bash
npm install

# Terminal 1 – API on http://localhost:5000
npm run server

# Terminal 2 – app on http://localhost:3000
npm start
```

**Demo login:** `admin` / `admin123`

## Structure

```
db.json                      JSON Server data (/students)
public/index.html
src/
  index.jsx                  Entry point (Provider + Router + Bootstrap)
  App.jsx                    Routes
  index.css                  Custom styling
  redux/
    actionTypes.js
    actions.js               Thunks: fetch/add/update/delete + login/logout
    reducers.js              students + auth reducers
    store.js                 Store with redux-thunk
  components/
    Navbar.jsx               Responsive navbar, sign-out
    Login.jsx                Simple authentication
    PrivateRoute.jsx         Guards student routes
    StudentList.jsx          Fetch, display, search, sort, filter
    StudentForm.jsx          Add student
    StudentDetails.jsx       View, edit (update) and delete student
```

## API (JSON Server)

| Method | Endpoint          | Purpose        |
| ------ | ----------------- | -------------- |
| GET    | `/students`       | List students  |
| POST   | `/students`       | Add student    |
| PUT    | `/students/:id`   | Update student |
| DELETE | `/students/:id`   | Delete student |
