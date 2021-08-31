import { useState } from "react";

export function replaceCamelWithSpaces(colorName) {
  return colorName.replace(/\B([A-Z])\B/g, " $1");
}

function App() {
  const [buttonColor, setButtonColor] = useState("red");
  const newButtonColor = buttonColor === "red" ? "blue" : "red";

  const [disabled, setDisabled] = useState(false);

  return (
    <div>
      <button
        style={{ backgroundColor: disabled ? "gray" : buttonColor }}
        onClick={() => setButtonColor(newButtonColor)}
        disabled={disabled}
      >
        Change to {newButtonColor}
      </button>
      <input
        type="checkbox"
        id="toggle-disableButton-checkbox"
        onChange={(e) => setDisabled(e.target.checked)}
        defaultChecked={disabled}
        aria-checked={disabled}
      />
      <label htmlFor="toggle-disableButton-checkbox">Disable the button</label>
    </div>
  );
}

export default App;
