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

// Create Booking
export const createBookingServ = async (formData) => {
    try {
        const response = await axios.post(BASE_URL + "api/booking/create", formData);
        return response;
    } catch (error) {
        throw error;
    }
}

export const getBookingListServ = async (formData) => {
  try {
    const response = await axios.post(BASE_URL + "api/booking/list", formData);
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};

// update Booking
export const updateBookingServ = async (id, formData) => {
    try {
        const response = await axios.put(BASE_URL + "api/booking/update/" + id, formData);
        return response;
    } catch (error) {
        throw error;
    }
};

// Delete Booking
export const deleteBookingServ = async (id) => {
    try {
        const response = await axios.delete(BASE_URL + "api/booking/delete/" + id, getConfig());
        return response;
    } catch (error) {
        throw error;
    }
}

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