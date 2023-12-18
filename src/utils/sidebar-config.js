import { Link } from "react-router-dom";
import URLS from "../navigation/urls";
import { ReactComponent as DashboardIcon } from "../assets/icons/dashboard.svg";
import { ReactComponent as DoubleUser } from "../assets/icons/double-user.svg";
import { ReactComponent as RightArrow } from "../assets/icons/right-arrow.svg";
import { ReactComponent as LeftArrow } from "../assets/icons/left-arrow.svg";
import { ReactComponent as ReceiptIcon } from "../assets/icons/receipt-icon.svg";
import { ReactComponent as Scale } from "../assets/icons/scale.svg";

const getItem = (label, key, icon, children, type) => {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
};

const adminSidebarMenus = [
  getItem(
    "GENERAL",
    "general",
    null,
    [
      getItem("Dashboard", "dashboard", <DashboardIcon />),
      getItem("Access Management", "access_management", <DoubleUser />),
    ],
    "group"
  ),
  getItem(
    "NP MANAGEMENT",
    "np_management",
    null,
    [
      getItem("Buyer App", "buyer_app"),
      getItem("Seller App", "seller_app"),
      getItem("Settlement Agency", "settlement_agency"),
      getItem("Logistic App", "logistic_app"),
    ],
    "group"
  ),
  getItem(
    "TRANSACTIONS",
    "transactions",
    null,
    [
      getItem("Bank Settlement Transaction", "bank_settlement_transaction"),
      getItem("Outward Transaction", "outward_transaction", <RightArrow />),
      getItem("Inward Transaction", "inward_transaction", <LeftArrow />),
    ],
    "group"
  ),
];

const buyerSidebarMenus = [
  getItem(
    "GENERAL",
    "general",
    null,
    [
      getItem(
        <Link to={`${URLS.BUYER}${URLS.DASHBOARD}`}>Dashboard</Link>,
        URLS.DASHBOARD,
        <DashboardIcon />
      ),
      getItem(
        <Link to={`${URLS.BUYER}${URLS.ACCESS_MANAGEMENT}`}>
          Access Management
        </Link>,
        URLS.ACCESS_MANAGEMENT,
        <DoubleUser />
      ),
    ],
    "group"
  ),
  getItem(
    "TRANSACTIONS",
    "transactions",
    null,
    [
      getItem(
        <Link to={`${URLS.BUYER}${URLS.OUTWARD_TRANSACTIONS}`}>
          Outward Transaction
        </Link>,
        URLS.OUTWARD_TRANSACTIONS,
        <RightArrow />
      ),
      getItem(
        <Link to={`${URLS.BUYER}${URLS.INWARD_TRANSACTIONS}`}>
          Inward Transaction
        </Link>,
        URLS.INWARD_TRANSACTIONS,
        <LeftArrow />
      ),
      getItem(
        <Link to={`${URLS.BUYER}${URLS.PREPARER_TRANSACTIONS}`}>
          Preparer Transaction
        </Link>,
        URLS.PREPARER_TRANSACTIONS,
        <ReceiptIcon />
      ),
      getItem(
        <Link to={`${URLS.BUYER}${URLS.BANK_SETTLEMENT_TRANSACTION}`}>
          Bank Settlement Transaction
        </Link>,
        URLS.BANK_SETTLEMENT_TRANSACTION,
        <Scale />
      ),
    ],
    "group"
  ),
];

const settlementAgencySidebarMenus = [
  getItem(
    "GENERAL",
    "general",
    null,
    [
      getItem(
        <Link to={`${URLS.SETTLEMENT}${URLS.DASHBOARD}`}>Dashboard</Link>,
        URLS.DASHBOARD,
        <DashboardIcon />
      ),
      getItem(
        <Link to={`${URLS.SETTLEMENT}${URLS.ACCESS_MANAGEMENT}`}>
          Access Management
        </Link>,
        URLS.ACCESS_MANAGEMENT,
        <DoubleUser />
      ),
    ],
    "group"
  ),
  getItem(
    "TRANSACTIONS",
    "transactions",
    null,
    [
      getItem(
        <Link to={`${URLS.SETTLEMENT}${URLS.BANK_SETTLEMENT_TRANSACTION}`}>
          Bank Settlement Transaction
        </Link>,
        URLS.BANK_SETTLEMENT_TRANSACTION
      ),
      getItem(
        <Link to={`${URLS.SETTLEMENT}${URLS.OUTWARD_TRANSACTIONS}`}>
          Outward Transaction
        </Link>,
        URLS.OUTWARD_TRANSACTIONS,
        <RightArrow />
      ),
      getItem(
        <Link to={`${URLS.SETTLEMENT}${URLS.INWARD_TRANSACTIONS}`}>
          Inward Transaction
        </Link>,
        URLS.INWARD_TRANSACTIONS,
        <LeftArrow />
      ),
    ],
    "group"
  ),
];

const userRole = (userType) => {
  if (userType === "adminApp") {
    return "RSP";
  } else if (userType === "buyerapp") {
    return "Buyer";
  } else {
    return "Settlement";
  }
};

export {
  adminSidebarMenus,
  buyerSidebarMenus,
  settlementAgencySidebarMenus,
  userRole,
};
