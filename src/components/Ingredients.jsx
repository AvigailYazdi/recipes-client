import { useState } from "react";

export const Ingredients = (props) => {
  const { ingredients } = props;
  const [selectedIngredients, setSelectedIngredients] = useState(new Set());

  const clickOnIngredient = (ingredientId) => {
    setSelectedIngredients((prev) => {
      const newSet = new Set(prev);

      prev.has(ingredientId)
        ? newSet.delete(ingredientId)
        : newSet.add(ingredientId);

      return newSet;
    });
  };

  return (
    <div>
      <h3>רכיבים:</h3>
      {ingredients.map((section, index) => (
        <div key={index}>
          {section.title && <h4>{section.title}</h4>}
          <ul>
            {section.items.map((item, itemIndex) => (
              <li
                key={itemIndex}
                onClick={() => clickOnIngredient(`${index}-${itemIndex}`)}
                className={
                  selectedIngredients.has(`${index}-${itemIndex}`)
                    ? "selected"
                    : ""
                }
              >
                {item.amount} {item.unit} {item.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
