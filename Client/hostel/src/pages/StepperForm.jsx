import { StepperContext } from "../contexts/StepperContextProvider";
import Stepper from "../components/Stepper";
import StepperControl from "../components/StepperControl";
import React, { useState } from "react";
import Account from "../components/steps/Account";
import Detail from "../components/steps/Detail";
import Final from "../components/steps/Final";
import HostelInfo from "../components/steps/HostelInfo";
// import Payment from "../components/steps/Payment";


function StepperForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState("");
  const [finalData, setFinalData] = useState([]);

  const steps = [
    "Hostel Information",
    "Manager Information",
    "Upload Documents",
    "Complete",
  ];
  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <HostelInfo />;
      case 2:
        return <Account />;
      case 3:
        return <Detail />;
      case 4:
        return <Final />;
      // case 1:
      //     return <Account />
      default:
    }
  };
  const handleClick = (direction) => {
    let newStep = currentStep;
    direction === "next" ? newStep++ : newStep--;
    // check if steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };
  return (
    <>
      <div className="container-md mx-auto shadow-lg rounded pb-2 bg-light">
        <div className="container-fluid horizontal mt-5">
          <Stepper steps={steps} currentStep={currentStep} />

          {/* Display components */}
          <div className="my-10 p-4">
            <StepperContext.Provider
              value={{
                userData,
                setUserData,
                finalData,
                setFinalData,
              }}
            >
              {displayStep(currentStep)}
            </StepperContext.Provider>
          </div>
        </div>

        {/* Navigation controls */}
        {currentStep !== steps.length && (
          <StepperControl
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
          />
        )}
      </div>
    </>
  );
}

export default StepperForm;
