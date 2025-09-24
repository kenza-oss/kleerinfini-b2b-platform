import axios from "./axios";

// ✅ Helper to attach token if it exists
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// -------------------------
// 🔹 Get a profile by ID
// -------------------------
export const getProfileById = async (id) => {
  try {
    const res = await axios.get(`profiles/${id}/`, {
      headers: getAuthHeaders(),
    });
    return res.data;
  } catch (err) {
    console.error("❌ Failed to fetch profile by ID:", err);
    return null;
  }
};

// -------------------------
// 🔹 List all profiles
// -------------------------
export const getProfiles = async () => {
  try {
    const res = await axios.get("profiles/", {
      headers: getAuthHeaders(),
    });
    return res.data;
  } catch (err) {
    console.error("❌ Failed to fetch profiles:", err);
    return [];
  }
};

// -------------------------
// 🔹 Create a new profile
// -------------------------
export const createProfile = async (profileData) => {
  try {
    const res = await axios.post("profiles/", profileData, {
      headers: getAuthHeaders(),
    });
    return res.data;
  } catch (err) {
    console.error("❌ Failed to create profile:", err);
    return null;
  }
};

// -------------------------
// 🔹 Update a profile by ID
// -------------------------
export const updateProfile = async (id, profileData) => {
  try {
    const res = await axios.put(`profiles/${id}/`, profileData, {
      headers: getAuthHeaders(),
    });
    return res.data;
  } catch (err) {
    console.error("❌ Failed to update profile:", err);
    return null;
  }
};

// -------------------------
// 🔹 Partial update (PATCH)
// -------------------------
export const patchProfile = async (id, profileData) => {
  try {
    const res = await axios.patch(`profiles/${id}/`, profileData, {
      headers: getAuthHeaders(),
    });
    return res.data;
  } catch (err) {
    console.error("❌ Failed to patch profile:", err);
    return null;
  }
};

// -------------------------
// 🔹 Delete profile by ID
// -------------------------
export const deleteProfile = async (id) => {
  try {
    await axios.delete(`profiles/${id}/`, {
      headers: getAuthHeaders(),
    });
    return true;
  } catch (err) {
    console.error("❌ Failed to delete profile:", err);
    return false;
  }
};

// -------------------------
// 🔹 Logged-in producer profile
// -------------------------
export const getProducerProfile = async () => {
  try {
    // ⚠️ Change "profiles/me/" to "profiles/:id/" if backend doesn’t support /me/
    const res = await axios.get("profiles/me/", {
      headers: getAuthHeaders(),
    });
    return res;
  } catch (err) {
    console.error("❌ Failed to fetch producer profile:", err);
    throw err;
  }
};

export const updateProducerProfile = async (profileData) => {
  try {
    const res = await axios.put("profiles/me/", profileData, {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (err) {
    console.error("❌ Failed to update producer profile:", err);
    throw err;
  }
};
