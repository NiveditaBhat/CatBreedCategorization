import "@testing-library/jest-dom";
import { render, screen, waitFor, within } from "@testing-library/react";
import Page from "../app/page";
import server from "../mocks/server";
import { API_BASE } from "@/config";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";

import {
  getCatBreedsResponse,
  getCatImagesResponse,
} from "@/__fixtures__/mockResponses";
import { http, HttpResponse } from "msw";
import { useRouter } from "next/navigation";
import userEvent from "@testing-library/user-event";

const replacePathMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest
    .fn()
    .mockReturnValue("https://www.catBreedCategorization.com/"),
}));

describe("Home Page", () => {
  const mockRouter = {
    route: "/",
    pathname: "/",
    query: {},
    asPath: "/",
    push: jest.fn(),
    replace: replacePathMock,
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
    mockAllIsIntersecting(false);
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    server.use(
      http.get(`${API_BASE}/v1/breeds/search`, (request) => {
        const url = new URL(request.request.url);

        const searchQuery = url.searchParams.get("q");

        if (searchQuery === "ab") {
          return HttpResponse.json([getCatBreedsResponse[0]]);
        }

        return HttpResponse.json(getCatBreedsResponse);
      }),
      http.get(`${API_BASE}/v1/images/search`, (request) => {
        const url = new URL(request.request.url);

        const breed = url.searchParams.get("breed_ids");

        if (breed === "abys") {
          return HttpResponse.json([getCatImagesResponse[0]]);
        }

        return HttpResponse.json([
          getCatImagesResponse[0],
          getCatImagesResponse[1],
          getCatImagesResponse[2],
        ]);
      }),
    );
  });

  it("should render cat breed images", async () => {
    const Resolved = await Page({
      searchParams: { breed_id: "", breed_name: "" },
    });
    render(Resolved);

    expect(screen.getByText("Showing 3 results")).toBeInTheDocument();

    expect(screen.getAllByRole("listitem")).toHaveLength(3);

    //first item
    const firstItem = screen.getAllByRole("listitem")[0];
    expect(
      within(firstItem).getByRole("heading", {
        name: "Abyssinian",
      }),
    ).toBeInTheDocument();
    expect(
      within(firstItem).getByAltText("Image of cat breed Abyssinian"),
    ).toBeInTheDocument();

    //second item
    const secondItem = screen.getAllByRole("listitem")[1];
    expect(
      within(secondItem).getByRole("heading", {
        name: "Abyssinian",
      }),
    ).toBeInTheDocument();
    expect(
      within(firstItem).getByAltText("Image of cat breed Abyssinian"),
    ).toBeInTheDocument();

    //third item
    const thirdItem = screen.getAllByRole("listitem")[2];
    expect(
      within(thirdItem).getByRole("heading", {
        name: "Balinese",
      }),
    ).toBeInTheDocument();
    expect(
      within(thirdItem).getByAltText("Image of cat breed Balinese"),
    ).toBeInTheDocument();
  });

  it("should search for cat breeds in search bar", async () => {
    const user = userEvent.setup();

    const Resolved = await Page({
      searchParams: { breed_id: "", breed_name: "" },
    });
    render(Resolved);

    const searchBar = screen.getByRole("combobox");
    expect(searchBar).toBeInTheDocument();

    await user.click(searchBar);

    await user.type(searchBar, "a");

    //search options
    const optionList = await screen.findByRole("listbox");
    expect(screen.getAllByRole("option")).toHaveLength(2);
    expect(
      within(optionList).getByRole("option", {
        name: "Abyssinian",
      }),
    ).toBeInTheDocument();
    expect(
      within(optionList).getByRole("option", {
        name: "Aegean",
      }),
    );

    await user.type(searchBar, "b");

    //search options
    expect(await screen.findAllByRole("option")).toHaveLength(1);
    expect(
      within(optionList).getByRole("option", {
        name: "Abyssinian",
      }),
    ).toBeInTheDocument();

    //select an option
    await user.selectOptions(screen.getByRole("listbox"), ["Abyssinian"]);

    expect(searchBar).toHaveValue("Abyssinian");

    //updates path
    expect(replacePathMock).toHaveBeenCalled();
    expect(replacePathMock).toHaveBeenCalledWith(
      `https://www.catBreedCategorization.com/?breed_id=abys&breed_name=Abyssinian`,
    );
  });

  it("should filter cat breeds based on breed_id query param", async () => {
    const Resolved = await Page({
      searchParams: { breed_id: "abys", breed_name: "Abyssinian" },
    });
    render(Resolved);

    expect(screen.getByRole("combobox")).toHaveValue("Abyssinian");

    expect(screen.getByText("Showing 1 result")).toBeInTheDocument();

    expect(screen.getAllByRole("listitem")).toHaveLength(1);

    expect(
      screen.getByRole("heading", {
        name: "Abyssinian",
      }),
    ).toBeInTheDocument();
  });

  it("should load more images when scrolled down the page", async () => {
    server.use(
      http.get(`${API_BASE}/v1/images/search`, (request) => {
        const url = new URL(request.request.url);

        const page = url.searchParams.get("page");

        const initialResponse = getCatImagesResponse.slice(0, 10);
        const loadMoreResponse = getCatImagesResponse.slice(10);

        if (page === "10") {
          return HttpResponse.json(loadMoreResponse);
        }

        return HttpResponse.json(initialResponse);
      }),
    );
    const Resolved = await Page({
      searchParams: { breed_id: "", breed_name: "" },
    });
    render(Resolved);

    expect(screen.getByText("Showing 10 results")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(10);

    // load more action
    mockAllIsIntersecting(true);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    expect(await screen.findByText("Showing 12 results")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(12);
  });
});
