import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";
import { uploadImage } from "../api/cloudinary";
import { RecipeDialogStepsSection } from "./RecipeDialogStepsSection";
import { RecipeDialogIngredientsSection } from "./RecipeDialogIngredientsSection";
import { RecipeDialogBasicSection } from "./RecipeDialogBasicSection";
import { RecipeDialogTagsSection } from "./RecipeDialogTagsSection";
import { RecipeDialogCategoriesSection } from "./RecipeDialogCategoriesSection";
import { RecipeDialogImagesSection } from "./RecipeDialogImagesSection";

const allCategories = [
  "ארוחת בוקר",
  "ארוחת צהריים",
  "ארוחת ערב",
  "מרקים",
  "סלטים",
  "תוספות",
  "עיקריות",
  "מאפים",
  "מתוקים",
  "בשרי",
  "חלבי",
  "דגים",
];

export const RecipeDialog = (props) => {
  const [error, setError] = useState(null);
  const { isDialogOpen, closeFunc, dialogMode, recipe } = props;
  const emptyRecipe = {
    title: "",
    description: "",
    images: [""],
    categories: [],
    prepTimeMinutes: "",
    difficulty: "קל",
    servings: "",
    tags: [""],
    status: "טיוטה",
    ingredients: [
      {
        title: "",
        items: [{ name: "", amount: "", unit: "" }],
      },
    ],
    steps: [
      {
        title: "",
        items: [""],
      },
    ],
  };

  const isEdit = dialogMode === "Edit";
  const [formData, setFormData] = useState(emptyRecipe);
  const [newImages, setNewImages] = useState([]);
  const difficultiesOptions = ["קל", "בינוני", "קשה"];
  const statusOptions = ["טיוטה", "פורסם"];

  const handleClose = () => {
    setFormData(emptyRecipe);
    setError(null);
    closeFunc();
  };

  const handleChange = (field, value) => {
    setFormData((prev) => {
      return { ...prev, [field]: value };
    });
  };

  const updateTag = (index, value) => {
    const updatedTags = [...formData.tags];
    updatedTags[index] = value;
    setFormData((prev) => {
      return {
        ...prev,
        tags: updatedTags,
      };
    });
  };

  const addTag = () => {
    const updatedTags = [...formData.tags];
    updatedTags.push("");
    setFormData((prev) => {
      return {
        ...prev,
        tags: updatedTags,
      };
    });
  };

  const updateCategories = (category) => {
    setFormData((prev) => {
      const updatedCategories = prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category];
      return {
        ...prev,
        categories: updatedCategories,
      };
    });
  };

  const updateIngredient = (sectionIndex, itemIndex, field, value) => {
    setFormData((prev) => {
      const updatedIngredients = [...prev.ingredients];
      const updatedSection = { ...updatedIngredients[sectionIndex] };
      const updatedItems = [...updatedSection.items];

      updatedItems[itemIndex] = {
        ...updatedItems[itemIndex],
        [field]: value,
      };
      updatedSection.items = updatedItems;
      updatedIngredients[sectionIndex] = updatedSection;

      return {
        ...prev,
        ingredients: updatedIngredients,
      };
    });
  };

  const updateIngredientSectionTitle = (sectionIndex, value) => {
    setFormData((prev) => {
      const updatedIngredients = [...prev.ingredients];
      const updatedSection = { ...updatedIngredients[sectionIndex] };
      updatedSection.title = value;
      updatedIngredients[sectionIndex] = updatedSection;
      return {
        ...prev,
        ingredients: updatedIngredients,
      };
    });
  };

  const addIngredientItem = (sectionIndex) => {
    setFormData((prev) => {
      const updatedIngredients = [...prev.ingredients];
      const updatedSection = { ...updatedIngredients[sectionIndex] };
      const updatedItems = [...updatedSection.items];

      updatedItems.push({ name: "", amount: "", unit: "" });
      updatedSection.items = updatedItems;
      updatedIngredients[sectionIndex] = updatedSection;
      return {
        ...prev,
        ingredients: updatedIngredients,
      };
    });
  };

  const addIngredientSection = () => {
    setFormData((prev) => {
      const updatedIngredients = [...prev.ingredients];
      updatedIngredients.push({
        title: "",
        items: [{ name: "", amount: "", unit: "" }],
      });
      return {
        ...prev,
        ingredients: updatedIngredients,
      };
    });
  };

  const removeIngredientItem = (sectionIndex, itemIndex) => {
    setFormData((prev) => {
      const updatedIngredients = [...prev.ingredients];
      const updatedSection = { ...updatedIngredients[sectionIndex] };
      const updatedItems = [...updatedSection.items];
      if (updatedItems.length !== 1) {
        updatedItems.splice(itemIndex, 1);
        updatedSection.items = updatedItems;
        updatedIngredients[sectionIndex] = updatedSection;
      } else {
        if (updatedIngredients.length !== 1) {
          updatedIngredients.splice(sectionIndex, 1);
        }
      }
      return {
        ...prev,
        ingredients: updatedIngredients,
      };
    });
  };

  const removeIngredientSection = (sectionIndex) => {
    setFormData((prev) => {
      const updatedIngredients = [...prev.ingredients];
      if (updatedIngredients.length !== 1) {
        updatedIngredients.splice(sectionIndex, 1);
      }
      return {
        ...prev,
        ingredients: updatedIngredients,
      };
    });
  };

  const updateStep = (sectionIndex, itemIndex, value) => {
    setFormData((prev) => {
      const updatedSteps = [...prev.steps];
      const updatedSection = { ...updatedSteps[sectionIndex] };
      const updatedItems = [...updatedSection.items];

      updatedItems[itemIndex] = value;
      updatedSection.items = updatedItems;
      updatedSteps[sectionIndex] = updatedSection;

      return {
        ...prev,
        steps: updatedSteps,
      };
    });
  };

  const updateStepSectionTitle = (sectionIndex, value) => {
    setFormData((prev) => {
      const updatedSteps = [...prev.steps];
      const updatedSection = { ...updatedSteps[sectionIndex] };
      updatedSection.title = value;
      updatedSteps[sectionIndex] = updatedSection;

      return {
        ...prev,
        steps: updatedSteps,
      };
    });
  };

  const addStepItem = (sectionIndex) => {
    setFormData((prev) => {
      const updatedSteps = [...prev.steps];
      const updatedSection = { ...updatedSteps[sectionIndex] };
      const updatedItems = [...updatedSection.items];
      updatedItems.push("");
      updatedSection.items = updatedItems;
      updatedSteps[sectionIndex] = updatedSection;

      return {
        ...prev,
        steps: updatedSteps,
      };
    });
  };

  const addStepSection = () => {
    setFormData((prev) => {
      const updatedSteps = [...prev.steps];
      updatedSteps.push({
        title: "",
        items: [""],
      });
      return {
        ...prev,
        steps: updatedSteps,
      };
    });
  };

  const removeStepItem = (sectionIndex, itemIndex) => {
    setFormData((prev) => {
      const updatedSteps = [...prev.steps];
      const updatedSection = { ...updatedSteps[sectionIndex] };
      const updatedItems = [...updatedSection.items];
      if (updatedItems.length !== 1) {
        updatedItems.splice(itemIndex, 1);
        updatedSection.items = updatedItems;
        updatedSteps[sectionIndex] = updatedSection;
      } else {
        if (updatedSteps.length !== 1) {
          updatedSteps.splice(sectionIndex, 1);
        }
      }
      return {
        ...prev,
        steps: updatedSteps,
      };
    });
  };

  const removeStepSection = (sectionIndex) => {
    setFormData((prev) => {
      const updatedSteps = [...prev.steps];
      if (updatedSteps.length !== 1) {
        updatedSteps.splice(sectionIndex, 1);
      }
      return {
        ...prev,
        steps: updatedSteps,
      };
    });
  };

  const validateIngredients = () => {
    for (let ingredient of formData.ingredients) {
      for (let item of ingredient.items) {
        if (item.name?.trim() === "") {
          return false;
        }
      }
    }
    return true;
  };

  const validateSteps = () => {
    for (let step of formData.steps) {
      for (let item of step.items) {
        if (item.trim() === "") {
          return false;
        }
      }
    }
    return true;
  };

  const cleanRecipe = (imageUrls) => {
    return {
      ...formData,
      images: imageUrls,
      title: formData.title.trim(),
      description: formData.description.trim(),
      prepTimeMinutes: Number(formData.prepTimeMinutes),
      servings: Number(formData.servings),
      tags: formData.tags.map((tag) => tag.trim()).filter((tag) => tag !== ""),
      ingredients: formData.ingredients.map((section) => ({
        title: section.title.trim(),
        items: section.items.map((item) => ({
          name: item.name.trim(),
          amount: item.amount?.trim() || "",
          unit: item.unit?.trim() || "",
        })),
      })),
      steps: formData.steps.map((section) => ({
        title: section.title.trim(),
        items: section.items.map((item) => item.trim()),
      })),
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.categories.length === 0) {
      setError("יש לבחור לכל הפחות קטגוריה אחת");
      return;
    }
    if (!validateIngredients()) {
      setError("יש למלא שם לכל המרכיבים");
      return;
    }
    if (!validateSteps()) {
      setError("יש למלא את כל שלבי ההכנה");
      return;
    }
    if (
      (!newImages || newImages.length === 0) &&
      formData.images.length === 0
    ) {
      setError("יש להוסיף לכל הפחות תמונה אחת");
      return;
    }
    setError(null);
    const uploadPromises = [];
    for (let img of newImages) {
      uploadPromises.push(uploadImage(img));
    }
    const uploadedNewImageUrls = await Promise.all(uploadPromises);
    const finalImageUrls = [...uploadedNewImageUrls, ...formData.images];
    const updatedData = cleanRecipe(finalImageUrls);
    console.log(updatedData);
  };

  useEffect(() => {
    if (isDialogOpen) {
      if (isEdit) {
        setFormData(recipe);
      } else {
        setFormData(emptyRecipe);
        setError(null);
      }
    }
  }, [recipe, isDialogOpen, dialogMode]);

  return (
    <Dialog open={isDialogOpen} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {dialogMode === "Add" ? "הוספת מתכון" : "עריכת מתכון"}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} id="recipe-form">
          <RecipeDialogBasicSection
            formData={formData}
            handleChange={handleChange}
            difficultiesOptions={difficultiesOptions}
            statusOptions={statusOptions}
          />
          <RecipeDialogCategoriesSection
            categories={formData.categories}
            updateCategories={updateCategories}
            allCategories={allCategories}
          />
          <RecipeDialogTagsSection
            tags={formData.tags}
            updateTag={updateTag}
            addTag={addTag}
          />
          <RecipeDialogIngredientsSection
            ingredients={formData.ingredients}
            updateIngredient={updateIngredient}
            updateIngredientSectionTitle={updateIngredientSectionTitle}
            addIngredientItem={addIngredientItem}
            addIngredientSection={addIngredientSection}
            removeIngredientItem={removeIngredientItem}
            removeIngredientSection={removeIngredientSection}
          />
          <RecipeDialogStepsSection
            steps={formData.steps}
            updateStep={updateStep}
            updateStepSectionTitle={updateStepSectionTitle}
            addStepItem={addStepItem}
            addStepSection={addStepSection}
            removeStepItem={removeStepItem}
            removeStepSection={removeStepSection}
          />
          <RecipeDialogImagesSection
            existingImages={formData.images}
            setExistingImages={(images) =>
              setFormData((prev) => ({ ...prev, images }))
            }
            newImages={newImages}
            setNewImages={setNewImages}
          />
          {error && <Alert severity="error">{error}</Alert>}
        </form>
      </DialogContent>
      <DialogActions>
        <Button type="submit" form="recipe-form">
          {dialogMode === "Add" ? "הוספה" : "אשר שינויים"}
        </Button>
        <Button onClick={handleClose}>ביטול</Button>
      </DialogActions>
    </Dialog>
  );
};
