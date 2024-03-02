import React, { useState } from "react";

function Navbar() {
  // State to manage modal visibility
  const [showModal, setShowModal] = useState(false);

  // Function to handle logout
  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem("token");
    // Redirect to the login page or any other desired page
    window.location.href = "/login";
  };

  return (
    <div>
      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Are you sure you want to log out?
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowModal(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <ul className="nav nav-underline" style={{ color: "black" }}>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/Home">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            About us
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="FindHostel">
            Find Hostels
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/YourHostel">
            Your Hostel
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Contact us
          </a>
        </li>
        <li>
        <button
          type="button"
          className="nav-link btn btn-link"
          onClick={() => setShowModal(true)}
        >
          Logout
        </button>
      </li>
      </ul>
    </div>
  );
}

export default Navbar;
