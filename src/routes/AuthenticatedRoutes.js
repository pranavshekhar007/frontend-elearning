import React from 'react';
import {Route, Routes} from "react-router-dom"
import Dashboard from '../Pages/Dashboard/Dashboard';
import CategoriesList from '../Pages/Category/CategoriesList';
import SubCategoriesList from '../Pages/Category/SubCategoryList';
import BrandsList from '../Pages/Brand/BrandsList';
import AttributeSetList from '../Pages/Attribute/AttributeSetList';
import AttributeList from '../Pages/Attribute/AttributeList';
import DriverList from '../Pages/Driver/DriverList';
import VendorList from '../Pages/Vendor/VendorList';
import BannerList from '../Pages/Banner/BannerList';
import DriverApproval from '../Pages/Driver/DriverApproval';
import TagList from '../Pages/Tag/TagList';
import ProductTypeList from '../Pages/Product/ProductTypeList';
import TaxList from '../Pages/Tax/TaxList';
import ProductManufactureLocactionList from '../Pages/Product/ProductManufactureLocationList';
import ProductList from '../Pages/Product/ProductList';
import AddProduct from '../Pages/Product/AddProduct';
import VendorApproval from '../Pages/Vendor/VendorApproval';
import AdminList from '../Pages/Admin/AdminList';
import CourseList from '../Pages/Course/CourseList';
import BatchList from '../Pages/Batch/BatchList';
import AcademyBatchList from '../Pages/Batch/AcademyBatch';
import AcademyCourseList from '../Pages/Course/AcademyCourseList';
import UserList from '../Pages/User/UserList';
import BookingList from '../Pages/Booking/BookingList';

function AuthenticatedRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Dashboard/>}/>

        {/* categories  */}
        <Route path="/category-list" element={<CategoriesList/>}/>
        <Route path="/sub-category-list" element={<SubCategoriesList/>}/>

        {/* attribute */}
        <Route path="/attribute-set-list" element={<AttributeSetList/>}/>
        <Route path="/attribute-list" element={<AttributeList/>}/>

        {/* brand */}
        <Route path="/brand-list" element={<BrandsList/>}/>

        {/* drivers */}
        <Route path="/driver-list" element={<DriverList/>}/>
        <Route path="/driver-approval/:id" element={<DriverApproval/>}/>

        {/* vendor */}
        <Route path="/vendor-list" element={<VendorList/>}/>
        <Route path="/vendor-approval/:id" element={<VendorApproval/>}/>

        {/* Banner */}
        <Route path="/banner-list" element={<BannerList/>}/>

        {/* tag */}
        <Route path="/tag-list" element={<TagList/>}/>

         {/* tax */}
         <Route path="/tax-list" element={<TaxList/>}/>


        {/* product type  */}
        <Route path="/product-type-list" element={<ProductTypeList/>}/>

        {/* product manufacture  */}
        <Route path="/product-manufacture-location-list" element={<ProductManufactureLocactionList/>}/>

        {/* product   */}
        <Route path="/product-list" element={<ProductList/>}/>
        <Route path="/add-product" element={<AddProduct/>}/>

        {/* admin  */}
        <Route path='/admin-list' element={<AdminList />} />

        {/* course  */}
        <Route path='/course-list' element={<CourseList />} />
        <Route path='/academyCourse-list' element={<AcademyCourseList />} />

        {/* batch  */}
        <Route path='/batch-list' element={<BatchList />} />
        <Route path='/academybatch-list' element={<AcademyBatchList/>}/>

        {/* User  */}
        <Route path='user-list' element={<UserList/>} />

        {/* Booking  */}
        <Route path='booking-list' element={<BookingList />} />
        
    </Routes>
  )
}

export default AuthenticatedRoutes