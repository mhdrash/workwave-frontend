import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { getJobById } from "../../services/jobService";
import { submitApplication } from "../../services/applicationService";

function normalizeProfile(profileData = {}) {
  const profile = profileData.profile || profileData;
  const education = profile.education || {};
  const experience = profile.experience || {};

  return {
    name: profile.name || "",
    about: profile.about || "",
    institution: profile.institution || education.institution || "",
    degreeLevel: profile.degreeLevel || education.degreeLevel || "",
    educationField: profile.educationField || education.educationField || "",
    graduationYear: profile.graduationYear || education.date || "",
    grade: profile.grade || education.grade || "",
    educationDescription:
      profile.educationDescription || education.description || "",
    organization: profile.organization || experience.organization || "",
    occupation: profile.occupation || experience.occupation || "",
    location: profile.location || experience.location || "",
    locationType: profile.locationType || experience.locationType || "",
    startDate: profile.startDate || experience.startDate || "",
    endDate: profile.endDate || experience.endDate || "",
    experienceDescription:
      profile.experienceDescription || experience.description || "",
  };
}

function getErrorMessage(error, fallback) {
  const message = error?.err || error?.message || fallback;

  if (error?.status) {
    return `${message} Status: ${error.status}`;
  }

  return message;
}

function ApplicationReview({ user }) {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchReviewData() {
      try {
        const [jobResponse, profileResponse] = await Promise.all([
          getJobById(jobId),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/profile/${user._id}`),
        ]);

        setJob(jobResponse.job || jobResponse.jobCard || jobResponse);
        setFormData(normalizeProfile(profileResponse.data));
      } catch (err) {
        setError(err?.message || "Unable to load application review.");
      }
    }

    fetchReviewData();
  }, [jobId, user._id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      applicantId: user._id,
    };

    try {
      setIsSubmitting(true);
      const application = await submitApplication(jobId, payload);
      const submittedApplication = application.application || application;

      navigate("/my-applications", {
        state: {
          application: {
            ...submittedApplication,
            applicant: submittedApplication.applicant || user._id,
            job: submittedApplication.job || job,
            status: submittedApplication.status || "Submitted",
          },
        },
      });
    } catch (err) {
      console.error("Application submit failed:", err);
      setError(getErrorMessage(err, "Unable to submit application."));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!formData) {
    return <p>Loading application review...</p>;
  }

  return (
    <main>
      <h1>Application Review</h1>

      {job && (
        <section>
          <h2>{job.title}</h2>
          {job.location && <p>{job.location}</p>}
          {job.description && <p>{job.description}</p>}
        </section>
      )}

      {error && <p>{error}</p>}

      <form onSubmit={handleConfirm}>
        <section>
          <h2>Personal Information</h2>
          <p>CPR: {user.cpr}</p>

          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />

          <br /><br />

          <label htmlFor="about">About:</label>
          <input
            id="about"
            name="about"
            type="text"
            value={formData.about}
            onChange={handleChange}
          />
        </section>

        <section>
          <h2>Education</h2>

          <label htmlFor="institution">Institution:</label>
          <input
            id="institution"
            name="institution"
            type="text"
            value={formData.institution}
            onChange={handleChange}
          />

          <br /><br />

          <label htmlFor="degreeLevel">Degree Level:</label>
          <input
            id="degreeLevel"
            name="degreeLevel"
            type="text"
            value={formData.degreeLevel}
            onChange={handleChange}
          />

          <br /><br />

          <label htmlFor="educationField">Field of Study:</label>
          <input
            id="educationField"
            name="educationField"
            type="text"
            value={formData.educationField}
            onChange={handleChange}
          />

          <br /><br />

          <label htmlFor="graduationYear">Graduation Year:</label>
          <input
            id="graduationYear"
            name="graduationYear"
            type="text"
            value={formData.graduationYear}
            onChange={handleChange}
          />

          <br /><br />

          <label htmlFor="grade">Grade:</label>
          <input
            id="grade"
            name="grade"
            type="number"
            value={formData.grade}
            onChange={handleChange}
          />

          <br /><br />

          <label htmlFor="educationDescription">Description:</label>
          <input
            id="educationDescription"
            name="educationDescription"
            type="text"
            value={formData.educationDescription}
            onChange={handleChange}
          />
        </section>

        <section>
          <h2>Experience</h2>

          <label htmlFor="organization">Organization:</label>
          <input
            id="organization"
            name="organization"
            type="text"
            value={formData.organization}
            onChange={handleChange}
          />

          <br /><br />

          <label htmlFor="occupation">Occupation:</label>
          <input
            id="occupation"
            name="occupation"
            type="text"
            value={formData.occupation}
            onChange={handleChange}
          />

          <br /><br />

          <label htmlFor="startDate">Start Date:</label>
          <input
            id="startDate"
            name="startDate"
            type="text"
            value={formData.startDate}
            onChange={handleChange}
          />

          <br /><br />

          <label htmlFor="endDate">End Date:</label>
          <input
            id="endDate"
            name="endDate"
            type="text"
            value={formData.endDate}
            onChange={handleChange}
          />

          <br /><br />

          <label htmlFor="location">Location:</label>
          <input
            id="location"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
          />

          <br /><br />

          <label htmlFor="locationType">Location Type:</label>
          <input
            id="locationType"
            name="locationType"
            type="text"
            value={formData.locationType}
            onChange={handleChange}
          />

          <br /><br />

          <label htmlFor="experienceDescription">
            Experience Description:
          </label>
          <input
            id="experienceDescription"
            name="experienceDescription"
            type="text"
            value={formData.experienceDescription}
            onChange={handleChange}
          />
        </section>

        <br />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Confirm"}
        </button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </main>
  );
}

export default ApplicationReview;
