import axios from "axios";
import { BASE_URL } from "../utils/api_base_url_configration";

const getConfig = () => {
  return {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  };
};

// Create Course
export const addAcademyBatchServ = async (formData) => {
    try {
        const response = await axios.post(BASE_URL + "api/academy-batch/create", formData, getConfig());
        return response;
    } catch (error) {
        throw error;
    }
};

// List Courses
export const getAcademyBatchServ = async (formData) => {
    try {
        const response = await axios.post(BASE_URL + "api/academy-batch/list", formData);
        return response
    } catch (error) {
        throw error;
    }
};

// Get List Details
export const getAcademyBatchDetailsServ = async (id) => {
    try {
        const response = await axios.get(BASE_URL + "api/academy-batch/details/"+id);
        return response;
    } catch (error) {
        throw error;
    }
};

//update batch
export const updateAcademyBatchServ = async (id, formData) => {
    try {
        const response = await axios.put(BASE_URL + `api/academy-batch/update/${id}`, formData, getConfig()); 
        return response;
    } catch (error) {
        throw error;
    }
};

// delete batch
export const deleteAcademyBatchServ = async (id) => {
    try {
        const response = await axios.delete(BASE_URL + "api/academy-batch/delete/"+id, getConfig());
        return response;
    } catch (error) {
        throw error
    }
}

// get category 
export const getCategoryServ = async (formData) => {
    try {
      const response = await axios.post(BASE_URL + "api/category/list", formData);
      return response;
    } catch (error) {
      // Handle error (e.g., log or throw an error)
      console.error("Error fetching data:", error);
      throw error;
    }
  };