import React from "react";
import { useState, useEffect } from "react";
import apiClient from "../../services/api";

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    apiClient.get("/user/profile")
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{profile.name}'s Profile</h1>
      <p>Email: {profile.email}</p>
      <p>Phone: {profile.phone}</p>
      {/* Add more profile fields as needed */}
    </div>
  );
}

export default Profile;