import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../css/AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [dashboardStats, setDashboardStats] = useState({
    totalComplaints: 0,
    pendingComplaints: 0,
    inProgressComplaints: 0,
    resolvedComplaints: 0,
  });

  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [showAll, setShowAll] = useState(false);
  const [pageSize] = useState(3);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "ADMIN") {
      navigate("/login");
      return;
    }

    fetchDashboardData();
    fetchComplaints();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      const [dashboardResponse, totalResponse, pendingResponse, inProgressResponse, resolvedResponse] = await Promise.all([
        axios.get("http://localhost:8080/api/admin/dashboard", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }),
        axios.get("http://localhost:8080/api/admin/total", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }),
        axios.get("http://localhost:8080/api/admin/pending", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }),
        axios.get("http://localhost:8080/api/admin/in-progress", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }),
        axios.get("http://localhost:8080/api/admin/resolved", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }),
      ]);

      setDashboardStats({
        totalComplaints: totalResponse.data,
        pendingComplaints: pendingResponse.data,
        inProgressComplaints: inProgressResponse.data,
        resolvedComplaints: resolvedResponse.data,
        ...(dashboardResponse.data || {}),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/api/complaints", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });

      const sortedComplaints = [...response.data].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );

      setComplaints(sortedComplaints);
    } catch (error) {
      console.error(error);
      alert("Unable to load complaints");
    } finally {
      setLoading(false);
    }
  };

  const filteredComplaints = useMemo(() => {
    return complaints.filter((item) => {
      const matchesSearch = item.user?.fullName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" || item.status === statusFilter;

      return matchesSearch !== false && matchesStatus;
    });
  }, [complaints, searchTerm, statusFilter]);

  const visibleComplaints = showAll
    ? filteredComplaints
    : filteredComplaints.slice(0, pageSize);

  const handleStatusUpdate = async (targetStatus) => {
    if (!selectedComplaint) return;

    try {
      await axios.put(
        `http://localhost:8080/api/complaints/${selectedComplaint.id}`,
        null,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          params: { status: targetStatus },
        }
      );

      const updatedComplaints = complaints.map((item) =>
        item.id === selectedComplaint.id ? { ...item, status: targetStatus } : item
      );

      setComplaints(updatedComplaints);
      setSelectedComplaint({ ...selectedComplaint, status: targetStatus });
      await fetchDashboardData();
    } catch (error) {
      console.error(error);
      alert("Unable to update complaint status");
    }
  };

  const formatDate = (value) => {
    if (!value) return "—";
    return new Date(value).toLocaleString();
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "PENDING":
        return "status pending";
      case "IN_PROGRESS":
        return "status progress";
      case "RESOLVED":
        return "status resolved";
      default:
        return "status";
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar />

        <div className="admin-dashboard">
          <div className="admin-header">
            <h1>Admin Dashboard</h1>
            <p>Monitor complaints, review student requests, and update statuses efficiently.</p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total</h3>
              <p>{dashboardStats.totalComplaints}</p>
            </div>
            <div className="stat-card pending-card">
              <h3>Pending</h3>
              <p>{dashboardStats.pendingComplaints}</p>
            </div>
            <div className="stat-card progress-card">
              <h3>In Progress</h3>
              <p>{dashboardStats.inProgressComplaints}</p>
            </div>
            <div className="stat-card resolved-card">
              <h3>Resolved</h3>
              <p>{dashboardStats.resolvedComplaints}</p>
            </div>
          </div>

          <div className="dashboard-controls">
            <input
              type="text"
              placeholder="Search by student name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
            </select>

            <button className="toggle-btn" onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show Recent" : "Show All"}
            </button>

          </div>

          <div className="complaint-container">
            {loading ? (
              <div className="empty-state">Loading complaints...</div>
            ) : visibleComplaints.length === 0 ? (
              <div className="empty-state">No complaints found for the selected filters.</div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Student</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleComplaints.map((item) => (
                    <tr key={item.id}>
                      <td>#{item.id}</td>
                      <td>{item.user?.fullName || "Unknown"}</td>
                      <td>{item.title}</td>
                      <td>
                        <span className={getStatusClass(item.status)}>{item.status}</span>
                      </td>
                      <td>{formatDate(item.createdAt)}</td>
                      <td>
                        <button onClick={() => setSelectedComplaint(item)}>View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {selectedComplaint && (
            <div className="modal-overlay" onClick={() => setSelectedComplaint(null)}>
              <div className="complaint-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h2>Complaint Details</h2>
                  <button onClick={() => setSelectedComplaint(null)} aria-label="Close modal">
                    ×
                  </button>
                </div>

                <div className="modal-body">
                  <p><strong>ID:</strong> #{selectedComplaint.id}</p>
                  <p><strong>Student:</strong> {selectedComplaint.user?.fullName || "Unknown"}</p>
                  <p><strong>Email:</strong> {selectedComplaint.user?.email || "—"}</p>
                  <p><strong>Title:</strong> {selectedComplaint.title}</p>
                  <p><strong>Description:</strong> {selectedComplaint.description}</p>
                  <p><strong>Status:</strong> <span className={getStatusClass(selectedComplaint.status)}>{selectedComplaint.status}</span></p>
                  <p><strong>Created:</strong> {formatDate(selectedComplaint.createdAt)}</p>
                  <p><strong>Updated:</strong> {formatDate(selectedComplaint.updatedAt)}</p>

                  <div className="status-update">
                    <h3>Update Status</h3>
                    {selectedComplaint.status === "PENDING" && (
                      <button className="progress-btn" onClick={() => handleStatusUpdate("IN_PROGRESS")}>Move to In Progress</button>
                    )}
                    {selectedComplaint.status === "IN_PROGRESS" && (
                      <button className="resolved-btn" onClick={() => handleStatusUpdate("RESOLVED")}>Mark as Resolved</button>
                    )}
                    {selectedComplaint.status === "RESOLVED" && (
                      <p>This complaint is already resolved.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
