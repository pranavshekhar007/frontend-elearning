import React, { useState } from "react";
import { useGlobalState } from "../GlobalProvider";
import { useNavigate } from "react-router-dom";
function Sidebar({ selectedMenu, selectedItem }) {
  const navigate = useNavigate();
  const { globalState, setGlobalState } = useGlobalState();
  const navItem = [
    {
      menuIcon: "https://cdn-icons-png.flaticon.com/128/1828/1828791.png",
      menu: "Dashboard",
      subMenu: [
        {
          name: "Dashboard",
          path: "/",
        },
      ],
    },
    {
      menuIcon: "https://cdn-icons-png.flaticon.com/128/12724/12724695.png",
      menu: "User",
      subMenu: [
        {
          name: "User List",
          path: "/User-list",
        },
      ],
    },
    // {
    //   menuIcon: "https://cdn-icons-png.flaticon.com/128/2435/2435245.png",
    //   menu: "Orders",
    //   subMenu: [
    //     {
    //       name: "Orders",
    //       path: "/order-list",
    //     },
    //   ],
    // },
    {
      menuIcon: "https://cdn-icons-png.flaticon.com/128/8287/8287848.png",
      menu: "Categories",
      subMenu: [
        {
          name: "Main Categories",
          path: "/category-list",
        },
        {
          name: "Sub Categories",
          path: "/sub-category-list",
        },
      ],
    },
    // {
    //   menuIcon: "https://cdn-icons-png.flaticon.com/128/2875/2875916.png",
    //   menu: "Product Management",
    //   subMenu: [
    //     {
    //       name: "Products",
    //       path: "/product-list",
    //     },
    //     {
    //       name: "Add Product",
    //       path: "/add-product",
    //     },
    //     {
    //       name: "Product Types",
    //       path: "/product-type-list",
    //     },
    //     {
    //       name: "Attribute Sets",
    //       path: "/attribute-set-list",
    //     },
    //     {
    //       name: "Attributes",
    //       path: "/attribute-list",
    //     },
    //     {
    //       name: "Taxes",
    //       path: "/tax-list",
    //     },
    //     {
    //       name: "Tags",
    //       path: "/tag-list",
    //     },
    //     {
    //       name: "Product Review",
    //       path: "/product-review-list",
    //     },
    //   ],
    // },
    // {
    //   menuIcon: "https://cdn-icons-png.flaticon.com/128/5632/5632749.png",
    //   menu: "Brands",
    //   subMenu: [
    //     {
    //       name: "Brands",
    //       path: "/brand-list",
    //     },
    //   ],
    // },
    // {
    //   menuIcon: "https://cdn-icons-png.flaticon.com/128/9915/9915691.png",
    //   menu: "Vendors",
    //   subMenu: [
    //     {
    //       name: "Manage Vendors",
    //       path: "/vendor-list",
    //     },
    //   ],
    // },
    // {
    //   menuIcon: "https://cdn-icons-png.flaticon.com/128/535/535188.png",
    //   menu: "Location Management",
    //   subMenu: [
    //     {
    //       name: "Pickup Location",
    //       path: "/pickup-location-list",
    //     },
    //     {
    //       name: "Product Manufacture Location",
    //       path: "/product-manufacture-location-list",
    //     },
    //     {
    //       name: "Zipcodes",
    //       path: "/zipcode-list",
    //     },
    //   ],
    // },
    // {
    //   menuIcon: "https://cdn-icons-png.flaticon.com/128/1601/1601521.png",
    //   menu: "Banners",
    //   subMenu: [
    //     {
    //       name: "Banners",
    //       path: "/banner-list",
    //     },
    //   ],
    // },
    // {
    //   menuIcon: "https://cdn-icons-png.flaticon.com/128/3988/3988365.png",
    //   menu: "Delivery Boys",
    //   subMenu: [
    //     {
    //       name: "Manage Delivery Boys",
    //       path: "/driver-list",
    //     },
    //   ],
    // },
    {
      menuIcon: "https://cdn-icons-png.flaticon.com/128/12724/12724695.png",
      menu: "Admin",
      subMenu: [
        {
          name: "Admin List",
          path: "/admin-list",
        },
      ],
    },
    {
      menuIcon: "https://cdn-icons-png.flaticon.com/128/9720/9720911.png",
      menu: "Course",
      subMenu: [
        {
          name: "Course List",
          path: "/course-list",
        },
        {
          name: "AcademyCourse List",
          path: "/academyCourse-list",
        },
      ],
    },
    {
      menuIcon: "https://cdn-icons-png.flaticon.com/128/17/17640.png",
      menu: "Batch",
      subMenu: [
        {
          name: "Batch List",
          path: "/batch-list",
        },
        {
          name: "AcademyBatch List",
          path: "/academybatch-list",
        },
      ],
    },
    {
      menuIcon: "https://cdn-icons-png.flaticon.com/128/5110/5110947.png",
      menu: "Booking",
      subMenu: [
        {
          name: "Booking List",
          path: "/booking-list",
        },
      ],
    },
    // {
    //   menuIcon: "https://cdn-icons-png.flaticon.com/128/17/17640.png",
    //   menu: "AcademyBatch",
    //   subMenu: [
    //     {
    //       name: "AcademyBatch List",
    //       path: "/academybatch-list",
    //     },
    //   ],
    // },
  ];
  const [showMenu, setShowMenu] = useState(selectedMenu);
  return (
    <div
      className={`sidebarMain ${
        globalState?.showFullSidebar ? "sidebarVisible" : "sidebarHidden"
      }`}
    >
      <div className="d-flex justify-content-end">
        <img
          className="d-block d-md-none mt-3 me-4"
          style={{ height: "20px" }}
          src="https://cdn-icons-png.flaticon.com/128/753/753345.png"
          onClick={() =>
            setGlobalState({ ...globalState, showFullSidebar: false })
          }
          alt=""
        />
      </div>
      <div className="p-3">
        <div className="brandLogo d-flex justify-content-center align-items-center">
          <img
            className="img-fluid"
            src="https://cdn-icons-png.flaticon.com/128/7385/7385218.png"
            alt=""
          />
          <p className="mb-0 ms-3">SONEHAAT</p>
        </div>
        <hr />
        <div className="mt-3 ">
          {navItem?.map((v, i) => {
            return (
              <div className="mb-4" onClick={() => setShowMenu(v?.menu)}>
                <div
                  className="d-flex justify-content-between align-items-center mb-3 px-2 "
                  style={{ opacity: "0.7", cursor: "pointer" }}
                >
                  <div className="menuItem d-flex align-items-center">
                    <img src={v?.menuIcon} alt=""/>
                    <p className="mb-0 ms-3">{v?.menu}</p>
                  </div>
                  <img
                    className="dropIcon"
                    src="https://cdn-icons-png.flaticon.com/128/6364/6364586.png"
                    alt=""
                  />
                </div>
                {showMenu === v?.menu && (
                  <div className=" ms-4 ">
                    {v?.subMenu?.map((v, i) => {
                      return (
                        <p
                          style={{ cursor: "pointer" }}
                          onClick={() => navigate(v?.path)}
                          className={
                            "mb-0 p-2 subMenu " +
                            (v?.name === selectedItem
                              ? " rounded  textPrimary "
                              : " ")
                          }
                        >
                        <i className="fa fa-circle"/>  {v?.name}
                        </p>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
