// PaymentSuccessfull.jsx
import React from "react";

function PaymentSuccessfull() {
  return (
    <div className="container mt-5  d-flex justify-content-center">
      <div className="d-flex flex-column align-items-center">
        <div className="text-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="currentColor"
            className="bi bi-patch-check"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0"
            />
            <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622-.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z" />
          </svg>
        </div>
        <div className="mt-3 text-xl font-weight-bold text-uppercase text-success">
          Congratulations!
        </div>
        <div className="text-lg font-weight-bold text-gray-500 mt-4">
          Payment is Successfull.
        </div>

        <button className="btn btn-success mt-3">
          <a
            href="/YourHostel"
            style={{ color: "white", textDecoration: "none" }}
          >
            View Hostel
          </a>
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccessfull;
