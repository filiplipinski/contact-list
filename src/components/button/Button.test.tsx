import React from "react";
import { render, screen } from "@testing-library/react";

import { Button } from "./Button";
import { LoaderTestID } from "../loader/Loader";

describe("Button", () => {
  it("renders with proper text", () => {
    const btnText = "Hello!";

    render(<Button>{btnText}</Button>);

    expect(screen.getByText(btnText)).toBeInTheDocument();
  });

  it("renders button with loader", () => {
    render(<Button isLoading>Nice to meet you!</Button>);

    const btnLoader = screen.getByTestId(LoaderTestID.Loader);

    expect(btnLoader).toBeInTheDocument();
  });
});
