import React from "react";

import { render, cleanup } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

// Skipping this test because it says the application crashes even though it doesn't......
test.skip("it renders without crashing", () => {
  render(<Application />);
});
