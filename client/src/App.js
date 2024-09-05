import logo from './logo.svg';
import './App.css';


import {createBrowserRouter,RouterProvider} from "react-router-dom";
import { TicketsList } from './components/tickets-list/TicketsList';
import { LoginPage } from './components/login-page/LoginPage';
import { useEffect } from 'react';
import axios from 'axios';
import { Navbar } from './components/navbar/Navbar';
import { CreateTicket } from './components/create-ticket/CreateTicket';
import { Order } from './components/order/Order';
import { Orders } from './components/orders/orders';

const router = createBrowserRouter([
  { path:"/order/:id",Component:Order},
  { path:"/create-ticket",Component:CreateTicket},
  { path:"/",Component: TicketsList},
  { path:"/login",Component:LoginPage},
  { path:"/orders",Component:Orders}
])

function App() {
  return (
      <RouterProvider router={router}>
      </RouterProvider>
  );
}

export default App;
