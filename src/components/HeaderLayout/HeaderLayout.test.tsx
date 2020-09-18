import React from "react";
import { render, screen } from "@testing-library/react";
import HeaderLayout from "./HeaderLayout";

it("it does not crash on mount", () => {
  render(<HeaderLayout />);

  expect(screen.getByRole("banner")).toBeInTheDocument()
});
