import { screen } from "@testing-library/dom";
import { cleanup, render } from "@testing-library/react";
import axios from "axios";
import React from "react";
import { unmountComponentAtNode } from "react-dom";
import Calender from "../";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

jest.mock("axios");

afterEach(cleanup);

it("renders calender correctly", async () => {
  const fakeEvents = [
    {
      title: "Mock title",
      start: "1624492800",
      end: "1624665600",
      id: "34343444",
      location: "USA",
      url: "https:demo/link#3w4/s",
    },
  ];
  axios.get.mockResolvedValue({
    data: fakeEvents,
    headers: { "x-wp-totalpages": 11 },
  });
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, "useState");
  useStateSpy.mockImplementation((init) => [init, setState]);
  const { getByTestId, asFragment } = render(<Calender />);
  expect(asFragment()).toMatchSnapshot();
  expect(screen.getByTestId("spinner"));
});
