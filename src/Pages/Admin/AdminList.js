import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar";
import TopNav from "../../Components/TopNav";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import NoRecordFound from "../../Components/NoRecordFound";
import {
  createAdminServ,
  deleteAdminServ,
  getAdminListServ,
  updateAdminServ,
} from "../../services/admin.services";
function AdminList() {
  const [list, setList] = useState([]);
  const [statics, setStatics] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isloading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [payload, setPayload] = useState({
    searchKey: "",
    pageNo: 1,
    pageCount: 10,
    sortOrder: -1,
    sortByField: "",
  });
  const [adminFormData, setAdminFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleGetAdminFunc();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [payload.searchKey]);

  const [showSkelton, setShowSkelton] = useState(false);
  const handleGetAdminFunc = async () => {
    if (list.length == 0) {
      setShowSkelton(true);
    }
    try {
      let response = await getAdminListServ(payload);
      setList(response?.data?.data);
      setStatics(response?.data?.documentCount);
    } catch (error) {
      toast.error("Failed to fetch pricing admins.");
    } finally {
      setIsLoading(false);
    }
    setShowSkelton(false);
  };

  const staticsArr = [
    {
      title: "Total Admin",
      count: statics?.totalAdmin,
      bgColor: "#6777EF",
    },
    {
      title: "Supervisor",
      count: statics?.supervisor,
      bgColor: "#63ED7A",
    },
    {
      title: "Super Admin",
      count: statics?.superAdmin,
      bgColor: "#FFA426",
    },
    {
      title: "Admin",
      count: statics?.admin,
      bgColor: "#4D96FF",
    },
  ];
  useEffect(() => {
    handleGetAdminFunc();
  }, [payload.sortByField, payload.sortOrder, payload.role]);

  const handleAddAdminFunc = async () => {
    setIsLoading(true);
    const { firstName, lastName, email, phoneNumber, password, role } =
      adminFormData;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !password ||
      !role
    ) {
      return toast.error("All fields are required.");
    }

    try {
      const response = await createAdminServ(adminFormData);

      if (response?.data?.statusCode === 201) {
        toast.success(response?.data?.message || "Admin added successfully");
        setShowModal(false);
        setAdminFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          password: "",
          role: "admin",
        });
        handleGetAdminFunc(); // Refresh the list
      } else {
        toast.error("Failed to add Admin .");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Internal Server Error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAdminFunc = async (id) => {
    if (window.confirm("Are you sure you want to delete this pricing plan?")) {
      try {
        const response = await deleteAdminServ(id);
        if (response?.data?.statusCode === 200) {
          toast.success(
            response?.data?.message || "Admin deleted successfully"
          );
          handleGetAdminFunc();
        }
      } catch (error) {
        toast.error("Failed to delete pricing plan.");
      }
    }
  };

  const handleEditAdmin = (admin) => {
    setAdminFormData({
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      phoneNumber: admin.phoneNumber,
      password: "", // Keep blank or use some placeholder
      role: admin.role,
    });
    setEditId(admin._id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleUpdateAdminFunc = async () => {
    setIsLoading(true);
    const { firstName, lastName, email, phoneNumber, password, role } =
      adminFormData;

    if (!firstName || !lastName || !email || !phoneNumber || !role) {
      return toast.error("All fields are required.");
    }

    try {
      const response = await updateAdminServ(editId, adminFormData);

      if (response?.data?.statusCode === 200) {
        toast.success(response?.data?.message || "Admin updated successfully");
        setShowModal(false);
        setIsEditing(false);
        setAdminFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          password: "",
          role: "admin",
        });
        handleGetAdminFunc(); // Refresh the list
      } else {
        toast.error("Failed to update pricing plan.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Internal Server Error");
    } finally {
      setIsLoading(false);
    }
  };

  if (isloading) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="bodyContainer">
      <Sidebar selectedMenu="Admin" selectedItem="Admin List" />
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
            {staticsArr?.map((v, i) => (
              <div className="col-md-4 col-12" key={i}>
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
            ))}
          </div>

          <div className="row m-0 p-0 d-flex align-items-center my-4 topActionForm">
            <div className="col-lg-2 mb-2 col-md-12 col-12">
              <h3 className="mb-0 text-bold text-secondary">Admins</h3>
            </div>
            <div className="col-lg-4 mb-2 col-md-12 col-12">
              <input
                onChange={(e) =>
                  setPayload((prev) => ({
                    ...prev,
                    searchKey: e.target.value,
                    pageNo: 1, // Reset page on search
                  }))
                }
                value={payload.searchKey}
                className="form-control w-100"
                placeholder="Search"
                style={{ borderRadius: "20px" }}
              />
            </div>
            <div className="col-lg-3 mb-2 col-md-6 col-12">
              <select
                className="form-control w-100 mb-3 mb-md-0"
                style={{ borderRadius: "20px" }}
                onChange={(e) =>
                  setPayload((prev) => ({
                    ...prev,
                    role: e.target.value,
                    pageNo: 1,
                  }))
                }
              >
                <option value="">All</option>
                <option value="admin">Admin</option>
                <option value="superadmin">Super Admin</option>
                <option value="supervisor">Supervisor</option>
              </select>
            </div>
            <div className="col-lg-3 mb-2 col-md-6 col-12">
              <button
                className="btn btn-primary w-100 borderRadius24"
                onClick={() => setShowModal(true)}
                style={{ height: "40px", borderRadius: "20px" }}
              >
                Add Admin
              </button>
            </div>
          </div>

          <div className="mt-3">
            <div className="card-body px-2">
              <div className="table-responsive table-invoice">
                <table className="table">
                  <thead>
                    <tr style={{ background: "#F3F3F3", color: "#000" }}>
                      <th className="text-center py-3">Sr. No</th>
                      <th className="text-center py-3">Name</th>
                      <th className="text-center py-3">Email</th>
                      <th className="text-center py-3">Role</th>
                      <th className="text-center py-3">Phn no.</th>
                      <th className="text-center py-3">Created At</th>
                      <th className="text-center py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {showSkelton
                      ? [...Array(5)].map((_, i) => (
                          <tr key={i}>
                            <td className="text-center">
                              <Skeleton width={30} height={20} />
                            </td>
                            <td className="text-center">
                              <Skeleton width={80} height={25} />
                            </td>
                            <td className="text-center">
                              <Skeleton width={120} height={25} />
                            </td>
                            <td className="text-center">
                              <Skeleton width={70} height={25} />
                            </td>
                            <td className="text-center">
                              <Skeleton width={90} height={25} />
                            </td>
                            <td className="text-center">
                              <Skeleton width={100} height={35} />
                            </td>
                          </tr>
                        ))
                      : list?.map((v, i) => (
                          <tr key={v?._id}>
                            <td className="text-center">{i + 1}</td>
                            <td className="text-center">
                              {v?.firstName + " " + v?.lastName}
                            </td>
                            <td className="text-center">{v?.email}</td>
                            <td className="text-center">{v?.role}</td>
                            <td className="text-center">{v?.phoneNumber}</td>
                            <td className="text-center">
                              {moment(v?.createdAt).format("DD-MM-YY")}
                            </td>
                            <td className="text-center">
                              <a
                                onClick={() => handleEditAdmin(v)}
                                className="btn btn-info mx-2 text-light shadow-sm"
                              >
                                Edit
                              </a>
                              <a
                                onClick={() => handleDeleteAdminFunc(v?._id)}
                                className="btn btn-warning mx-2 text-light shadow-sm"
                              >
                                Delete
                              </a>
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

      {/* Admin Modal */}
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
                {isEditing ? "Update Admin" : "Add New Admin"}
              </h5>
              <button
                type="button"
                className="close"
                onClick={() => setShowModal(false)}
              >
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {[
                "firstName",
                "lastName",
                "email",
                "phoneNumber",
                "password",
                "role",
              ].map((field) => (
                <div className="mb-2" key={field}>
                  <label className="form-label">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  {field === "role" ? (
                    <select
                      className="form-control"
                      value={adminFormData[field]}
                      onChange={(e) =>
                        setAdminFormData({
                          ...adminFormData,
                          [field]: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Role</option>
                      <option value="admin">Admin</option>
                      <option value="superadmin">Superadmin</option>
                      <option value="supervisor">Supervisor</option>
                    </select>
                  ) : (
                    <input
                      type={field === "password" ? "password" : "text"}
                      className="form-control"
                      value={adminFormData[field]}
                      onChange={(e) =>
                        setAdminFormData({
                          ...adminFormData,
                          [field]: e.target.value,
                        })
                      }
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={isEditing ? handleUpdateAdminFunc : handleAddAdminFunc}
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

export default AdminList;
