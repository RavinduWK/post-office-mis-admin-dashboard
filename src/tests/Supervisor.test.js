import { render, screen } from '@testing-library/react';
import MailAssignment from '../containers/Supervisor/MailAssignment';
import MailItems from '../containers/Supervisor/MailItems';
import MailTransfer from '../containers/Supervisor/MailTransfer';
import RegisterEmployee from '../containers/Supervisor/RegisterEmployee';

test('Render MailAssignment', () => {
  const start = Date.now();
  render(<MailAssignment />);
  const timeTaken = Date.now()-start;
  if(timeTaken>5000){
    throw Error('Took too long, ' + timeTaken);
  }
});

/*test('Render MailItems', () => {
  const start = Date.now();
  render(<MailItems />);
  const timeTaken = Date.now()-start;
  if(timeTaken>5000){
    throw Error('Took too long, ' + timeTaken);
  }
});

test('Render MailTransfer', () => {
  const start = Date.now();
  render(<MailTransfer />);
  const timeTaken = Date.now()-start;
  if(timeTaken>5000){
    throw Error('Took too long, ' + timeTaken);
  }
});

test('Render RegisterEmployee', () => {
  const start = Date.now();
  render(<RegisterEmployee />);
  const timeTaken = Date.now()-start;
  if(timeTaken>5000){
    throw Error('Took too long, ' + timeTaken);
  }
});*/