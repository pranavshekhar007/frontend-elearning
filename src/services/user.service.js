import axios from "axios";

import { BASE_URL } from "../../src/utils/api_base_url_configration";

const token = localStorage.getItem("token");

const getConfig = () => {
  return {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  };
};

// Create User (Register)
export const createUserServ = async (formData) => {
  try {
    const response = await axios.post(BASE_URL + "api/user/sign-up", formData);
    return response;
  } catch (error) {
    console.error("Error creating admin:", error);
    throw error;
  }
};

export const getUserListServ = async (formData) => {
  try {
    const response = await axios.post(BASE_URL + "api/user/list", formData);
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Update Admin
export const updateUserServ = async (id, formData) => {
  try {
    const response = await axios.put(BASE_URL + "api/user/update/" + id, formData);
    return response;
  } catch (error) {
    console.error("Error updating admin:", error);
    throw error;
  }
};

export const deleteUserServ = async (id) => {
  try {
    const response = await axios.delete(BASE_URL + "api/user/delete/"+id);
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const dashboardDetailsServ = async () => {
  try {
    const response = await axios.get(BASE_URL + "user/dashboard-details");
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};