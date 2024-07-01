import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Error from "../app/error";

import { useRouter } from "next/navigation";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest
    .fn()
    .mockReturnValue("https://www.catBreedCategorization.com/"),
}));

describe("Error Page", () => {
  const mockRouter = {
    route: "/",
    pathname: "/",
    query: {},
    asPath: "/",
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
    beforePopState: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it("should render error message", () => {
    render(
      <Error
        error={{
          name: "Server error",
          message: "Something went wrong",
        }}
        reset={jest.fn()}
        searchParams={{}}
      />,
    );

    expect(screen.getByLabelText("Choose a breed")).toBeInTheDocument();

    expect(screen.getByAltText("Error icon")).toBeInTheDocument();
    expect(
      screen.getByText("Oops... An unexpected error occurred"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Please try again or refresh the page"),
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Refresh" })).toBeInTheDocument();
  });

  it("should call reset when Refresh button is clicked", async () => {
    const user = userEvent.setup();
    const resetSpy = jest.fn();
    render(
      <Error
        error={{
          name: "Server error",
          message: "Something went wrong",
        }}
        reset={resetSpy}
        searchParams={{}}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Refresh" }));

    expect(resetSpy).toHaveBeenCalled();
  });
});
