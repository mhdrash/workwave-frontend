import React from "react";
import { useState, useEffect } from "react";
import apiClient from "../../services/api";

function JobCard({ job }) {
  return (
    <div className="job-card">
      <h2>{job.title}</h2>
      <p>{job.company}</p>
      <p>{job.location}</p>
      <p>{job.description}</p>
    </div>
  );
}

export default JobCard;