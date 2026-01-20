from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
import uuid
from datetime import datetime
import re

app = Flask(__name__)
CORS(app)

DATA_FILE = "requests.json"


def read_data():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, "r") as f:
        return json.load(f)


def write_data(data):
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=2)


@app.route("/api/request", methods=["POST"])
def create_request():
    data = request.json

    required_fields = ["farmer_name", "mobile", "location", "service_type", "preferred_date"]
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({"error": f"{field} is required"}), 400
        if not re.match(r'^[6-9]\d{9}$', data["mobile"]):
            return jsonify({"error": "Invalid mobile number"}), 400

    new_request = {
        "id": str(uuid.uuid4()),
        "farmer_name": data["farmer_name"],
        "mobile": data["mobile"],
        "location": data["location"],
        "service_type": data["service_type"],
        "preferred_date": data["preferred_date"],
        "notes": data.get("notes", ""),
        "status": "Pending",
        "created_at": datetime.utcnow().isoformat()
    }

    requests_data = read_data()
    requests_data.append(new_request)
    write_data(requests_data)

    return jsonify({"message": "Service request submitted successfully"}), 201


@app.route("/api/requests", methods=["GET"])
def get_requests():
    return jsonify(read_data())

@app.route("/api/request/<request_id>/status", methods=["PATCH"])
def update_status(request_id):
    data = request.json
    new_status = data.get("status")

    if new_status not in ["Pending", "In Progress", "Completed"]:
        return jsonify({"error": "Invalid status"}), 400

    requests_data = read_data()
    for r in requests_data:
        if r["id"] == request_id:
            r["status"] = new_status
            write_data(requests_data)
            return jsonify({"message": "Status updated successfully"})

    return jsonify({"error": "Request not found"}), 404


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

