import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { getMyApplications } from "../../services/applicationService";

function getApplicationsArray(data) {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data.applications)) {
    return data.applications;
  }

  if (data.application) {
    return Array.isArray(data.application) ? data.application : [data.application];
  }

  return data._id || data.id ? [data] : [];
}

function getJobTitle(application) {
  if (typeof application.job === "string") {
    return `Job: ${application.job}`;
  }

  return (
    application.job?.title ||
    application.job?.jobTitle ||
    application.jobTitle ||
    "Application"
  );
}

function getCompanyName(application) {
  const company = application.job?.company || application.company;

  if (typeof company === "object") {
    return company.name;
  }

  return company;
}

function getApplicantId(application) {
  const applicant = application.applicant || application.applicantId;

  if (typeof applicant === "object") {
    return applicant._id || applicant.id;
  }

  return applicant;
}

function getApplicationName(application) {
  const applicant = application.applicant || application.applicantId;

  if (typeof applicant === "object") {
    return applicant.cpr || applicant.name || applicant.username;
  }

  return application.profile?.name || application.name;
}

function MyApplications({ user }) {
  const location = useLocation();
  const submittedApplication = location.state?.application;
  const [applications, setApplications] = useState(
    submittedApplication ? [submittedApplication] : []
  );
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchApplications() {
      try {
        const data = await getMyApplications(user._id);
        const fetchedApplications = getApplicationsArray(data).filter(
          (application) => {
            const applicantId = getApplicantId(application);

            return !applicantId || applicantId === user._id;
          }
        );

        setApplications((currentApplications) => {
          const combinedApplications = [
            ...currentApplications,
            ...fetchedApplications,
          ];

          return combinedApplications.filter(
            (application, index, list) =>
              index ===
              list.findIndex(
                (item) =>
                  (item._id || item.id || item.jobId || item.job?._id) ===
                  (application._id ||
                    application.id ||
                    application.jobId ||
                    application.job?._id)
              )
          );
        });
      } catch (err) {
        setError(err?.err || err?.message || "Unable to load applications.");
      }
    }

    fetchApplications();
  }, [user._id]);

  return (
    <div>
      <h1>My Applications</h1>
      {error && <p>{error}</p>}
      {applications.length === 0 ? (
        <p>You have not applied to any jobs yet.</p>
      ) : (
        applications.map((app) => (
          <div
            key={app._id || app.id || `${getApplicantId(app)}-${app.job?._id || app.job}`}
            className="application-card"
          >
            <h2>{getJobTitle(app)}</h2>
            {getApplicationName(app) && <p>Name: {getApplicationName(app)}</p>}
            <p>Applicant: {getApplicantId(app)}</p>
            <p>Job ID: {app.job?._id || app.job}</p>
            {getCompanyName(app) && <p>Company: {getCompanyName(app)}</p>}
            <p>Status: {app.status || "Submitted"}</p>
          </div>
        ))
      )}
    </div>
  );
}   

export default MyApplications;
