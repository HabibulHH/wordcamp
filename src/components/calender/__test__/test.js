import { cleanup, render } from "@testing-library/react";
import axios from "axios";
import React from "react";
import { unmountComponentAtNode } from "react-dom";
import Calender from "../";
// user.test.js

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

jest.mock("axios");

afterEach(cleanup);

it("renders Calender correctly", async () => {
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
  });
  const { getByTestId, asFragment } = render(<Calender />);
});

// it("renders  events data", () => {
//   const fakeEvents = [
//     {
//       title: "Mock title",
//       start: "1624492800",
//       end: "1624665600",
//       id: "34343444",
//       location: "USA",
//       url: "https:demo/link#3w4/s",
//     },
//   ];
//   axiosMock.get.mockResolvedValue({ data: fakeEvents });
//   // Cache original functionality
//   const realUseState = React.useState;

//   // Stub the initial state
//   const stubInitialState = fakeEvents;

//   // Mock useState before rendering your component
//   jest
//     .spyOn(React, "useState")
//     .mockImplementationOnce(() => realUseState(stubInitialState));

//   act(() => {
//     ReactDOM.render(<Calender />, container);
//   });

//   expect(axiosMock.get).toHaveBeenCalledTimes(1);
//   expect(axiosMock.get).toHaveBeenCalledWith(
//     `https://central.wordcamp.org/?rest_route=/wp/v2/wordcamps&_embed&per_page=10&page=${1}`
//   );
// });
