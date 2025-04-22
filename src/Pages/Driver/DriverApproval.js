import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar";
import TopNav from "../../Components/TopNav";
import { useNavigate, useParams } from "react-router-dom";
import { getDriverDetailsServ, updateDriverProfile } from "../../services/driver.service";
import { toast } from "react-toastify";

function DriverApproval() {
  const [details, setDetails] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    isProfilePicApproved: "",
    isDlFrontImageApproved: "",
    isDlBackImageApproved: "",
    isFirstNameApproved: "",
    isLastNameApproved: "",
    isEmailApproved: "",
    isPhoneApproved: "",
    isAddressApproved: "",
    isPincodeApproved: "",
    profileStatus: "",
    profilePicRejectReason: "",
    dlFrontImageRejectReason: "",
    dlBacktImageRejectReason: "",
    firstNameRejectReason: "",
    lastNameRejectReason: "",
    emailRejectReason: "",
    phoneRejectReason: "",
    addressRejectReason: "",
    pincodeRejectReason: "",
  });

  const getDriverDetailsFunc = async () => {
    try {
      let response = await getDriverDetailsServ(params?.id);
      if (response?.data?.statusCode == "200") {
        setDetails(response?.data?.data);
        setFormData({
          isProfilePicApproved: response?.data?.data?.isProfilePicApproved,
          isDlFrontImageApproved: response?.data?.data?.isDlFrontImageApproved,
          isDlBackImageApproved: response?.data?.data?.isDlBackImageApproved,
          isFirstNameApproved: response?.data?.data?.isFirstNameApproved,
          isLastNameApproved: response?.data?.data?.isLastNameApproved,
          isEmailApproved: response?.data?.data?.isEmailApproved,
          isPhoneApproved: response?.data?.data?.isPhoneApproved,
          isAddressApproved: response?.data?.data?.isAddressApproved,
          isPincodeApproved: response?.data?.data?.isPincodeApproved,
          profileStatus: response?.data?.data?.profileStatus,
          profilePicRejectReason: response?.data?.data?.profilePicRejectReason,
          dlFrontImageRejectReason:
            response?.data?.data?.dlFrontImageRejectReason,
          dlBacktImageRejectReason:
            response?.data?.data?.dlBacktImageRejectReason,
          firstNameRejectReason: response?.data?.data?.firstNameRejectReason,
          lastNameRejectReason: response?.data?.data?.lastNameRejectReason,
          emailRejectReason: response?.data?.data?.emailRejectReason,
          phoneRejectReason: response?.data?.data?.phoneRejectReason,
          addressRejectReason: response?.data?.data?.addressRejectReason,
          pincodeRejectReason: response?.data?.data?.pincodeRejectReason,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDriverDetailsFunc();
  }, [params?.id]);

  const handleProfileUpdate = async() => {
    try {
      let response = await updateDriverProfile({...formData, id:params?.id});
      console.log(response?.data?.statusCode)
      if(response?.data?.statusCode == "200"){
        toast.success(response?.data?.message)
        navigate("/driver-list")
      }
    } catch (error) {
      toast.error("Internal Server Error")
    }
    
  };
  const updateFormData = ()=>{
    if (formData?.profileStatus == "approved") {
      setFormData({
        isProfilePicApproved: true,
        isDlFrontImageApproved: true,
        isDlBackImageApproved: true,
        isFirstNameApproved: true,
        isLastNameApproved: true,
        isEmailApproved: true,
        isPhoneApproved: true,
        isAddressApproved: true,
        isPincodeApproved: true,
        profilePicRejectReason: "",
        dlFrontImageRejectReason: "",
        dlBacktImageRejectReason: "",
        firstNameRejectReason: "",
        lastNameRejectReason: "",
        emailRejectReason: "",
        phoneRejectReason: "",
        addressRejectReason: "",
        pincodeRejectReason: "",
        profileStatus: "approved",
      });
    }
  }
  useEffect(()=>{
    updateFormData()
  }, [formData?.profileStatus])
  return (
    <div className="bodyContainer">
      <Sidebar
        selectedMenu="Delivery Boys"
        selectedItem="Manage Delivery Boys"
      />
      <div className="mainContainer">
        <TopNav />
        <div className="p-lg-4 p-md-3 p-2">
          <div
            className=" mx-0 p-4 driverApprovalMain"
            style={{
              position: "relative",
              top: "-75px",
              marginBottom: "-75px",
              background: "white",
              borderRadius: "24px",
            }}
          >
            <h3 className="text-secondary mb-4">Driver Approval</h3>
            <div className="row">
              {/* Profile Pic */}
              <div className="col-4">
                <div className="d-flex justify-content-center">
                  <div>
                    <img
                      src={details?.profilePic}
                      style={{
                        height: "120px",
                        width: "120px",
                        borderRadius: "50%",
                      }}
                    />
                    <div className="d-flex mb-2">
                      <input
                        type="checkbox"
                        className="me-2"
                        checked={formData.isProfilePicApproved === true}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isProfilePicApproved: e.target.checked,
                          })
                        }
                      />
                      <label>Profile Pic</label>
                    </div>
                    {!formData?.isProfilePicApproved && (
                      <input
                        className="form-control mt-2"
                        placeholder="Profile Pic reject reason"
                        value={formData.profilePicRejectReason}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            profilePicRejectReason: e.target.value,
                          })
                        }
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* DL Front Image */}
              <div className="col-4">
                <div className="d-flex justify-content-center">
                  <div>
                    <img
                      src={details?.dlFrontImage}
                      style={{
                        height: "120px",
                        width: "120px",
                        borderRadius: "50%",
                      }}
                    />
                    <div className="d-flex mb-2">
                      <input
                        type="checkbox"
                        className="me-2"
                        checked={formData.isDlFrontImageApproved === true}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isDlFrontImageApproved: e.target.checked,
                          })
                        }
                      />
                      <label>DL Front Image</label>
                    </div>
                    {!formData?.isDlFrontImageApproved && (
                      <input
                        className="form-control mt-2"
                        placeholder="DL Front reject reason"
                        value={formData.dlFrontImageRejectReason}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            dlFrontImageRejectReason: e.target.value,
                          })
                        }
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* DL Back Image */}
              <div className="col-4">
                <div className="d-flex justify-content-center">
                  <div>
                    <img
                      src={details?.dlBackImage}
                      style={{
                        height: "120px",
                        width: "120px",
                        borderRadius: "50%",
                      }}
                    />
                    <div className="d-flex mb-2">
                      <input
                        type="checkbox"
                        className="me-2"
                        checked={formData.isDlBackImageApproved === true}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isDlBackImageApproved: e.target.checked,
                          })
                        }
                      />
                      <label>DL Back Image</label>
                    </div>
                    {!formData?.isDlBackImageApproved && (
                      <input
                        className="form-control mt-2"
                        placeholder="DL Back reject reason"
                        value={formData.dlBacktImageRejectReason}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            dlBacktImageRejectReason: e.target.value,
                          })
                        }
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Repeating sections (First Name, Last Name, etc.) */}
              {[
                {
                  key: "FirstName",
                  label: "First Name",
                  value: details?.firstName,
                },
                {
                  key: "LastName",
                  label: "Last Name",
                  value: details?.lastName,
                },
                { key: "Email", label: "Email", value: details?.email },
                { key: "Phone", label: "Phone", value: details?.phone },
                { key: "Address", label: "Address", value: details?.address },
                { key: "Pincode", label: "Pincode", value: details?.pincode },
              ].map((field, index) => (
                <div className="col-6" key={index}>
                  <div className="shadow-sm p-3 mb-3">
                    <div className="d-flex mb-2">
                      <input
                        type="checkbox"
                        className="me-2"
                        checked={formData[`is${field.key}Approved`] === true}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [`is${field.key}Approved`]: e.target.checked,
                          })
                        }
                      />
                      <label>{field.label}</label>
                    </div>
                    <input
                      className="form-control"
                      value={field.value}
                      readOnly
                    />
                    {!formData[`is${field.key}Approved`] && (
                      <input
                        className="form-control mt-2"
                        placeholder={`${field.label} reject reason`}
                        value={
                          formData[`${field.key.toLowerCase()}RejectReason`]
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [`${field.key.toLowerCase()}RejectReason`]:
                              e.target.value,
                          })
                        }
                      />
                    )}
                  </div>
                </div>
              ))}

              {/* Profile Status Dropdown */}
              <div className="col-12">
                <div className="shadow-sm p-3 mb-3">
                  <div className="d-flex mb-2">
                    <label>Profile Status</label>
                  </div>
                  <select
                    className="form-control"
                    value={formData.profileStatus}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        profileStatus: e.target.value,
                      })
                      
                    }
                  >
                    <option value="">Select</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div className="d-flex justify-content-center mx-3 my-2">
                <button
                  className="btn-success"
                  style={{
                    borderRadius: "20px",
                    width: "100%",
                    opacity: "0.6",
                  }}
                  onClick={() => handleProfileUpdate()}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverApproval;
