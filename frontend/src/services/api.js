import axios from "axios";

const API = axios.create({
  baseURL: "https://agri-tech-y53r.onrender.com/api"
});

export const submitRequest = (data) => API.post("/request", data);
export const fetchRequests = () => API.get("/requests");
export const updateStatus = (id, status) =>
  API.patch(`/request/${id}/status`, { status });
