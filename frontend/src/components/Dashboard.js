import { useEffect, useState } from "react";
import { fetchRequests, updateStatus } from "../services/api";
import '../'

function Dashboard() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadRequests();
    }, []);

    const loadRequests = async () => {
        try {
            setLoading(true);
            const res = await fetchRequests();
            setData(res.data);
        } catch (err) {
            setError("Failed to load service requests.");
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        // Optimistic UI update
        const previousData = [...data];
        setData((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, status: newStatus } : item
            )
        );

        try {
            await updateStatus(id, newStatus);
        } catch (err) {
            // Rollback on failure
            setData(previousData);
            alert("Failed to update status. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="app-card">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="section-title mb-0">Service Requests Dashboard</h4>
                    <span className="badge bg-success">
                        Total Requests: {data.length}
                    </span>
                </div>

                {loading && (
                    <div className="text-center py-4">
                        <div className="spinner-border text-success" role="status" />
                    </div>
                )}

                {error && <div className="alert alert-danger">{error}</div>}

                {!loading && data.length === 0 && (
                    <div className="empty-state">
                        <p>No service requests submitted yet.</p>
                    </div>
                )}

                {!loading && data.length > 0 && (
                    <div className="table-responsive">
                        <table className="table align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>Farmer</th>
                                    <th>Service</th>
                                    <th>Location</th>
                                    <th>Preferred Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((r) => (
                                    <tr key={r.id}>
                                        <td>{r.farmer_name}</td>
                                        <td>{r.service_type}</td>
                                        <td>{r.location}</td>
                                        <td>{r.preferred_date}</td>
                                        <td>
                                            <select
                                                className="form-select form-select-sm"
                                                value={r.status}
                                                onChange={(e) => handleStatusChange(r.id, e.target.value)}
                                            >
                                                <option value="Pending" className="opt-pending">
                                                    Pending
                                                </option>
                                                <option value="In Progress" className="opt-in-progress">
                                                    In Progress
                                                </option>
                                                <option value="Completed" className="opt-completed">
                                                    Completed
                                                </option>
                                            </select>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
