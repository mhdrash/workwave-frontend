import { useState, useEffect } from "react";
import axios from "axios";

function normalizeProfile(profileData = {}) {
  const profile = profileData.profile || profileData;
  const education = profile.education || {};
  const experience = profile.experience || {};

  return {
    _id: profile._id,
    cpr: profile.cpr,
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

function hasProfileDetails(profile) {
  return Boolean(
    profile?._id ||
      profile?.name ||
      profile?.about ||
      profile?.institution ||
      profile?.organization
  );
}

function Profile({ user }) {
  const [formData, setFormData] = useState(null);
  const [profileDetails, setProfileDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/profile/${user._id}`)
      .then((response) => {
        const profile = normalizeProfile(response.data);

        setProfileDetails(profile);
        setFormData(profile);
        setIsEditing(!hasProfileDetails(profile));
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        setFormData(normalizeProfile());
        setIsEditing(true);
      });
  }, [user._id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const payload = {
       name: formData.name,
    about: formData.about,
    education: {
    institution: formData.institution,
    degreeLevel: formData.degreeLevel,
    educationField: formData.educationField,
    date: formData.graduationYear,
    grade: formData.grade,
    description: formData.educationDescription,

    },
    experience: {
        organization: formData.organization,
    occupation: formData.occupation,
    location: formData.location,
    locationType: formData.locationType,
    startDate: formData.startDate,
    endDate: formData.endDate,
    description: formData.experienceDescription,
    }
    }

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/profile/${user._id}`, payload)
      .then((response) => {
        console.log("Profile updated:", response.data);
        const profile = normalizeProfile(response.data);

        setProfileDetails(profile);
        setFormData(profile);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        setError(error.response?.data?.err || "Error saving profile details.");
      });
  };

  const handleEditDetails = () => {
    setFormData(profileDetails || normalizeProfile());
    setIsEditing(true);
    setError("");
  };

  const handleCancelEdit = () => {
    setFormData(profileDetails || normalizeProfile());
    setIsEditing(false);
    setError("");
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  const profileCpr = user?.cpr || profileDetails?.cpr || formData.cpr;
  const profileName = profileDetails?.name || formData.name || profileCpr;

  if (profileDetails && hasProfileDetails(profileDetails) && !isEditing) {
    return (
      <div>
        <h1>{profileName}'s Profile</h1>

        <section>
          <h2>Personal Information</h2>
          <p>CPR: {profileCpr}</p>
          <p>Name: {profileDetails.name}</p>
          <p>About: {profileDetails.about}</p>
        </section>

        <section>
          <h2>Education</h2>
          <p>Institution: {profileDetails.institution}</p>
          <p>Degree Level: {profileDetails.degreeLevel}</p>
          <p>Field of Study: {profileDetails.educationField}</p>
          <p>Graduation Year: {profileDetails.graduationYear}</p>
          <p>Grade: {profileDetails.grade}</p>
          <p>Description: {profileDetails.educationDescription}</p>
        </section>

        <section>
          <h2>Experience</h2>
          <p>Organization: {profileDetails.organization}</p>
          <p>Occupation: {profileDetails.occupation}</p>
          <p>Start Date: {profileDetails.startDate}</p>
          <p>End Date: {profileDetails.endDate}</p>
          <p>Location: {profileDetails.location}</p>
          <p>Location Type: {profileDetails.locationType}</p>
          <p>Description: {profileDetails.experienceDescription}</p>
        </section>

        <button type="button" onClick={handleEditDetails}>
          Edit Details
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>{profileName}'s Profile</h1>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <h2>Personal Information</h2>

          <p>CPR: {profileCpr}</p>

          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name || ""}
            onChange={handleChange}
          />

          <br /><br />

          <label htmlFor="about">about:</label>
          <input
            id="about"
            name="about"
            type="text"
            value={formData.about || ""}
            onChange={handleChange}
          />

          <br /><br />

        </div>

        <br />

        <div>
          <h2>Education</h2>


          <br /><br />

          <label htmlFor="institution">Institution:</label>
          <input
            id="institution"
            name="institution"
            type="text"
            value={formData.institution || ""}
            onChange={handleChange}
          />

          <br /><br />

          <label htmlFor="degreeLevel">Degree Level:</label>
          <input
            id="degreeLevel"
            name="degreeLevel"
            type="text"
            value={formData.degreeLevel || ""}
            onChange={handleChange}
          />

          <br /><br />

          <label htmlFor="educationField">Field of Study:</label>
          <input
            id="educationField"
            name="educationField"
            type="text"
            value={formData.educationField || ""}
            onChange={handleChange}
          />

          <br /><br />

          <label htmlFor="graduationYear">Graduation Year:</label>
          <input
            id="graduationYear"
            name="graduationYear"
            type="text"
            value={formData.graduationYear || ""}
            onChange={handleChange}
          />

          <br /><br />

          <label htmlFor="grade">Grade:</label>
          <input
            id="grade"
            name="grade"
            type="number"
            value={formData.grade || ""}
            onChange={handleChange}
          />

          <br /><br />

          <label htmlFor="educationDescription">Description:</label>
          <input
            id="educationDescription"
            name="educationDescription"
            type="text"
            value={formData.educationDescription || ""}
            onChange={handleChange}
          />
        </div>

        <br /><br />

        <div>
          <h2>Experience</h2>

          <label htmlFor="organization">Organization:</label>
          <input
            id="organization"
            name="organization"
            type="text"
            value={formData.organization || ""}
            onChange={handleChange}
          />

          <br /><br />

          <label htmlFor="occupation">Occupation:</label>
          <input
            id="occupation"
            name="occupation"
            type="text"
            value={formData.occupation || ""}
            onChange={handleChange}
          />

          <br /><br />

          <label htmlFor="startDate">Start Date:</label>
          <input
            id="startDate"
            name="startDate"
            type="text"
            value={formData.startDate || ""}
            onChange={handleChange}
          />

          <br /><br />

          <label htmlFor="endDate">End Date:</label>
          <input
            id="endDate"
            name="endDate"
            type="text"
            value={formData.endDate || ""}
            onChange={handleChange}
          />

          <br /><br />

          <label htmlFor="location">Location:</label>
          <input
            id="location"
            name="location"
            type="text"
            value={formData.location || ""}
            onChange={handleChange}
          />

          <br /><br />

          <label htmlFor="locationType">Location Type:</label>
          <input
            id="locationType"
            name="locationType"
            type="text"
            value={formData.locationType || ""}
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
            value={formData.experienceDescription || ""}
            onChange={handleChange}
          />
        </div>

        <br /><br />

        <button type="submit">Update Profile</button>

        {profileDetails && hasProfileDetails(profileDetails) && (
          <button type="button" onClick={handleCancelEdit}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default Profile;
