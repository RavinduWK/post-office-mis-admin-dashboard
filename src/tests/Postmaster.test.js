import { render, screen } from "@testing-library/react";
import MonitorPostman from "../containers/Postmaster/MonitorPostman";

test("Render MonitorPostman", () => {
  const start = Date.now();
  render(<MonitorPostman />);
  const timeTaken = Date.now() - start;
  if (timeTaken > 5000) {
    throw Error("Took too long, " + timeTaken);
  }
});
