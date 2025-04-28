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
  createBookingServ,
  deleteBookingServ,
  getBookingListServ,
  getUserListServ,
  updateBookingServ,
} from "../../services/booking.services";

function BookingList() {
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
  const [bookingFormData, setBookingFormData] = useState({
    location: "",
    userId: "",
    addressLine1: "",
    landmark: "",
    modeOfPayment: "",
    pincode: "",
  });
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleGetBookingFunc();
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [payload.searchKey]);

  const [showSkelton, setShowSkelton] = useState(false);
  const handleGetBookingFunc = async () => {
    if (list.length == 0) {
      setShowSkelton(true);
    }
    try {
      const response = await getBookingListServ(payload);
      setList(response?.data?.data || []);
      setStatics(response?.data?.documentCount);
    } catch (error) {
      toast.error("Failed to fetch Booking.");
    } finally {
      setIsLoading(false);
    }
    setShowSkelton(false);
  };

  const staticsArr = [
    {
      title: "Total Booking",
      count: statics?.totalCount,
      bgColor: "#6777EF",
    },
  ];
  useEffect(() => {
    handleGetBookingFunc();
  }, [payload.sortByField, payload.sortOrder]);

  const handleAddBookingFunc = async () => {
    setIsLoading(true);
    const { location, addressLine1, landmark, modeOfPayment, pincode, userId } = bookingFormData;

    if (!location || !addressLine1 || !landmark || !modeOfPayment || !pincode || !userId) {
      return toast.error("All fields are required.");
    }

    try {
      const response = await createBookingServ(bookingFormData);

      if (response?.data?.statusCode === 200) {
        toast.success(response?.data?.message || "Booking added successfully");
        setShowModal(false);
        setBookingFormData({
            location: "",
            addressLine1: "",
            landmark: "",
            modeOfPayment: "",
            pincode: "",
            userId: "",
        });
        handleGetBookingFunc();
      } else {
        toast.error("Failed to add Booking .");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Internal Server Error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBookingFunc = async (id) => {
    if (window.confirm("Are you sure you want to delete this Booking?")) {
      try {
        const response = await deleteBookingServ(id);
        if (response?.data?.statusCode === 200) {
          toast.success(
            response?.data?.message || "Booking deleted successfully"
          );
          handleGetBookingFunc();
        }
      } catch (error) {
        toast.error("Failed to delete Booking.");
      }
    }
  };

  const handleEditBooking = (booking) => {
    setBookingFormData({
      location: booking.location,
      addressLine1: booking.addressLine1,
      landmark: booking.landmark,
      modeOfPayment: booking.modeOfPayment,
      pincode: booking.pincode,
      userId: booking.userId?._id || "",
    });
    setEditId(booking._id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleUpdateBookingFunc = async () => {
    setIsLoading(true);
    const { location, userId, addressLine1, modeOfPayment, landmark, pincode } =
      bookingFormData;

    if (
      !location ||
      !userId ||
      !addressLine1 ||
      !modeOfPayment ||
      !landmark ||
      !pincode
    ) {
      return toast.error("All fields are required.");
    }

    try {
      const response = await updateBookingServ(editId, bookingFormData);

      if (response?.data?.statusCode === 200) {
        toast.success(
          response?.data?.message || "Booking updated successfully"
        );
        setShowModal(false);
        setIsEditing(false);
        setBookingFormData({
          location: "",
          userId: "",
          addressLine1: "",
          landmark: "",
          modeOfPayment: "",
          pincode: "",
        });
        handleGetBookingFunc(); // Refresh the list
      } else {
        toast.error("Failed to update Booking.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Internal Server Error");
    } finally {
      setIsLoading(false);
    }
  };

  const [user, setUser] = useState([]);

  const handleGetUserFunc = async () => {
    if (list.length == 0) {
      setShowSkelton(true);
    }
    try {
      const response = await getUserListServ();
      setUser(response.data?.data || []);
    } catch (error) {
      toast.error("Failed to fetch User.");
      setShowSkelton(false);
    }
  };

  useEffect(() => {
    handleGetUserFunc();
  }, []);

  if (isloading) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="bodyContainer">
      <Sidebar selectedMenu="Booking" selectedItem="Booking List" />
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
              <h3 className="mb-0 text-bold text-secondary">Booking List</h3>
            </div>
            <div className="col-lg-4 mb-2 col-md-12 col-12">
              <input
                className="form-control borderRadius24"
                placeholder="Search"
                onChange={(e) =>
                  setPayload({ ...payload, searchKey: e.target.value })
                }
              />
            </div>
            {/* <div className="col-lg-3 mb-2 col-md-6 col-12">
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
                <option value="">Email Verified</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div> */}
            <div className="col-lg-3 mb-2 col-md-6 col-12">
              <button
                className="btn btn-primary w-100 borderRadius24"
                onClick={() => setShowModal(true)}
                style={{ height: "40px", borderRadius: "20px" }}
              >
                Add Booking
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
                      <th className="text-center py-3">Location</th>
                      <th className="text-center py-3">User Name</th>
                      <th className="text-center py-3">Address</th>
                      <th className="text-center py-3">Payement Mod</th>
                      <th className="text-center py-3">Landmark</th>
                      <th className="text-center py-3">Pin Code</th>
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
                            <td className="text-center">{v?.location}</td>
                            <td className="text-center">{v?.userId?.firstName + " " + v?.userId?.lastName}</td>
                            <td className="text-center">{v?.addressLine1}</td>
                            <td className="text-center">{v?.modeOfPayment}</td>
                            <td className="text-center">{v?.landmark}</td>
                            <td className="text-center">{v?.pincode}</td>
                            {/* <td className="text-center">
                              {v?.emailIsVerified ? (
                                <span className="badge bg-success">Yes</span>
                              ) : (
                                <span className="badge bg-danger">No</span>
                              )}
                            </td> */}
                            {/* <td className="text-center">
                              {moment(v?.createdAt).format("DD-MM-YY")}
                            </td> */}
                            <td className="text-center">
                              <a
                                onClick={() => handleEditBooking(v)}
                                className="btn btn-info mx-2 text-light shadow-sm"
                              >
                                Edit
                              </a>
                              <a
                                onClick={() => handleDeleteBookingFunc(v?._id)}
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

      {/* Booking Modal */}
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
                "location",
                "addressLine1",
                "landmark",
                "modeOfPayment",
                "pincode",
                "userId",
              ].map((field) => (
                <div className="mb-3" key={field}>
                  <label className="form-label text-capitalize">
                    {field === "addressLine1"
                      ? "address"
                      : field === "userId"
                      ? "User"
                      : field === "modeOfPayment"
                      ? "Payment mod"
                      : field}
                  </label>

                  {field === "" ? (
                    <>
                      
                    </>
                  ) : field === "userId" ? (
                    <select
                      className="form-select"
                      value={bookingFormData[field] || ""}
                      onChange={(e) =>
                        setBookingFormData({
                          ...bookingFormData,
                          [field]: e.target.value,
                        })
                      }
                    >
                      <option value="">Select User</option>
                      {user.map((user) => (
                        <option key={user._id} value={user._id}>
                          {user.firstName + " " + user.lastName}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      value={bookingFormData[field]}
                      onChange={(e) =>
                        setBookingFormData({
                          ...bookingFormData,
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
                onClick={isEditing ? handleUpdateBookingFunc : handleAddBookingFunc}
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

export default BookingList;
