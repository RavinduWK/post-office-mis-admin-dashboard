import { render, screen } from "@testing-library/react";
import MailAssignment from "../containers/Supervisor/MailAssignment";

test("Render MailAssignment", () => {
  const start = Date.now();
  render(<MailAssignment />);
  const timeTaken = Date.now() - start;
  if (timeTaken > 5000) {
    throw Error("Took too long, " + timeTaken);
  }
});
