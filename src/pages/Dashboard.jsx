import axios from 'axios';
import { useEffect, useState } from 'react'

function Dashboard({ user }) {
  const [profile, setProfile] = useState(null);


async function fetchProfile() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/profile/${user._id}`);
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, );

  return (
    <div>
        <h1>Welcome {user.cpr}</h1>
        <h2>Profile:</h2>
        {profile && (
            <div>
                <p>Name: {profile.profile.name}</p>
                <p>About: {profile.profile.about}</p>
            </div>
        )}
    </div>
  )
}

export default Dashboard