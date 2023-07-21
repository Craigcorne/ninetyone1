import React from "react";
import AdminHeader from "../components/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSidebar";
import AddLocation from "../components/Admin/CreateDestination";
import AddressForm from "../components/Admin/CreateDestination";

const AdminDestination = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={13} />
          </div>
          <AddressForm />
        </div>
      </div>
    </div>
  );
};

export default AdminDestination;
