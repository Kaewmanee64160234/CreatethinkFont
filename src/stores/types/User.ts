// This is a simple TypeScript interface to describe the user profile object.
interface UserProfile {
  email: string;
  given_name: string;
  family_name: string;
}

// Function to fetch the user profile from Google's userinfo endpoint.
async function fetchUserProfile(accessToken: string): Promise<UserProfile> {
  const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }

  const data: UserProfile = await response.json();
  return data;
}
