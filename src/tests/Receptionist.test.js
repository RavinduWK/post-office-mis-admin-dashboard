import { render, screen } from "@testing-library/react";
import BillDetails from "../containers/Receptionist/BillDetails";

test("Render BillDetails", () => {
  const start = Date.now();
  render(<BillDetails />);
  const timeTaken = Date.now() - start;
  if (timeTaken > 5000) {
    throw Error("Took too long, " + timeTaken);
  }
});
