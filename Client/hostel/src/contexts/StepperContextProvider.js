// import React, { useState } from "react";
// import StepperForm from "../pages/StepperForm";

// export const StepperContext = React.createContext();

// const StepperContextProvider = () => {
//   const [currentStep, setStep] = useState(1);
//   const [userData, setUserData] = useState({});
//   const [finalData, setFinalData] = useState([]);

 


//   return (
//     <div>
//       <StepperContext.Provider
//         value={{ currentStep, setStep, userData, setUserData, finalData, setFinalData}}
//       >
//         <StepperForm />
//       </StepperContext.Provider>
//     </div>
//   );
// };

// export default StepperContextProvider;


// StepperContextProvider.jsx

// StepperContextProvider.jsx
import React, { createContext, useState } from "react";

export const StepperContext = createContext();

const StepperContextProvider = ({ children }) => {
  const [currentStep, setStep] = useState(1);
  const [userData, setUserData] = useState({});
  const [finalData, setFinalData] = useState([]);

  const handleSubmit = () => {
    // Combine all userData from each step into one object
    const combinedUserData = finalData.reduce((acc, stepData) => {
      return { ...acc, ...stepData };
    }, {});

    // Your logic for handling form submission goes here
    console.log("All form data submitted:", combinedUserData);
  };

  return (
    <div>
      <StepperContext.Provider
        value={{ currentStep, setStep, userData, setUserData, finalData, handleSubmit }}
      >
        {children}
      </StepperContext.Provider>
    </div>
  );
};

export default StepperContextProvider;
