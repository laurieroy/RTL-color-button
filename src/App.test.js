import { render, screen, fireEvent } from "@testing-library/react";
import App, { replaceCamelWithSpaces } from "./App";

test("button has correct initial color and text", () => {
  render(<App />);
  //  find an element with a role of button and text of 'Change to blue', tests both initial
  const colorButton = screen.getByRole("button", { name: "Change to Midnight Blue" });

  expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });

  fireEvent.click(colorButton);

  expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });

  expect(colorButton.textContent).toBe("Change to Medium Violet Red");
});

test("initial conditions", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", { name: "Change to Midnight Blue" });

  expect(colorButton).toBeEnabled();

  const checkbox = screen.getByRole("checkbox");

  expect(checkbox).not.toBeChecked();
});

test("checking checkbox disables button", () => {
  render(<App />);

  const colorButton = screen.getByRole("button", { name: "Change to Midnight Blue" });
  const checkbox = screen.getByRole("checkbox");

  fireEvent.click(checkbox);

  expect(checkbox).toBeChecked();
  expect(colorButton).toBeDisabled();
});

test("clicking checkbox enables a disabled button", () => {
  render(<App />);

  const colorButton = screen.getByRole("button", { name: "Change to Midnight Blue" });
  const checkbox = screen.getByRole("checkbox", { name: "Disable the button" });

  fireEvent.click(checkbox);
  fireEvent.click(checkbox);

  expect(checkbox).not.toBeChecked();
  expect(colorButton).toBeEnabled();
});

test("Disabled button color toggles to gray when checked in initial state and back to MediumVioletRed", () => {
  render(<App />);

  const colorButton = screen.getByRole("button", { name: "Change to Midnight Blue" });
  const checkbox = screen.getByRole("checkbox", { name: "Disable the button" });

  expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });
  expect(checkbox).not.toBeChecked();

  fireEvent.click(checkbox);
  // disable button, button is gray

  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });

  fireEvent.click(checkbox);

  expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });
});

test("Checked button color toggles to gray when disabled by checkmark and back (to MidnightBlue)", () => {
  render(<App />);

  const colorButton = screen.getByRole("button", { name: "Change to Midnight Blue" });
  const checkbox = screen.getByRole("checkbox", { name: "Disable the button" });

  expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });
  expect(checkbox).not.toBeChecked();

  fireEvent.click(colorButton);

  expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });

  fireEvent.click(checkbox);

  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });

  fireEvent.click(checkbox);

  expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });
  expect(checkbox).not.toBeChecked();
  expect(colorButton).toBeEnabled();
});

// customers now want MediumVioletRed and Midnight BLue
describe("spaces before camel-case capital letters", () => {
  test("Works for no inner capital letters", () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red');
  });

  test("Works for one inner capital letter", () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
  });
  test("Works for multiple inner capital letters", () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
  });
})