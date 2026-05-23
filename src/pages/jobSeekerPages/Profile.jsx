import React, { useState, useEffect } from "react";
import axios from "axios";

function Profile({ user }) {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/profile/${user._id}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
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
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{formData.cpr}'s Profile</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <h2>Personal Information</h2>

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
      </form>
    </div>
  );
}

export default Profile;