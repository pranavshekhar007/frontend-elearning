import axios from "axios";
import { BASE_URL } from "../../src/utils/api_base_url_configration";

// Config for authenticated requests
const getConfig = () => {
  return {
    headers: {
      "Content-Type": "application/form-data",
      Accept: "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  };
};

// Create Admin (Register)
export const createAdminServ = async (formData) => {
  try {
    const response = await axios.post(BASE_URL + "api/admin/create", formData);
    return response;
  } catch (error) {
    console.error("Error creating admin:", error);
    throw error;
  }
};

// Login Admin
export const loginAdminServ = async (formData) => {
  try {
    const response = await axios.post(BASE_URL + "api/admin/login", formData);
    return response;
  } catch (error) {
    console.error("Error logging in admin:", error);
    throw error;
  }
};

// Get All Admins
export const getAdminListServ = async (payload) => {
  try {
    const response = await axios.get(BASE_URL + "api/admin/list", {params:payload});
    return response;
  } catch (error) {
    console.error("Error fetching admin list:", error);
    throw error;
  }
};

// Get Admin Details
export const getAdminDetailsServ = async (id) => {
  try {
    const response = await axios.get(BASE_URL + "api/admin/details/" + id, getConfig());
    return response;
  } catch (error) {
    console.error("Error fetching admin details:", error);
    throw error;
  }
};

// Update Admin
export const updateAdminServ = async (id, formData) => {
  try {
    const response = await axios.put(BASE_URL + "api/admin/update/" + id, formData);
    return response;
  } catch (error) {
    console.error("Error updating admin:", error);
    throw error;
  }
};

// Delete Admin
export const deleteAdminServ = async (id) => {
  try {
    const response = await axios.delete(BASE_URL + "api/admin/delete/" + id, getConfig());
    return response;
  } catch (error) {
    console.error("Error deleting admin:", error);
    throw error;
  }
};
