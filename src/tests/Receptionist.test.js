import { render, screen } from '@testing-library/react';
import BillDetails from '../containers/Receptionist/BillDetails';
import BillPayments from '../containers/Receptionist/BillPayments';
import FastTrackCourier from '../containers/Receptionist/FastTrackCourier';
import LogiPost from '../containers/Receptionist/LogiPost';
import MoneyOrder from '../containers/Receptionist/MoneyOrder';
import NormalPost from '../containers/Receptionist/NormalPost';
import PayMoneyOrder from '../containers/Receptionist/PayMoneyOrder';
import RegisteredPost from '../containers/Receptionist/RegisteredPost';

test('Render BillDetails', () => {
  const start = Date.now();
  render(<BillDetails />);
  const timeTaken = Date.now()-start;
  if(timeTaken>5000){
    throw Error('Took too long, ' + timeTaken);
  }
});

/*test('Render BillPayments', () => {
  const start = Date.now();
  render(<BillPayments />);
  const timeTaken = Date.now()-start;
  if(timeTaken>5000){
    throw Error('Took too long, ' + timeTaken);
  }
});

test('Render FastTrackCourier', () => {
  const start = Date.now();
  render(<FastTrackCourier />);
  const timeTaken = Date.now()-start;
  if(timeTaken>5000){
    throw Error('Took too long, ' + timeTaken);
  }
});

test('Render LogiPost', () => {
  const start = Date.now();
  render(<LogiPost />);
  const timeTaken = Date.now()-start;
  if(timeTaken>5000){
    throw Error('Took too long, ' + timeTaken);
  }
});

test('Render MoneyOrder', () => {
  const start = Date.now();
  render(<MoneyOrder />);
  const timeTaken = Date.now()-start;
  if(timeTaken>5000){
    throw Error('Took too long, ' + timeTaken);
  }
});

test('Render NormalPost', () => {
  const start = Date.now();
  render(<NormalPost />);
  const timeTaken = Date.now()-start;
  if(timeTaken>5000){
    throw Error('Took too long, ' + timeTaken);
  }
});*/

/*test('Render PayMoneyOrder', () => {
  const start = Date.now();
  render(<PayMoneyOrder />);
  const timeTaken = Date.now()-start;
  if(timeTaken>5000){
    throw Error('Took too long, ' + timeTaken);
  }
});*/

/*test('Render RegisteredPost', () => {
  const start = Date.now();
  render(<RegisteredPost />);
  const timeTaken = Date.now()-start;
  if(timeTaken>5000){
    throw Error('Took too long, ' + timeTaken);
  }
});*/