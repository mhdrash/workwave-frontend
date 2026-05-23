function JobCard({ job }) {
  if (!job) {
    return null;
  }

  const companyName =
    typeof job.company === "object" ? job.company?.name : job.company;

  return (
    <div className="job-card">
      <h2>{job.title}</h2>
      {companyName && <p>{companyName}</p>}
      {job.location && <p>{job.location}</p>}
      <p>{job.description}</p>
    </div>
  );
}

export default JobCard;
