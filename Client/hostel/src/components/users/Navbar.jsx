import React from "react";

function Navbar() {
  return (
    <div>
      <ul class="nav nav-underline" style={{ color: "black" }}>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/Home">
            Home
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            About us
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            Find Hostels
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/YourHostel">
            Your Hostel
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            Contact us
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
