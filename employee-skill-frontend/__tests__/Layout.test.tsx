import React from "react";
import { render, screen } from "@testing-library/react";
import Layout from "../src/components/Layout";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
    };
  },
}));

describe("Layout", () => {
  it("renders children and footer", () => {
    render(
      <Layout>
        <div data-testid="child">Child component</div>
      </Layout>
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByText(/Employee Skill Tracker/i)).toBeInTheDocument();
  });
});
