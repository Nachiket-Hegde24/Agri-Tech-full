import { useState } from "react";
import { submitRequest } from "../services/api";

function RequestForm() {
    const [form, setForm] = useState({});
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(form.mobile)) {
            setError("Please enter a valid 10-digit Indian mobile number.");
            return;
        }

        try {
            await submitRequest(form);
            setMessage("Request submitted successfully!");
            setForm({});
        } catch {
            setError("Submission failed. Please try again.");
        }
    };


    return (
        <div className="container mt-5" style={{ maxWidth: "720px" }}>
            <div className="app-card">
                <h4 className="section-title">Farmer Service Request</h4>

                {message && (
                    <div className="alert alert-success alert-sm">{message}</div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Farmer Name</label>
                            <input
                                className="form-control"
                                name="farmer_name"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Mobile Number</label>
                            <input
                                className="form-control"
                                name="mobile"
                                maxLength="10"
                                placeholder="10-digit mobile number"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Village / Location</label>
                            <input
                                className="form-control"
                                name="location"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Service Type</label>
                            <select
                                className="form-select"
                                name="service_type"
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select service</option>
                                <option>Labour</option>
                                <option>Tractor</option>
                                <option>Pest Control</option>
                                <option>Irrigation</option>
                                <option>Harvesting</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Preferred Date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="preferred_date"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-12">
                            <label className="form-label">Additional Notes</label>
                            <textarea
                                className="form-control"
                                name="notes"
                                rows="3"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-12 d-grid mt-3">
                            <button className="btn btn-success btn-lg">
                                Submit Request
                            </button>
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>}
                    </div>
                </form>
            </div>
        </div>

    );
}

export default RequestForm;
