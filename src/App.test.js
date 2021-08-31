import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("button has correct initial color and text", () => {
  render(<App />);
  //  find an element with a role of button and text of 'Change to blue', tests both initial
  const colorButton = screen.getByRole("button", { name: "Change to blue" });

  expect(colorButton).toHaveStyle({ backgroundColor: "red" });

  fireEvent.click(colorButton);

  expect(colorButton).toHaveStyle({ backgroundColor: "blue" });

  expect(colorButton.textContent).toBe("Change to red");
});

test("initial conditions", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", { name: "Change to blue" });

  expect(colorButton).toBeEnabled();

  const checkbox = screen.getByRole("checkbox");

  expect(checkbox).not.toBeChecked();
});

test("checking checkbox disables button", () => {
  render(<App />);

  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  const checkbox = screen.getByRole("checkbox");

  fireEvent.click(checkbox);

  expect(checkbox).toBeChecked();
  expect(colorButton).toBeDisabled();
});

test("clicking checkbox enables a disabled button", () => {
  render(<App />);

  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  const checkbox = screen.getByRole("checkbox");

  fireEvent.click(checkbox);
  fireEvent.click(checkbox);

  expect(checkbox).not.toBeChecked();
  expect(colorButton).toBeEnabled();
});
