import React from "react";

const StepperControl = ({ handleClick, currentStep, steps }) => {
  return (
    <div className="container d-flex justify-content-around mt-4 mb-8">
      {/* back button */}
      <button
        onClick={() => handleClick()}
        className={`btn btn-light text-secondary text-uppercase py-2 px-4 rounded-xl font-weight-semibold border border-secondary ${currentStep === 1 ? "disabled" : ""}`}
        disabled={currentStep === 1}
      >
        Back
      </button>

      {/* next button */}
      <button
        onClick={() => handleClick("next")}
        className="btn btn-success text-white text-uppercase py-2 px-4 rounded-xl font-weight-semibold"
      >
        {currentStep === steps.length - 1 ? "Confirm" : "Next"}
      </button>
    </div>
  );
};

export default StepperControl;


// import React, { useContext } from "react";
// import { StepperContext } from "../contexts/StepperContextProvider";


// const StepperControl = ({ handleClick, currentStep, steps }) => {
//   const { handleSubmit } = useContext(StepperContext); // Retrieve the handleSubmit function from the StepperContext

//   const handleNextClick = () => {
//     if (currentStep === steps.length - 1) {
//       handleSubmit(); // Call the handleSubmit function if it's the last step
//     } else {
//       handleClick("next"); // Proceed to the next step
//     }
//   };

//   return (
//     <div className="container d-flex justify-content-around mt-4 mb-8">
//       {/* back button */}
//       <button
//         onClick={() => handleClick()}
//         className={`btn btn-light text-secondary text-uppercase py-2 px-4 rounded-xl font-weight-semibold border border-secondary ${currentStep === 1 ? "disabled" : ""}`}
//         disabled={currentStep === 1}
//       >
//         Back
//       </button>

//       {/* next button */}
//       <button
//         onClick={handleNextClick} // Use handleNextClick to handle the click event
//         className="btn btn-success text-white text-uppercase py-2 px-4 rounded-xl font-weight-semibold"
//       >
//         {currentStep === steps.length - 1 ? "Confirm" : "Next"}
//       </button>
//     </div>
//   );
// };

// export default StepperControl;
