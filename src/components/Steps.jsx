import { useState } from "react";

export const Steps = (props) => {
  const { steps } = props;
  const [selectedSteps, setSelectedSteps] = useState(new Set());

  const clickOnStep = (stepId) => {
    setSelectedSteps((prev) => {
      const newSet = new Set(prev);

      prev.has(stepId) ? newSet.delete(stepId) : newSet.add(stepId);

      return newSet;
    });
  };
  return (
    <div>
      {steps.map((section, index) => (
        <div key={index}>
          {section.title && <h4>{section.title}</h4>}
          <ol>
            {section.items.map((item, itemIndex) => (
              <li
                key={itemIndex}
                onClick={() => clickOnStep(`${index}-${itemIndex}`)}
                className={
                  selectedSteps.has(`${index}-${itemIndex}`) ? "selected" : ""
                }
              >
                {item}
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
};
