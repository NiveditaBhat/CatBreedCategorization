import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Loading from "@/app/loading";

describe("Loading Page", () => {
  it("should render loading skeleton", () => {
    render(<Loading />);

    expect(
      screen.getByLabelText("Loading cat breeds data..."),
    ).toBeInTheDocument();
  });
});
