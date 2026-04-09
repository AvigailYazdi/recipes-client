import { IconButton, TextField, Tooltip, Typography } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";

export const RecipeDialogStepsSection = (props) => {
  const {
    steps,
    updateStep,
    updateStepSectionTitle,
    addStepItem,
    addStepSection,
    removeStepItem,
    removeStepSection,
  } = props;
  return (
    <div>
      <Typography>הוראות הכנה *</Typography>
      <div className="steps-div">
        {steps.map((step, stepIndex) => (
          <div className="steps-section-div" key={stepIndex}>
            <div className="step-section-header">
              <Tooltip title="מחק קבוצת שלבים">
                <IconButton
                  onClick={() => removeStepSection(stepIndex)}
                  disabled={steps.length === 1}
                >
                  <RemoveOutlinedIcon />
                </IconButton>
              </Tooltip>
              <TextField
                type="text"
                label="כותרת"
                fullWidth
                value={step.title}
                onChange={(e) =>
                  updateStepSectionTitle(stepIndex, e.target.value)
                }
              />
            </div>
            {step.items.map((item, itemIndex) => (
              <div className="step-div" key={`${stepIndex}-${itemIndex}`}>
                <TextField
                  label={`שלב ${itemIndex + 1}`}
                  type="text"
                  margin="normal"
                  fullWidth
                  value={item}
                  onChange={(e) =>
                    updateStep(stepIndex, itemIndex, e.target.value)
                  }
                />
                <Tooltip title="מחק שלב">
                  <IconButton
                    onClick={() => removeStepItem(stepIndex, itemIndex)}
                    disabled={
                      steps.length === 1 && step.items.length === 1
                    }
                  >
                    <RemoveOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </div>
            ))}
            <Tooltip title="הוסף שלב">
              <IconButton onClick={() => addStepItem(stepIndex)}>
                <AddOutlinedIcon />
              </IconButton>
            </Tooltip>
          </div>
        ))}
      </div>
      <Tooltip title="הוסף קבוצת שלבים">
        <IconButton onClick={addStepSection}>
          <AddOutlinedIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};
