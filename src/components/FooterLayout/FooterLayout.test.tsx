import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import FooterLayout from "./FooterLayout";

it("should render footer", () => {
  render(<FooterLayout />);

  expect(screen.getByAltText('footer logo')).toBeInTheDocument();
});



