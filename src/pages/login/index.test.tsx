import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "./index";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

jest.mock("axios", () => {
  return {
    post: jest.fn().mockImplementationOnce(() => {
      return Promise.reject();
    }),
  };
});

it("should not crash on mount", () => {
  render(<LoginPage />);

  expect(screen.getByRole("form")).toBeInTheDocument();
});

it("displayes error on wrong credentials", async () => {
  render(<LoginPage />);

  const emailInput = screen.getByLabelText("Email");
  const pwdInput = screen.getByLabelText("Password");

  fireEvent.change(emailInput, { target: { value: "asdasd" } });
  fireEvent.change(pwdInput, { target: { value: "asda" } });
  fireEvent.click(screen.getByText("Log in"));

  await waitFor(() => {
    expect(screen.getByText("Oops, something went wrong!")).toBeInTheDocument();
  });
});
