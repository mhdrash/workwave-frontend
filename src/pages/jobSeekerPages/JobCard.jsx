import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { deleteJob, getAllJobs } from "../../services/jobService";

function getJobsArray(data) {
  return Array.isArray(data) ? data : data.jobs || data.jobCards || [];
}

function getJobCompanyDetails(job) {
  return typeof job.company === "object" ? job.company : job.companyDetails;
}

function getJobCompanyId(job) {
  const companyDetails = getJobCompanyDetails(job);

  return companyDetails?._id || job.company;
}

function JobCardItem({ job }) {
  const companyDetails = getJobCompanyDetails(job);
  const companyName = companyDetails?.name || job.company;

  return (
    <div className="job-card">
      <section>
        <h2>{companyName || "Company"}</h2>
        {companyDetails?.description && <p>{companyDetails.description}</p>}
        {companyDetails?.website && <p>{companyDetails.website}</p>}
      </section>
      <h2>{job.title}</h2>
      {job.location && <p>{job.location}</p>}
      <p>{job.description}</p>
    </div>
  );
}

function JobCard({ job, user }) {
  const navigate = useNavigate();
  const [companyJobs, setCompanyJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(!job);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCompanyJobs() {
      try {
        const data = await getAllJobs();
        const jobs = getJobsArray(data);
        const companyId = user?.company?._id;
        const filteredJobs = companyId
          ? jobs.filter((jobPost) => getJobCompanyId(jobPost) === companyId)
          : [];

        setCompanyJobs(filteredJobs);
      } catch (err) {
        setError(err?.message || "Unable to load company jobs.");
      } finally {
        setIsLoading(false);
      }
    }

    if (!job) {
      fetchCompanyJobs();
    }
  }, [job, user?.company?._id]);

  if (job) {
    return <JobCardItem job={job} />;
  }

  const handleDelete = async (jobId) => {
    try {
      await deleteJob(jobId);
      setCompanyJobs((currentJobs) =>
        currentJobs.filter((companyJob) => (companyJob._id || companyJob.id) !== jobId)
      );
    } catch (err) {
      setError(err?.message || "Unable to delete job.");
    }
  };

  return (
    <main>
      <h1>Company Posted Jobs</h1>

      {isLoading && <p>Loading posted jobs...</p>}
      {error && <p>{error}</p>}

      {!isLoading && !error && !user?.company?._id && (
        <p>Please create a company before viewing posted jobs.</p>
      )}

      {!isLoading && !error && user?.company?._id && companyJobs.length === 0 && (
        <p>This company has not posted any jobs yet.</p>
      )}

      {!isLoading && !error && companyJobs.length > 0 && (
        <div className="job-card-list">
          {companyJobs.map((companyJob) => (
            <div key={companyJob._id || companyJob.id}>
              <JobCardItem job={companyJob} />
              <div className="actions">
                <button
                  type="button"
                  onClick={() => navigate(`/job-form/${companyJob._id || companyJob.id}`)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(companyJob._id || companyJob.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default JobCard;
