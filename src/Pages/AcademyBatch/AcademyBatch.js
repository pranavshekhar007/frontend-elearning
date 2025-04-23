import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar";
import TopNav from "../../Components/TopNav";
import NoRecordFound from "../../Components/NoRecordFound";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";
import { addAcademyBatchServ, deleteAcademyBatchServ, getAcademyBatchServ, getCategoryServ, updateAcademyBatchServ } from "../../services/academyBatch.service";

const AcademyBatchList = () => {
  const [list, setList] = useState([]);
  const [showSkelton, setShowSkelton] = useState(false);
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
  const [batchFormData, setBatchFormData] = useState({
    name: "",
    image: "",
    duration: "",
    startDate: "",
    price: "",
    status: "",
    type: "",
    categoryId: "",
  });

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleGetAcademyBatch();
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [payload.searchKey]);

  useEffect(() => {
    handleGetAcademyBatch();
  }, [payload.sortByField, payload.sortOrder, payload.status]);

  const handleGetAcademyBatch = async () => {
    if (list.length === 0) setShowSkelton(true);
    try {
      const res = await getAcademyBatchServ(payload);
      setList(res?.data?.data || []);
      setStatics(res?.data?.documentCount);
    } catch (error) {
      toast.error("Failed to fetch AcademyBatch.");
    } finally {
      setIsLoading(false);
      setShowSkelton(false);
    }
  };

  useEffect(() => {
    handleGetAcademyBatch();;
  }, [payload.sortByField, payload.sortOrder, payload.status]);

  const staticsArr = [
    {
      title: "Total Academy Batch",
      count: statics?.totalCount,
      bgColor: "#6777EF",
    },
    {
      title: "Active Academy Batch",
      count: statics?.activeCount,
      bgColor: "#63ED7A",
    },
    {
      title: "Inactive Academy Batch",
      count: statics?.inactiveCount,
      bgColor: "#FFA426",
    },
  ];

  const handleAddAcademyBatch = async () => {
    const { name, image, duration, startDate, price, status, type } = batchFormData;
    if (!name || !image || !duration || !startDate || !price || !status || !type) {
      return toast.error("All fields are required.");
    }

    try {
      const res = await addAcademyBatchServ(batchFormData);
      if (res?.data?.statusCode === 200) {
        toast.success("AcademyBatch added successfully.");
        setShowModal(false);
        setBatchFormData({
          name: "",
          image: "",
          duration: "",
          startDate: "",
          price: "",
          status: "",
          type: "",
          categoryId: "",
        });
        handleGetAcademyBatch();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Internal Server Error");
    }
  };

  const handleEditAcademyBatch = (batch) => {
    setBatchFormData({
      name: batch.name,
      image: batch.image,
      duration: batch.duration,
      startDate: batch.startDate,
      price: batch.price,
      status: batch.status,
      type: batch.type,
      categoryId: batch.categoryId?._id || "",
    });
    setEditId(batch._id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleUpdateAcademyBatch = async () => {
    if (
      !batchFormData.name ||
      !batchFormData.image ||
      !batchFormData.duration ||
      !batchFormData.startDate ||
      !batchFormData.price ||
      !batchFormData.type ||
      !batchFormData.status
    ) {
      return toast.error("All fields are required.");
    }

    try {
      const response = await updateAcademyBatchServ(editId, batchFormData);
      if (response?.data?.statusCode === 200) {
        toast.success("AcademyBatch updated successfully.");
        setShowModal(false);
        setIsEditing(false);
        setBatchFormData({
          name: "",
          image: "",
          duration: "",
          startDate: "",
          price: "",
          status: "",
          type: "",
          categoryId: "",
        });
        handleGetAcademyBatch();
      } else {
        toast.error("Failed to update Batch.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  const handleDeleteAcademyBatch = async (id) => {
    if (!window.confirm("Are you sure you want to delete this AcademyBatch?")) return;
    try {
      const res = await deleteAcademyBatchServ(id);
      if (res?.data?.statusCode === 200) {
        toast.success("AcademyBatch deleted successfully.");
        handleGetAcademyBatch();
      }
    } catch (error) {
      toast.error("Failed to delete Batch.");
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
      <Sidebar selectedMenu="AcademyBatch" selectedItem="AcademyBatch List" />
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
              <h3 className="mb-0 text-bold text-secondary">Batch List</h3>
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
                  Add Batch
                </button>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="card-body px-2">
              <div className="table-responsive table-invoice">
                <table className="table">
                  <tbody>
                    <tr style={{ background: "#F3F3F3", color: "#000" }}>
                      <th
                        className="text-center py-3"
                        style={{ borderRadius: "30px 0px 0px 30px" }}
                      >
                        Sr. No
                      </th>
                      <th className="text-center py-3">AcademyBatch Name</th>
                      <th className="text-center py-3">Image</th>
                      <th className="text-center py-3">Category Name</th>
                      <th className="text-center py-3">Duration</th>
                      <th className="text-center py-3">Start Date</th>
                      <th className="text-center py-3">Status</th>
                      <th className="text-center py-3">type</th>
                      <th className="text-center py-3">Price</th>
                      <th
                        className="text-center py-3 "
                        style={{ borderRadius: "0px 30px 30px 0px" }}
                      >
                        Action
                      </th>
                    </tr>
                    <div className="py-2"></div>
                    {showSkelton
                      ? [1, 2, 3, 4, 5, 6, 7, 8, 9]?.map((v, i) => {
                          return (
                            <>
                              <tr key={i}>
                                <td className="text-center">
                                  <Skeleton width={50} height={50} />
                                </td>
                                <td className="text-center">
                                  <Skeleton
                                    width={50}
                                    height={50}
                                    borderRadius={25}
                                  />
                                </td>
                                <td className="text-center">
                                  <Skeleton width={100} height={25} />
                                </td>
                                <td className="text-center">
                                  <Skeleton width={100} height={25} />
                                </td>
                                <td className="text-center">
                                  <Skeleton width={100} height={25} />
                                </td>
                                <td className="text-center">
                                  <Skeleton width={100} height={25} />
                                </td>
                              </tr>
                              <div className="py-2"></div>
                            </>
                          );
                        })
                      : list?.map((v, i) => {
                          return (
                            <>
                              <tr>
                                <td className="text-center">{i + 1}</td>
                                <td className="font-weight-600 text-center">
                                  {v?.name}
                                </td>
                                <td className="text-center">
                                  <img
                                    src={v?.image}
                                    style={{ height: "30px" }}
                                  />
                                </td>
                                <td className="font-weight-600 text-center">
                                  {v?.categoryId?.name}
                                </td>
                                <td className="font-weight-600 text-center">
                                  {v?.duration}
                                </td>
                                <td className="font-weight-600 text-center">
                                  {v?.startDate}
                                </td>

                                <td className="text-center">
                                  {v?.status ? (
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
                                <td className="font-weight-600 text-center">
                                  <div
                                    className="badge py-2"
                                    style={{
                                      background:
                                        v?.type?.toLowerCase() === "offline"
                                          ? "#FF4C4C"
                                          : "#63ED7A",
                                    }}
                                  >
                                    {v?.type ? v?.type : "None"}
                                  </div>
                                </td>
                                <td className="text-center">
                                  {v?.price}
                                </td>
                                <td className="text-center">
                                  <a
                                    onClick={() => handleEditAcademyBatch(v)}
                                    className="btn btn-info mx-2 text-light shadow-sm"
                                  >
                                    Edit
                                  </a>
                                  <a
                                    onClick={() => handleDeleteAcademyBatch(v?._id)}
                                    className="btn btn-warning mx-2 text-light shadow-sm"
                                  >
                                    Delete
                                  </a>
                                </td>
                              </tr>
                              <div className="py-2"></div>
                            </>
                          );
                        })}
                  </tbody>
                </table>
                {list.length == 0 && !showSkelton && <NoRecordFound />}
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
                {isEditing ? "Edit AcademyBatch" : "Add AcademyBatch"}
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
                "duration",
                "startDate",
                "price",
                "status",
                "type",
                "categoryId",
              ].map((field) => (
                <div className="mb-3" key={field}>
                  <label className="form-label text-capitalize">
                    {field === "categoryId" ? "Category" : field}
                  </label>

                  {field === "image" ? (
                    <>
                      {/* Preview Existing Image */}
                      {batchFormData.image &&
                        !(batchFormData.image instanceof File) && (
                          <div className="mb-2">
                            <img
                              src={batchFormData.image}
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
                          setBatchFormData({
                            ...batchFormData,
                            image: file,
                          });
                        }}
                      />
                    </>
                  ) : field === "startDate" ? (
                    <input
                      type="date"
                      className="form-control"
                      value={batchFormData[field]}
                      onChange={(e) =>
                        setBatchFormData({
                          ...batchFormData,
                          [field]: e.target.value,
                        })
                      }
                    />
                  ) : field === "type" ? (
                    <select
                      className="form-select"
                      value={batchFormData[field]}
                      onChange={(e) =>
                        setBatchFormData({
                          ...batchFormData,
                          [field]: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Type</option>
                      <option value="online">Online</option>
                      <option value="offline">Offline</option>
                    </select>
                  ) : field === "status" ? (
                    <select
                      className="form-select"
                      value={batchFormData[field]}
                      onChange={(e) =>
                        setBatchFormData({
                          ...batchFormData,
                          [field]: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Status</option>
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  )  : field === "categoryId" ? (
                    <select
                      className="form-select"
                      value={batchFormData[field] || ""}
                      onChange={(e) =>
                        setBatchFormData({
                          ...batchFormData,
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
                  ) :  (
                    <input
                      type="text"
                      className="form-control"
                      value={batchFormData[field]}
                      onChange={(e) =>
                        setBatchFormData({
                          ...batchFormData,
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
                onClick={isEditing ? handleUpdateAcademyBatch : handleAddAcademyBatch}
              >
                {isEditing ? "Update" : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademyBatchList;
