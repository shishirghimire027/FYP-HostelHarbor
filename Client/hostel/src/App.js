import React from "react";
import Signup from "./pages/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import HostelReg from "./pages/HostelReg";
import AdminHeader from "./components/AdminHeader";
import AdminHome from "./components/AdminHome";
import AdminSidebar from "./components/AdminSidebar";

import Stepper from "./components/Stepper";
import StepperControl from "./components/StepperControl";
import StepperForm from "./pages/StepperForm";
import HostelInfo from "./components/steps/HostelInfo";
import Account from "./components/steps/Account";
import Detail from "./components/steps/Detail";
import Final from "./components/steps/Final";
import Payment from "./components/steps/Payment";



import "./App.css";
import NoPage from "./pages/NoPage";
import Admin from "./pages/Admin";
import AdminAddHostel from "./pages/AdminAddHostel";
import AdminHostelList from "./pages/AdminHostelList";
import AddHostel from "./components/AddHostel";
import Create from "./components/Create";
import Update from "./components/Update";
import UpdateHostelList from "./components/UpdateHostelList";
import Delete from "./components/Delete";
import HostelList from "./components/HostelList";


import Manager from "./pages/Manager";
import ManagerHeader from "./components/managerdash/ManagerHeader";
import ManagerSidebar from "./components/managerdash/ManagerSidebar";
import ManagerHome from "./components/managerdash/ManagerHome";
import CreateRoom from "./components/managerdash/CreateRoom";
import ManageRoom from "./components/managerdash/ManageRooms";
import ManagerManageRoom from "./pages/Manager/ManagerManageRoom";
import UpdateRoom from "./components/managerdash/UpdateRoom";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route index element={<Navigate to="/Login" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/HostelReg" element={<HostelReg />} />

          <Route path="/Admin" element={<Admin />} />
          <Route path="/AdminAddHostel" element={<AdminAddHostel />} />
          <Route path="/AdminHostelList" element={<AdminHostelList />} />
          <Route path="/AdminHeader" element={<AdminHeader />} />
          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/AdminSidebar" element={<AdminSidebar />} />

          <Route path="/Manager" element={<Manager />} />
          <Route path="/ManagerHeader" element={<ManagerHeader />} />
          <Route path="/ManagerSidebar" element={<ManagerSidebar />} />
          <Route path="/ManagerHome" element={<ManagerHome />} />
          <Route path="/CreateRoom" element={<CreateRoom />} />
          <Route path="/UpdateRoom" element={<UpdateRoom />} />
          <Route path="/ManageRoom" element={<ManageRoom />} />
          <Route path="/ManagerManageRoom" element={<ManagerManageRoom />} />




          <Route path="/AddHostel" element={<AddHostel />} />
          <Route path="/HostelList" element={<HostelList />} />
          <Route path="/Create" element={<Create />} />
          <Route path="/Update/:id" element={<Update />} />
          <Route path="/UpdateHostelList/:id" element={<UpdateHostelList />} />
          <Route path="/Delete" element={<Delete />} />

          <Route path="/Stepper" element={<Stepper />} />
          <Route path="/StepperControl" element={<StepperControl />} />
          <Route path="/StepperForm" element={<StepperForm />} />
          <Route path="/HostelInfo" element={<HostelInfo />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/Detail" element={<Detail />} />
          <Route path="/Final" element={<Final />} />
          <Route path="/Payment" element={<Payment />} />

          {/* <Route
            path="/Stepper"
            element={
              <React.Fragment>
                <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white">
                  <Stepper />
                </div>
              </React.Fragment>
            }
          />

          <Route
            path="/StepperControl"
            element={
              <React.Fragment>
                <div className="container horizontal mt-5">
                  <StepperControl />
                </div>
              </React.Fragment>
            }
          /> */}

          {/* Add a catch-all route for the root path */}
          {/* <Route path="/*" element={<Navigate to="/signup" />} /> */}
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
      {/* <div className="grid-container">
      <AdminHeader />
      <AdminHome />
      <AdminSidebar />

    </div> */}
    </>
  );
}

export default App;
