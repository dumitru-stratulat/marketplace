import React from "react";
import { render, screen } from "@testing-library/react";
import FooterLayout from "./FooterLayout";

it("should render footer", () => {
  render(<FooterLayout />);

  expect(screen.getByRole("navigation")).toBeInTheDocument();
});
