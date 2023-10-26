import GridViewIcon from "@mui/icons-material/GridView";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";
import { Package, SignOut } from "phosphor-react";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import RouteIcon from "@mui/icons-material/Route";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import { Truck } from "phosphor-react";

export const receptionistMenuItems = [
  {
    title: null,
    items: [
      {
        title: "Dashboard",
        to: "/receptionist/",
        icon: <GridViewIcon />,
      },
    ],
  },
  {
    title: "Postal Services",
    items: [
      {
        title: "Normal Post",
        to: "/receptionist/normal-post",
        icon: <MailOutlineIcon />,
      },
      {
        title: "Registered Post",
        to: "/receptionist/registered-post",
        icon: <MailOutlineIcon />,
      },
      {
        title: "Logi Post",
        to: "/receptionist/logi-post",
        icon: <Package size={20} />,
      },
      {
        title: "Fast Track Courier",
        to: "/receptionist/fast-track-courier",
        icon: <Inventory2OutlinedIcon />,
      },
      {
        title: "Money Order",
        to: "/receptionist/money-order",
        icon: <PaymentsOutlinedIcon />,
      },
      {
        title: "Pay Money Order",
        to: "/receptionist/pay-money-order",
        icon: <CreditScoreOutlinedIcon />,
      },
    ],
  },
  {
    title: "Other Services",
    items: [
      {
        title: "Bill Payments",
        to: "/receptionist/bill-payments",
        icon: <ReceiptOutlinedIcon />,
      },
    ],
  },
];

export const postmasterMenuItems = [
  {
    title: null,
    items: [
      {
        title: "Dashboard",
        to: "/postmaster/",
        icon: <GridViewIcon />,
      },
    ],
  },
  {
    title: null,
    items: [
      {
        title: "Live Delivery Map",
        to: "/postmaster/live-delivery-map",
        icon: <MapOutlinedIcon />,
      },
      {
        title: "Register Employee",
        to: "/postmaster/register-employee",
        icon: <HowToRegIcon />,
      },
      {
        title: "View Feedback",
        to: "/postmaster/feedback",
        icon: <FeedbackOutlinedIcon />,
      },
      {
        title: "View Statistics",
        to: "/postmaster/statistics",
        icon: <QueryStatsOutlinedIcon />,
      },
    ],
  },
];

export const supervisorMenuItems = [
  {
    title: null,
    items: [
      {
        title: "Dashboard",
        to: "/supervisor/",
        icon: <GridViewIcon />,
      },
    ],
  },
  {
    title: null,
    items: [
      {
        title: "Register Employee",
        to: "/supervisor/register-employee",
        icon: <HowToRegIcon />,
      },
      {
        title: "Mail Assignments",
        to: "/supervisor/mail-assignment",
        icon: <AssignmentTurnedInOutlinedIcon />,
      },
      {
        title: "Mail Items",
        to: "/supervisor/mail-items",
        icon: <ChecklistRtlIcon />,
      },
      {
        title: "Mail Transfer",
        to: "/supervisor/mail-transfer",
        icon: <Truck size={25} />,
      },
      {
        title: "Add Route",
        to: "/supervisor/add-route",
        icon: <RouteIcon size={25} />,
      },
    ],
  },
];
