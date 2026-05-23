import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  deleteApplication,
  getMyApplications,
} from "../../services/applicationService";
import { getJobById } from "../../services/jobService";

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

function getApplicationId(application) {
  return application._id || application.id;
}

function getApplicationJobId(application) {
  if (typeof application.job === "object") {
    return application.job?._id || application.job?.id;
  }

  return application.job || application.jobId;
}

function MyApplications({ user }) {
  const location = useLocation();
  const navigate = useNavigate();
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
        const applicationsWithJobs = await Promise.all(
          fetchedApplications.map(async (application) => {
            const jobId = getApplicationJobId(application);

            if (typeof application.job === "object" || !jobId) {
              return application;
            }

            try {
              const jobData = await getJobById(jobId);
              return {
                ...application,
                job: jobData.jobCard || jobData.job || jobData,
              };
            } catch {
              return application;
            }
          })
        );

        setApplications((currentApplications) => {
          const combinedApplications = [
            ...currentApplications,
            ...applicationsWithJobs,
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

  const handleWithdraw = async (applicationId) => {
    try {
      setError("");
      await deleteApplication(applicationId);
      setApplications((currentApplications) =>
        currentApplications.filter(
          (application) => getApplicationId(application) !== applicationId
        )
      );
    } catch (err) {
      setError(err?.message || "Unable to withdraw application.");
    }
  };

  const handleSeeDetails = (jobId) => {
    navigate(`/job-details/${jobId}`);
  };

  return (
    <main>
      <h1>My Applications</h1>
      {error && <p>{error}</p>}
      {applications.length === 0 ? (
        <p>You have not applied to any jobs yet.</p>
      ) : (
        <div className="job-card-list">
          {applications.map((app) => (
            <div
              key={getApplicationId(app) || `${getApplicantId(app)}-${getApplicationJobId(app)}`}
              className="application-card"
            >
              <h2>{getJobTitle(app)}</h2>
              {getApplicationName(app) && <p>Name: {getApplicationName(app)}</p>}
              <p>Applicant: {getApplicantId(app)}</p>
              <p>Job ID: {getApplicationJobId(app)}</p>
              {getCompanyName(app) && <p>Company: {getCompanyName(app)}</p>}
              <p>Status: {app.status || "Submitted"}</p>
              <div className="actions">
                <button
                  type="button"
                  onClick={() => handleWithdraw(getApplicationId(app))}
                >
                  Withdraw
                </button>
                <button
                  type="button"
                  onClick={() => handleSeeDetails(getApplicationJobId(app))}
                >
                  See Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}   

export default MyApplications;
