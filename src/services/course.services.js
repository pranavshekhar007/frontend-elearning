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
export const addCourseServ = async (formData) => {
  try {
    const response = await axios.post(BASE_URL + "api/course/create", formData, getConfig());
    return response;
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
};

// List Courses
export const getCourseServ = async (formData) => {
  try {
    const response = await axios.post(BASE_URL + "api/course/list", formData);
    return response;
  } catch (error) {
    console.error("Error fetching course list:", error);
    throw error;
  }
};

// Get Course Details
export const getCourseDetailsServ = async (id) => {
  try {
    const response = await axios.get(BASE_URL + "api/course/details/" + id);
    return response;
  } catch (error) {
    console.error("Error fetching course details:", error);
    throw error;
  }
};

// Update Course
export const updateCourseServ = async (id, formData) => {
  try {
    const response = await axios.put(BASE_URL + `api/course/update/${id}`, formData, getConfig());
    return response;
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  }
};

// Delete Course
export const deleteCourseServ = async (id) => {
  try {
    const response = await axios.delete(BASE_URL + "api/course/delete/" + id, getConfig());
    return response;
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
};

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
