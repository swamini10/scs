import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import RaiseComplaint from "./pages/RaiseComplaint";
import MyComplaints from "./pages/MyComplaints";
import AdminDashboard from "./pages/AdminDashboard";


function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/raise-complaint" element={<RaiseComplaint />} />
      <Route path="/student" element={<StudentDashboard />} />
      <Route path="/my-complaints" element={<MyComplaints />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;