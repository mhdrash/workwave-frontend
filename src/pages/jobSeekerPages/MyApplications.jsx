import React from "react";
import { useState, useEffect } from "react";
import apiClient from "../../services/api";

function MyApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    apiClient.get("/user/applications")
      .then((response) => {
        setApplications(response.data);
      })
      .catch((error) => {
        console.error("Error fetching applications:", error);
      });
  }, []);

  return (
    <div>
      <h1>My Applications</h1>
      {applications.length === 0 ? (
        <p>You have not applied to any jobs yet.</p>
      ) : (
        applications.map((app) => (
          <div key={app.id} className="application-card">
            <h2>{app.jobTitle}</h2>
            <p>Company: {app.company}</p>
            <p>Status: {app.status}</p>
          </div>
        ))
      )}
    </div>
  );
}   

export default MyApplications;