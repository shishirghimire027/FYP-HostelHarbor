import React from "react";
import Signup from "./pages/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import YourHostel from "./pages/YourHostel";
import FindHostel from "./pages/FindHostel";
import Navbar from "./components/users/Navbar";

import Login from "./pages/Login";
import LoginManager from "./pages/LoginManager";
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
import EditRoom from "./components/managerdash/EditRoom";
import UpdateImage from "./components/managerdash/UpdateImage";
import ManageBooking from "./components/managerdash/ManageBooking";

import VisitHostel from "./components/users/VisitHostel";
import HostelData from "./components/managerdash/HostelData";
import UserData from "./components/users/UserData";
import Logout from "./pages/Logout";
import BookHostelInfo from "./components/users/BookHostelInfo";
import BookUserInfo from "./components/users/BookUserInfo";
import BookHostel from "./components/users/BookHostel";
import BookRoomInfo from "./components/users/BookRoomInfo";
import ManagerManageBooking from "./pages/Manager/ManagerManageBooking";
import UserHostel from "./components/userHostel/UserHostel";
import PendingRequest from "./components/userHostel/PendingRequest";
import ChatInterface from "./components/userHostel/ChatInterface";
import ManagerChatInterface from "./components/managerdash/ManagerChatInterface";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/YourHostel" element={<YourHostel />} />
          <Route path="/FindHostel" element={<FindHostel />} />

          <Route path="/VisitHostel/:id" element={<VisitHostel />} />
          <Route path="/Navbar" element={<Navbar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Logout" element={<Logout />} />
          <Route index element={<Navigate to="/Login" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/HostelReg" element={<HostelReg />} />
          <Route path="/UserData" element={<UserData />} />

          <Route path="/UserHostel" element={<UserHostel />} />
          <Route path="/PendingRequest" element={<PendingRequest />} />
          <Route path="/ChatInterface" element={<ChatInterface />} />

          <Route path="/BookHostel/:id" element={<BookHostel />} />
          <Route path="/BookHostelInfo" element={<BookHostelInfo />} />
          <Route path="/BookUserInfo" element={<BookUserInfo />} />
          <Route path="/BookRoomInfo" element={<BookRoomInfo />} />

          <Route path="/Admin" element={<Admin />} />
          <Route path="/AdminAddHostel" element={<AdminAddHostel />} />
          <Route path="/AdminHostelList" element={<AdminHostelList />} />
          <Route path="/AdminHeader" element={<AdminHeader />} />
          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/AdminSidebar" element={<AdminSidebar />} />

          <Route path="/LoginManager" element={<LoginManager />} />
          <Route path="/Manager" element={<Manager />} />
          <Route path="/ManagerHeader" element={<ManagerHeader />} />
          <Route path="/ManagerSidebar" element={<ManagerSidebar />} />
          <Route path="/ManagerHome" element={<ManagerHome />} />
          <Route path="/CreateRoom" element={<CreateRoom />} />
          <Route path="/UpdateRoom/:id" element={<UpdateRoom />} />
          <Route path="/ManageRoom" element={<ManageRoom />} />
          <Route path="/EditRoom/:id" element={<EditRoom />} />
          <Route path="/UpdateImage/:id" element={<UpdateImage />} />
          <Route path="/ManagerManageRoom" element={<ManagerManageRoom />} />
          <Route path="/ManagerChatInterface" element={<ManagerChatInterface />} />

          <Route
            path="/ManagerManageBooking"
            element={<ManagerManageBooking />}
          />
          <Route path="/ManageBooking" element={<ManageBooking />} />
          <Route path="/HostelData" element={<HostelData />} />

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
