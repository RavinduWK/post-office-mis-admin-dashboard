import { render, screen } from '@testing-library/react';
import MonitorPostman from '../containers/Postmaster/MonitorPostman';
import PostOfficeStatistics from '../containers/Postmaster/PostOfficeStatistics';
import RegisterEmployee from '../containers/Postmaster/RegisterEmployee';
import ViewFeedback from '../containers/Postmaster/ViewFeedback';

test('Render MonitorPostman', () => {
  const start = Date.now();
  render(<MonitorPostman />);
  const timeTaken = Date.now()-start;
  if(timeTaken>5000){
    throw Error('Took too long, ' + timeTaken);
  }
});

/*test('Render PostOfficeStatistics', () => {
  const start = Date.now();
  render(<PostOfficeStatistics />);
  const timeTaken = Date.now()-start;
  if(timeTaken>5000){
    throw Error('Took too long, ' + timeTaken);
  }
});*/

/*test('Render RegisterEmployee', () => {
  const start = Date.now();
  render(<RegisterEmployee />);
  const timeTaken = Date.now()-start;
  if(timeTaken>5000){
    throw Error('Took too long, ' + timeTaken);
  }
});

test('Render ViewFeedback', () => {
  const start = Date.now();
  render(<ViewFeedback />);
  const timeTaken = Date.now()-start;
  if(timeTaken>5000){
    throw Error('Took too long, ' + timeTaken);
  }
});*/