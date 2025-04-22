import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar";
import TopNav from "../../Components/TopNav";
import { useNavigate, useParams } from "react-router-dom";
import {
  getVendorDetailsServ,
  updateVendorProfile,
} from "../../services/vender.services";
import { toast } from "react-toastify";

const VendorApproval = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const [formData, setFormData] = useState({
    isProfilePicApproved: "",
    profilePicRejectReason: "",
    isFirstNameApproved: "",
    firstNameRejectReason: "",
    isLastNameApproved: "",
    lastNameRejectReason: "",
    isEmailApproved: "",
    emailRejectReason: "",
    phoneRejectReason:"",
    phoneRejectReason: "",

    isStoreNameApproved:"",
    isAdharCardApproved: "",
    isPanCardApproved: "",
    isPhoneApproved: "",
    isAddressApproved: "",
    isPincodeApproved: "",
    profileStatus: "",
    adharCardRejectReason: "",
    panCardRejectReason: "",
    addressRejectReason: "",
    pincodeRejectReason: "",
  });

  const getVendorDetailsFunc = async () => {
    try {
      const response = await getVendorDetailsServ(params.id);
      if (response?.data?.statusCode == "200") {
        const data = response.data.data;
        setDetails(data);
        setFormData({
          isProfilePicApproved: data.isProfilePicApproved,
          isAdharCardApproved: data.isAdharCardApproved,
          isPanCardApproved: data.isPanCardApproved,
          isFirstNameApproved: data.isFirstNameApproved,
          isLastNameApproved: data.isLastNameApproved,
          isEmailApproved: data.isEmailApproved,
          isPhoneApproved: data.isPhoneApproved,
          isAddressApproved: data.isAddressApproved,
          isPincodeApproved: data.isPincodeApproved,
          profileStatus: data.profileStatus,
          profilePicRejectReason: data.profilePicRejectReason,
          adharCardRejectReason: data.adharCardRejectReason,
          panCardRejectReason: data.panCardRejectReason,
          firstNameRejectReason: data.firstNameRejectReason,
          lastNameRejectReason: data.lastNameRejectReason,
          emailRejectReason: data.emailRejectReason,
          phoneRejectReason: data.phoneRejectReason,
          addressRejectReason: data.addressRejectReason,
          pincodeRejectReason: data.pincodeRejectReason,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getVendorDetailsFunc();
  }, [params?.id]);

  useEffect(() => {
    if (formData.profileStatus === "approved") {
      setFormData((prev) => ({
        ...prev,
        isProfilePicApproved: true,
        isAadharCardApproved: true,
        isPanCardApproved: true,
        isFirstNameApproved: true,
        isLastNameApproved: true,
        isEmailApproved: true,
        isPhoneApproved: true,
        isAddressApproved: true,
        isPincodeApproved: true,
        profilePicRejectReason: "",
        aadharCardRejectReason: "",
        panCardRejectReason: "",
        firstNameRejectReason: "",
        lastNameRejectReason: "",
        emailRejectReason: "",
        phoneRejectReason: "",
        addressRejectReason: "",
        pincodeRejectReason: "",
      }));
    }
  }, [formData.profileStatus]);

  const handleSubmit = async () => {
    try {
      const res = await updateVendorProfile({ ...formData, id: params.id });
      if (res?.data?.statusCode === "200") {
        toast.success(res.data.message);
        navigate("/vendor-list");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="bodyContainer">
      <Sidebar selectedMenu="Vendors" selectedItem="Manage Vendors" />
      <div className="mainContainer">
        <TopNav />
        <div className="p-lg-4 p-md-3 p-2">
          <div
            className="mx-0 p-4 driverApprovalMain"
            style={{
              position: "relative",
              top: "-75px",
              marginBottom: "-75px",
              background: "white",
              borderRadius: "24px",
            }}
          >
            <h3 className="text-secondary mb-4">Vendor Approval</h3>
            <div className="d-flex align-items-center my-3">
              <i
                className="fa fa-circle text-secondary me-2"
                style={{ fontSize: "10px", position: "relative", top: "-3px" }}
              ></i>
              <h5> Personal Details</h5>
            </div>

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
                      alt="profile"
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
                    {!formData.isProfilePicApproved && (
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

              <div className="col-12 row">
                {/* First Name */}
                <div className="col-6">
                  <div className="shadow-sm p-3 mb-3">
                    <div className="d-flex mb-2">
                      <input
                        type="checkbox"
                        className="me-2"
                        checked={formData.isFirstNameApproved === true}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isFirstNameApproved: e.target.checked,
                          })
                        }
                      />
                      <label>First Name</label>
                    </div>
                    <input
                      className="form-control"
                      value={details?.firstName}
                      readOnly
                    />
                    {!formData.isFirstNameApproved && (
                      <input
                        className="form-control mt-2"
                        placeholder="First name reject reason"
                        value={formData.firstNameRejectReason}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstNameRejectReason: e.target.value,
                          })
                        }
                      />
                    )}
                  </div>
                </div>

                {/* Last Name */}
                <div className="col-6">
                  <div className="shadow-sm p-3 mb-3">
                    <div className="d-flex mb-2">
                      <input
                        type="checkbox"
                        className="me-2"
                        checked={formData.isLastNameApproved === true}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isLastNameApproved: e.target.checked,
                          })
                        }
                      />
                      <label>Last Name</label>
                    </div>
                    <input
                      className="form-control"
                      value={details?.lastName}
                      readOnly
                    />
                    {!formData.isLastNameApproved && (
                      <input
                        className="form-control mt-2"
                        placeholder="Last name reject reason"
                        value={formData.lastNameRejectReason}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            lastNameRejectReason: e.target.value,
                          })
                        }
                      />
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="col-6">
                  <div className="shadow-sm p-3 mb-3">
                    <div className="d-flex mb-2">
                      <input
                        type="checkbox"
                        className="me-2"
                        checked={formData.isEmailApproved === true}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isEmailApproved: e.target.checked,
                          })
                        }
                      />
                      <label>Email</label>
                    </div>
                    <input
                      className="form-control"
                      value={details?.email}
                      readOnly
                    />
                    {!formData.isEmailApproved && (
                      <input
                        className="form-control mt-2"
                        placeholder="Email reject reason"
                        value={formData.emailRejectReason}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            emailRejectReason: e.target.value,
                          })
                        }
                      />
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div className="col-6">
                  <div className="shadow-sm p-3 mb-3">
                    <div className="d-flex mb-2">
                      <input
                        type="checkbox"
                        className="me-2"
                        checked={formData.isPhoneApproved === true}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isPhoneApproved: e.target.checked,
                          })
                        }
                      />
                      <label>Phone</label>
                    </div>
                    <input
                      className="form-control"
                      value={details?.phone}
                      readOnly
                    />
                    {!formData.isPhoneApproved && (
                      <input
                        className="form-control mt-2"
                        placeholder="Phone reject reason"
                        value={formData.phoneRejectReason}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phoneRejectReason: e.target.value,
                          })
                        }
                      />
                    )}
                  </div>
                </div>
              </div>

              <hr />
            </div>

            <div className="d-flex align-items-center">
              <i
                className="fa fa-circle text-secondary me-2"
                style={{ fontSize: "10px", position: "relative", top: "-3px" }}
              ></i>
              <h5> Store Details</h5>
            </div>

            <div className="row">
              <div className="col-4">
                <div className="d-flex justify-content-center">
                  <div>
                    <img
                      src={details?.storeLogo}
                      style={{
                        height: "120px",
                        width: "120px",
                        borderRadius: "50%",
                      }}
                      alt="profile"
                    />
                    <div className="d-flex mb-2">
                      <input
                        type="checkbox"
                        className="me-2"
                        checked={formData.isStoreLogoApproved === true}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isStoreLogoApproved: e.target.checked,
                          })
                        }
                      />
                      <label>Store Logo</label>
                    </div>
                    {!formData.isStoreLogoApproved && (
                      <input
                        className="form-control mt-2"
                        placeholder="Profile Pic reject reason"
                        value={formData.storeLogoRejectReason}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            storeLogoRejectReason: e.target.value,
                          })
                        }
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="d-flex justify-content-center">
                  <div>
                    <img
                      src={details?.bussinessLicense}
                      style={{
                        height: "120px",
                        width: "120px",
                        borderRadius: "50%",
                      }}
                      alt="profile"
                    />
                    <div className="d-flex mb-2">
                      <input
                        type="checkbox"
                        className="me-2"
                        checked={formData.isBusinessLicenseApproved === true}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isBusinessLicenseApproved: e.target.checked,
                          })
                        }
                      />
                      <label>Business Licences</label>
                    </div>
                    {!formData.isBusinessLicenseApproved && (
                      <input
                        className="form-control mt-2"
                        placeholder="Profile Pic reject reason"
                        value={formData.businessLicenseRejectReason}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            businessLicenseRejectReason: e.target.value,
                          })
                        }
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="col-12 row">
                {/* First Name */}
                <div className="col-4">
                  <div className="shadow-sm p-3 mb-3">
                    <div className="d-flex mb-2">
                      <input
                        type="checkbox"
                        className="me-2"
                        checked={formData.isStoreNameApproved === true}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isStoreNameApproved: e.target.checked,
                          })
                        }
                      />
                      <label>Store Name</label>
                    </div>
                    <input
                      className="form-control"
                      value={details?.storeName}
                      readOnly
                    />
                    {!formData.isStoreNameApproved && (
                      <input
                        className="form-control mt-2"
                        placeholder="First name reject reason"
                        value={formData.storeNameRejectReason}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            storeNameRejectReason: e.target.value,
                          })
                        }
                      />
                    )}
                  </div>
                </div>

                {/* Last Name */}
                <div className="col-4">
                  <div className="shadow-sm p-3 mb-3">
                    <div className="d-flex mb-2">
                      <input
                        type="checkbox"
                        className="me-2"
                        checked={formData.isLastNameApproved === true}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isLastNameApproved: e.target.checked,
                          })
                        }
                      />
                      <label>Store Url</label>
                    </div>
                    <input
                      className="form-control"
                      value={details?.storeUrl}
                      readOnly
                    />
                    {!formData.isLastNameApproved && (
                      <input
                        className="form-control mt-2"
                        placeholder="Last name reject reason"
                        value={formData.lastNameRejectReason}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            lastNameRejectReason: e.target.value,
                          })
                        }
                      />
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="col-4">
                  <div className="shadow-sm p-3 mb-3">
                    <div className="d-flex mb-2">
                      <input
                        type="checkbox"
                        className="me-2"
                        checked={formData.isEmailApproved === true}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isEmailApproved: e.target.checked,
                          })
                        }
                      />
                      <label>GST Number</label>
                    </div>
                    <input
                      className="form-control"
                      value={details?.gstNumber}
                      readOnly
                    />
                    {!formData.isEmailApproved && (
                      <input
                        className="form-control mt-2"
                        placeholder="Email reject reason"
                        value={formData.emailRejectReason}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            emailRejectReason: e.target.value,
                          })
                        }
                      />
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div className="col-12">
                  <div className="shadow-sm p-3 mb-3">
                    <div className="d-flex mb-2">
                      <input
                        type="checkbox"
                        className="me-2"
                        checked={formData.isPhoneApproved === true}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isPhoneApproved: e.target.checked,
                          })
                        }
                      />
                      <label>Store Description</label>
                    </div>
                    <textarea
                      className="form-control"
                      value={details?.storeDescription}
                      readOnly
                    />
                    {!formData.isPhoneApproved && (
                      <input
                        className="form-control mt-2"
                        placeholder="Phone reject reason"
                        value={formData.phoneRejectReason}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phoneRejectReason: e.target.value,
                          })
                        }
                      />
                    )}
                  </div>
                </div>
                <div className="col-12 row bg-light ">
                  <div className="col-4">
                    <div className="shadow-sm p-3 mb-3">
                      <div className="d-flex mb-2">
                        <input
                          type="checkbox"
                          className="me-2"
                          checked={formData.isEmailApproved === true}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              isEmailApproved: e.target.checked,
                            })
                          }
                        />
                        <label>State</label>
                      </div>
                      <input
                        className="form-control"
                        value={details?.state}
                        readOnly
                      />
                      {!formData.isEmailApproved && (
                        <input
                          className="form-control mt-2"
                          placeholder="Email reject reason"
                          value={formData.emailRejectReason}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              emailRejectReason: e.target.value,
                            })
                          }
                        />
                      )}
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="shadow-sm p-3 mb-3">
                      <div className="d-flex mb-2">
                        <input
                          type="checkbox"
                          className="me-2"
                          checked={formData.isEmailApproved === true}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              isEmailApproved: e.target.checked,
                            })
                          }
                        />
                        <label>District</label>
                      </div>
                      <input
                        className="form-control"
                        value={details?.district}
                        readOnly
                      />
                      {!formData.isEmailApproved && (
                        <input
                          className="form-control mt-2"
                          placeholder="Email reject reason"
                          value={formData.emailRejectReason}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              emailRejectReason: e.target.value,
                            })
                          }
                        />
                      )}
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="shadow-sm p-3 mb-3">
                      <div className="d-flex mb-2">
                        <input
                          type="checkbox"
                          className="me-2"
                          checked={formData.isEmailApproved === true}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              isEmailApproved: e.target.checked,
                            })
                          }
                        />
                        <label>Pincode</label>
                      </div>
                      <input
                        className="form-control"
                        value={details?.pincode}
                        readOnly
                      />
                      {!formData.isEmailApproved && (
                        <input
                          className="form-control mt-2"
                          placeholder="Email reject reason"
                          value={formData.emailRejectReason}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              emailRejectReason: e.target.value,
                            })
                          }
                        />
                      )}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="shadow-sm p-3 mb-3">
                      <div className="d-flex mb-2">
                        <input
                          type="checkbox"
                          className="me-2"
                          checked={formData.isEmailApproved === true}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              isEmailApproved: e.target.checked,
                            })
                          }
                        />
                        <label>Address</label>
                      </div>
                      <textarea
                        className="form-control"
                        value={details?.address}
                        readOnly
                      />
                      {!formData.isEmailApproved && (
                        <input
                          className="form-control mt-2"
                          placeholder="Email reject reason"
                          value={formData.emailRejectReason}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              emailRejectReason: e.target.value,
                            })
                          }
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <hr />
            </div>
            <div className="d-flex align-items-center">
              <i
                className="fa fa-circle text-secondary me-2"
                style={{ fontSize: "10px", position: "relative", top: "-3px" }}
              ></i>
              <h5>Account Details</h5>
            </div>

            <div className="row">
              {/* Profile Pic */}
              <div className="col-4">
                <div className="d-flex justify-content-center">
                  <div>
                    <img
                      src={details?.signature}
                      style={{
                        height: "120px",
                        width: "120px",
                        borderRadius: "50%",
                      }}
                      alt="profile"
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
                      <label>Signature</label>
                    </div>
                    {!formData.isProfilePicApproved && (
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
              <div className="col-4">
                <div className="d-flex justify-content-center">
                  <div>
                    <img
                      src={details?.passBook}
                      style={{
                        height: "120px",
                        width: "120px",
                        borderRadius: "50%",
                      }}
                      alt="profile"
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
                      <label>Passbook</label>
                    </div>
                    {!formData.isProfilePicApproved && (
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
              <div className="col-4">
                <div className="d-flex justify-content-center">
                  <div>
                    <img
                      src={details?.adharCard}
                      style={{
                        height: "120px",
                        width: "120px",
                        borderRadius: "50%",
                      }}
                      alt="profile"
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
                      <label>Adhar Card</label>
                    </div>
                    {!formData.isProfilePicApproved && (
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

              <div className="col-12 row">
                {/* First Name */}
                <div className="col-6">
                  <div className="shadow-sm p-3 mb-3">
                    <div className="d-flex mb-2">
                      <input
                        type="checkbox"
                        className="me-2"
                        checked={formData.isFirstNameApproved === true}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isFirstNameApproved: e.target.checked,
                          })
                        }
                      />
                      <label>Account Number</label>
                    </div>
                    <input
                      className="form-control"
                      value={details?.accountNumber}
                      readOnly
                    />
                    {!formData.isFirstNameApproved && (
                      <input
                        className="form-control mt-2"
                        placeholder="First name reject reason"
                        value={formData.firstNameRejectReason}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstNameRejectReason: e.target.value,
                          })
                        }
                      />
                    )}
                  </div>
                </div>

                {/* Last Name */}
                <div className="col-6">
                  <div className="shadow-sm p-3 mb-3">
                    <div className="d-flex mb-2">
                      <input
                        type="checkbox"
                        className="me-2"
                        checked={formData.isLastNameApproved === true}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isLastNameApproved: e.target.checked,
                          })
                        }
                      />
                      <label>IFCS Code</label>
                    </div>
                    <input
                      className="form-control"
                      value={details?.ifscCode}
                      readOnly
                    />
                    {!formData.isLastNameApproved && (
                      <input
                        className="form-control mt-2"
                        placeholder="Last name reject reason"
                        value={formData.lastNameRejectReason}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            lastNameRejectReason: e.target.value,
                          })
                        }
                      />
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="col-6">
                  <div className="shadow-sm p-3 mb-3">
                    <div className="d-flex mb-2">
                      <input
                        type="checkbox"
                        className="me-2"
                        checked={formData.isEmailApproved === true}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isEmailApproved: e.target.checked,
                          })
                        }
                      />
                      <label>Account Holder Name</label>
                    </div>
                    <input
                      className="form-control"
                      value={details?.accountHolderName}
                      readOnly
                    />
                    {!formData.isEmailApproved && (
                      <input
                        className="form-control mt-2"
                        placeholder="Email reject reason"
                        value={formData.emailRejectReason}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            emailRejectReason: e.target.value,
                          })
                        }
                      />
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div className="col-6">
                  <div className="shadow-sm p-3 mb-3">
                    <div className="d-flex mb-2">
                      <input
                        type="checkbox"
                        className="me-2"
                        checked={formData.isPhoneApproved === true}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isPhoneApproved: e.target.checked,
                          })
                        }
                      />
                      <label>Bank Name</label>
                    </div>
                    <input
                      className="form-control"
                      value={details?.bankName}
                      readOnly
                    />
                    {!formData.isPhoneApproved && (
                      <input
                        className="form-control mt-2"
                        placeholder="Phone reject reason"
                        value={formData.phoneRejectReason}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phoneRejectReason: e.target.value,
                          })
                        }
                      />
                    )}
                  </div>
                </div>
                <div className="col-6">
                  <div className="shadow-sm p-3 mb-3">
                    <div className="d-flex mb-2">
                      <input
                        type="checkbox"
                        className="me-2"
                        checked={formData.isPhoneApproved === true}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isPhoneApproved: e.target.checked,
                          })
                        }
                      />
                      <label>Bank Branch Code</label>
                    </div>
                    <input
                      className="form-control"
                      value={details?.bankBranchCode}
                      readOnly
                    />
                    {!formData.isPhoneApproved && (
                      <input
                        className="form-control mt-2"
                        placeholder="Phone reject reason"
                        value={formData.phoneRejectReason}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phoneRejectReason: e.target.value,
                          })
                        }
                      />
                    )}
                  </div>
                </div>
                <div className="col-6">
                  <div className="shadow-sm p-3 mb-3">
                    <div className="d-flex mb-2">
                      <input
                        type="checkbox"
                        className="me-2"
                        checked={formData.isPhoneApproved === true}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isPhoneApproved: e.target.checked,
                          })
                        }
                      />
                      <label>UPI Id</label>
                    </div>
                    <input
                      className="form-control"
                      value={details?.upiId}
                      readOnly
                    />
                    {!formData.isPhoneApproved && (
                      <input
                        className="form-control mt-2"
                        placeholder="Phone reject reason"
                        value={formData.phoneRejectReason}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phoneRejectReason: e.target.value,
                          })
                        }
                      />
                    )}
                  </div>
                </div>
                <div className="col-6">
                  <div className="shadow-sm p-3 mb-3">
                    <div className="d-flex mb-2">
                      <input
                        type="checkbox"
                        className="me-2"
                        checked={formData.isPhoneApproved === true}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isPhoneApproved: e.target.checked,
                          })
                        }
                      />
                      <label>Pan Number</label>
                    </div>
                    <input
                      className="form-control"
                      value={details?.panNumber}
                      readOnly
                    />
                    {!formData.isPhoneApproved && (
                      <input
                        className="form-control mt-2"
                        placeholder="Phone reject reason"
                        value={formData.phoneRejectReason}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phoneRejectReason: e.target.value,
                          })
                        }
                      />
                    )}
                  </div>
                </div>
              </div>

              <hr />

              <button className="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorApproval;
