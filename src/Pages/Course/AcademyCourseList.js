import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar";
import TopNav from "../../Components/TopNav";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import NoRecordFound from "../../Components/NoRecordFound";
import { addAcademyCourseServ, deleteAcademyCourseServ, getAcademyCourseServ, getCategoryServ, updateAcademyCourseServ,  } from "../../services/academyCourse.services";


function AcademyCourseList() {
  const [list, setList] = useState([]);
  const [statics, setStatics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [payload, setPayload] = useState({
    searchKey: "",
    pageNo: 1,
    pageCount: 10,
    sortOrder: -1,
    sortByField: "",
  });

  const [courseFormData, setCourseFormData] = useState({
    name: "",
    image: "",
    instructorName: "",
    price: "",
    status: "",
    categoryId: "",
  });

  const [showSkelton, setShowSkelton] = useState(false);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleGetAcademyCourses();
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [payload.searchKey]);

  useEffect(() => {
    handleGetAcademyCourses();
  }, [payload.sortByField, payload.sortOrder, payload.status]);

  const handleGetAcademyCourses = async () => {
    if (list.length === 0) setShowSkelton(true);
    try {
      const res = await getAcademyCourseServ(payload);
      setList(res?.data?.data || []);
      setStatics(res?.data?.documentCount);
    } catch (error) {
      toast.error("Failed to fetch courses.");
    } finally {
      setIsLoading(false);
      setShowSkelton(false);
    }
  };

  const staticsArr = [
    {
      title: "Total Course",
      count: statics?.totalCount,
      bgColor: "#6777EF",
    },
    {
      title: "Active Course",
      count: statics?.activeCount,
      bgColor: "#63ED7A",
    },
    {
      title: "Inactive Course",
      count: statics?.inactiveCount,
      bgColor: "#FFA426",
    },
  ];

  const handleAddAcademyCourse = async () => {
    const { name, image, instructorName, price, status } = courseFormData;
    if (!name || !image || !instructorName || !price || !status) {
      return toast.error("All fields are required.");
    }

    try {
      const res = await addAcademyCourseServ(courseFormData);
      if (res?.data?.statusCode === 200) {
        toast.success("Course added successfully.");
        setShowModal(false);
        setCourseFormData({
          name: "",
          image: "",
          instructorName: "",
          price: "",
          status: "",
          categoryId: "",
        });
        handleGetAcademyCourses();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Internal Server Error");
    }
  };

  const handleEditAcademyCourse = (course) => {
    setCourseFormData({
      name: course.name,
      image: course.image,
      instructorName: course.instructorName,
      price: course.price,
      status: course.status,
      categoryId: course.categoryId?._id || "",
    });
    setEditId(course._id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleUpdateAcademyCourse = async () => {
    if (
      !courseFormData.name ||
      !courseFormData.image ||
      !courseFormData.instructorName ||
      !courseFormData.price ||
      !courseFormData.status ||
      !courseFormData.categoryId 
    ) {
      return toast.error("All fields are required.");
    }

    try {
      const response = await updateAcademyCourseServ(editId, courseFormData);
      if (response?.data?.statusCode === 200) {
        toast.success("Course updated successfully.");
        setShowModal(false);
        setIsEditing(false);
        setCourseFormData({
          name: "",
          image: "",
          instructorName: "",
          price: "",
          status: "",
          categoryId: "",
        });
        handleGetAcademyCourses();
      } else {
        toast.error("Failed to update pricing plan.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  const handleDeleteAcademyCourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      const res = await deleteAcademyCourseServ(id);
      if (res?.data?.statusCode === 200) {
        toast.success("Course deleted successfully.");
        handleGetAcademyCourses();
      }
    } catch (error) {
      toast.error("Failed to delete course.");
    }
  };

  const [categories, setCategories] = useState([]);

  const handleGetCategoryFunc = async () => {
    if (list.length == 0) {
      setShowSkelton(true);
    }
    try {
      let response = await getCategoryServ();
      setCategories(response.data?.data || []);
    } catch (error) {}
    setShowSkelton(false);
  };

  useEffect(() => {
    handleGetCategoryFunc();
  }, []);

  if (isLoading) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="bodyContainer">
      <Sidebar selectedMenu="Course" selectedItem="AcademyCourse List" />
      <div className="mainContainer">
        <TopNav />
        <div className="p-lg-4 p-md-3 p-2">
          <div
            className="row mx-0 p-0"
            style={{
              position: "relative",
              top: "-75px",
              marginBottom: "-75px",
            }}
          >
            {staticsArr?.map((v, i) => {
              return (
                <div className="col-md-4 col-12 ">
                  <div className="topCard shadow-sm py-4 px-3 rounded mb-3">
                    <div className="d-flex align-items-center ">
                      <div
                        className="p-2 shadow rounded"
                        style={{ background: v?.bgColor }}
                      >
                        <img src="https://cdn-icons-png.flaticon.com/128/666/666120.png" />
                      </div>
                      <div className="ms-3">
                        <h6>{v?.title}</h6>
                        <h2 className="text-secondary">{v?.count}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="row m-0 p-0 d-flex align-items-center my-4 topActionForm">
            <div className="col-lg-2 mb-2 col-md-12 col-12">
              <h3 className="mb-0 text-bold text-secondary">Academy Courses</h3>
            </div>
            <div className="col-lg-4 mb-2 col-md-12 col-12">
              <div>
                <input
                  className="form-control borderRadius24"
                  placeholder="Search"
                  onChange={(e) =>
                    setPayload({ ...payload, searchKey: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-lg-3 mb-2  col-md-6 col-12">
              <div>
                <select
                  className="form-control borderRadius24"
                  onChange={(e) =>
                    setPayload({ ...payload, status: e.target.value })
                  }
                >
                  <option value="">Select Status</option>
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
                </select>
              </div>
            </div>
            <div className="col-lg-3 mb-2 col-md-6 col-12">
              <div>
                <button
                  className="btn btn-primary w-100 borderRadius24"
                  style={{ background: "#6777EF" }}
                  onClick={() => setShowModal(true)}
                >
                  Add Academy Course
                </button>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <div className="card-body px-2">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr style={{ background: "#F3F3F3", color: "#000" }}>
                      <th
                        className="text-center py-3"
                        style={{ borderRadius: "30px 0px 0px 30px" }}
                      >
                        Sr. no.
                      </th>
                      <th className="text-center py-3">Academy Course Name</th>
                      <th className="text-center py-3">Image</th>
                      <th className="text-center py-3">Category</th>
                      <th className="text-center py-3">Instructor</th>
                      <th className="text-center py-3">Price</th>
                      <th className="text-center py-3">Status</th>
                      <th className="text-center py-3">Created At</th>
                      <th
                        className="text-center py-3"
                        style={{ borderRadius: "0px 30px 30px 0px" }}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {showSkelton
                      ? [...Array(5)].map((_, i) => (
                          <tr key={i}>
                            {[...Array(6)].map((_, j) => (
                              <td className="text-center" key={j}>
                                <Skeleton width={100} height={20} />
                              </td>
                            ))}
                          </tr>
                        ))
                      : list?.map((course, i) => (
                          <tr key={course._id}>
                            <td className="text-center">{i + 1}</td>
                            <td className="text-center">{course.name}</td>
                            <td className="text-center">
                              <img
                                src={course.image}
                                alt="course"
                                className="img-thumbnail rounded-circle mx-auto d-block"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  objectFit: "cover",
                                }}
                              />
                            </td>
                            <td className="text-center">
                              {course.categoryId?.name || "-"}
                            </td>

                            <td className="text-center">
                              {course.instructorName}
                            </td>
                            <td className="text-center">₹{course.price}</td>
                            <td className="text-center">
                              {course.status ? (
                                <div
                                  className="badge py-2"
                                  style={{ background: "#3ABAF4" }}
                                >
                                  Active
                                </div>
                              ) : (
                                <div
                                  className="badge py-2 "
                                  style={{ background: "#FFA426" }}
                                >
                                  Inactive
                                </div>
                              )}
                            </td>
                            <td className="text-center">
                              {moment(course.createdAt).format("DD-MM-YY")}
                            </td>
                            <td className="text-center">
                              <button
                                className="btn btn-info text-light mx-2"
                                onClick={() => handleEditAcademyCourse(course)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-warning text-light"
                                onClick={() => handleDeleteAcademyCourse(course._id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>
                {list.length === 0 && !showSkelton && <NoRecordFound />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Modal */}
      <div
        className={`modal fade ${showModal ? "show d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {isEditing ? "Edit Course" : "Add Course"}
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>

            <div className="modal-body">
              {[
                "name",
                "image",
                "instructorName",
                "price",
                "status",
                "categoryId",
              ].map((field) => (
                <div className="mb-3" key={field}>
                  <label className="form-label text-capitalize">
                    {field === "instructorName"
                      ? "Instructor Name"
                      : field === "categoryId"
                      ? "Category"
                      : field}
                  </label>

                  {field === "image" ? (
                    <>
                      {/* Preview Existing Image */}
                      {courseFormData.image &&
                        !(courseFormData.image instanceof File) && (
                          <div className="mb-2">
                            <img
                              src={courseFormData.image}
                              alt="Course"
                              className="img-thumbnail"
                              style={{
                                maxHeight: "200px",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                        )}

                      {/* File Input */}
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setCourseFormData({
                            ...courseFormData,
                            image: file,
                          });
                        }}
                      />
                    </>
                  ) : field === "status" ? (
                    <select
                      className="form-select"
                      value={courseFormData[field]}
                      onChange={(e) =>
                        setCourseFormData({
                          ...courseFormData,
                          [field]: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Status</option>
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  ) : field === "categoryId" ? (
                    <select
                      className="form-select"
                      value={courseFormData[field] || ""}
                      onChange={(e) =>
                        setCourseFormData({
                          ...courseFormData,
                          [field]: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      value={courseFormData[field]}
                      onChange={(e) =>
                        setCourseFormData({
                          ...courseFormData,
                          [field]: e.target.value,
                        })
                      }
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="modal-footer border-0">
              <button
                className="btn btn-light border"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-success"
                onClick={isEditing ? handleUpdateAcademyCourse : handleAddAcademyCourse}
              >
                {isEditing ? "Update" : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AcademyCourseList;
