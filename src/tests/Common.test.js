import { render, screen } from "@testing-library/react";
import ConfirmationPage from "../containers/Common/ConfirmationPage";
import Dashboard from "../containers/Common/Dashboard";
import DashboardPostmaster from "../containers/Common/DashboardPostmaster";
import DashboardRecipient from "../containers/Common/DashboardRecipient";
import DashboardSupervisor from "../containers/Common/DashboardSupervisor";
import Login from "../containers/Common/login";
import ProfilePage from "../containers/Common/ProfilePage";
import Success from "../containers/Common/Success";

test("Render ConfirmationPage", () => {
  const start = Date.now();
  render(<ConfirmationPage />);
  const timeTaken = Date.now() - start;
  if (timeTaken > 5000) {
    throw Error("Took too long, " + timeTaken);
  }
});

/*test('Render Dashboard', () => {
  const start = Date.now();
  render(<Dashboard />);
  const timeTaken = Date.now()-start;
  if(timeTaken>5000){
    throw Error('Took too long, ' + timeTaken);
  }
});

test('Render DashboardPostmaster', () => {
  const start = Date.now();
  render(<DashboardPostmaster />);
  const timeTaken = Date.now()-start;
  if(timeTaken>5000){
    throw Error('Took too long, ' + timeTaken);
  }
});

test('Render DashboardRecipient', () => {
  const start = Date.now();
  render(<DashboardRecipient />);
  const timeTaken = Date.now()-start;
  if(timeTaken>5000){
    throw Error('Took too long, ' + timeTaken);
  }
});

test('Render DashboardSupervisor', () => {
  const start = Date.now();
  render(<DashboardSupervisor />);
  const timeTaken = Date.now()-start;
  if(timeTaken>5000){
    throw Error('Took too long, ' + timeTaken);
  }
});

test('Render Login', () => {
  const start = Date.now();
  render(<Login />);
  const timeTaken = Date.now()-start;
  if(timeTaken>5000){
    throw Error('Took too long, ' + timeTaken);
  }
});

test('Render ProfilePage', () => {
  const start = Date.now();
  render(<ProfilePage />);
  const timeTaken = Date.now()-start;
  if(timeTaken>5000){
    throw Error('Took too long, ' + timeTaken);
  }
});

test('Render Success', () => {
  const start = Date.now();
  render(<Success />);
  const timeTaken = Date.now()-start;
  if(timeTaken>5000){
    throw Error('Took too long, ' + timeTaken);
  }
});*/
