// import React, { useEffect, useState, useRef } from "react";

// const Stepper = ({ steps, currentStep }) => {
//   const [newStep, setNewStep] = useState([]);
//   const stepRef = useRef();

//   const updateStep = (stepNumber, steps) => {
//     const newSteps =[...steps]
//     let count =0;
//     while(count <newSteps.length){
//         //cuurent steps
//         if(count === stepNumber){
//             newSteps[count] ={
//                 ...newSteps[count],
//                 highlighted: true,
//                 selected: true,
//                 completed: true,
//             }
//             count++;
//         }
//         //step completed
//         else if(count <stepNumber){
//             newSteps[count] ={
//                 ...newSteps[count],
//                 highlighted: false,
//                 selected: true,
//                 completed: true,
//             }
//             count++;
//         }
//         //step pending
//         else{
//             newSteps[count] ={
//                 ...newSteps[count],
//                 highlighted: false,
//                 selected: false,
//                 completed: false,
//             }  
//             count ++;
//         }
//     }
//     return newSteps
//   };
//   useEffect(() => {
//     //create object
//     const stepState = steps.map((step, index) =>
//       Object.assign(
//         {},
//         {
//           description: step,
//           completed: false,
//           highlighted: (index === 0 ? true : false),
//           selected: (index === 0 ? true : false),
//         }
//       )
//     );
//     stepRef.current = stepState;
//     const current = updateStep(currentStep - 1, stepRef.current);
//     setNewStep(current);
//   }, [steps, currentStep]);

//   const displaySteps = newStep.map((step, index) => {
//     return (
//       <div key ={index} className={
//         index !== newStep.length-1 ? "w-full flex items-center" : "flex items-center"}>
//         <div className="relative flex flex-col items-center text-teal-600">
//           <div className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-12 w-12 flex items-center justify-center py-3 ${step.selected ? "bg-green-600 text-white font-bold border" : ""}`}>
//             {/* Display Numbers */}
//             {step.completed ? (
//                 <span className="text-white font-bold text-xl">&#10003;</span>
//             ):(index + 1)}
//           </div>
//           <div className={`absolute top-0 text-center mt-16 w-32 text-xs font-medium uppercase ${step.higlighted ? "text-gray-900" : "text-gray-400"}`}>
//             {/* Display Description */}
//             {step.description}
//           </div>
//         </div>
//         <div className={`flex-auto border-t-2 transition duration-500 ease-in-out ${step.completed ? "border-green-600": "border-green-300"}`}>
//           {/* Display line */}
//         </div>
//       </div>
//     );
//   });

//   return (
//     <div className="mx-4 p-4 flex justify-between items-center">
//       {displaySteps}
//     </div>
//   );
// };

// export default Stepper;

import React, { useEffect, useState, useRef } from "react";

const Stepper = ({ steps, currentStep }) => {
  const [newStep, setNewStep] = useState([]);
  const stepRef = useRef();

  const updateStep = (stepNumber, steps) => {
    const newSteps = [...steps];
    let count = 0;
    while (count < newSteps.length) {
      if (count === stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: true,
          selected: true,
          completed: true,
        };
        count++;
      } else if (count < stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: true,
          completed: true,
        };
        count++;
      } else {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: false,
          completed: false,
        };
        count++;
      }
    }
    return newSteps;
  };

  useEffect(() => {
    const stepState = steps.map((step, index) =>
      Object.assign(
        {},
        {
          description: step,
          completed: false,
          highlighted: index === 0 ? true : false,
          selected: index === 0 ? true : false,
        }
      )
    );
    stepRef.current = stepState;
    const current = updateStep(currentStep - 1, stepRef.current);
    setNewStep(current);
  }, [steps, currentStep]);

  const displaySteps = newStep.map((step, index) => {
    return (
      <div
        key={index}
        className={
          index !== newStep.length - 1
            ? "w-full d-flex align-items-center"
            : "d-flex align-items-center"
        }
      >
        <div className="position-relative d-flex flex-column align-items-center text-teal">
        <div
  className={`rounded-circle transition duration-500 ease-in-out border border-gray d-flex align-items-center justify-content-center py-3 ${
    step.selected ? "bg-success text-white font-weight-bold border" : ""
  }`}
  style={{ width: '40px', height: '40px' }} // Adjust the width and height as needed
>
  {/* Display Numbers */}
  {step.completed ? (
    <span className="text-white font-weight-bold text-xl">&#10003;</span>
  ) : (
    <span className="text-center">{index + 1}</span>
  )}
</div>

          <div
            className={` top-0 text-center mt-20 w-32 small text-uppercase ${
              step.highlighted ? "text-dark" : "text-secondary"
            }`}
          >
            {/* Display Description */}
            {step.description}<br></br>
            <div
              className="flex-grow transition duration-500 ease-in-out "
              style={{
                borderTopWidth: "4px",
                borderTopStyle: "solid",
                borderColor: step.completed ? "#28a745" : "#6c757d",
                width: '180px',
              }}
            ></div>
          </div>
        </div>
       



      </div>
    );
  });

  return <div className="mx-4 p-4 d-flex justify-content-between align-items-center">{displaySteps}</div>;
};

export default Stepper;

