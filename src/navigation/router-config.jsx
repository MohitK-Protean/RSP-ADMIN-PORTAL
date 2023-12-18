import Login from "../pages/login";
import { Route, Routes } from "react-router-dom";
import URLS from "./urls";
import ForgotPassword from "../pages/forgot-password";
import BuyerDashboard from "../pages/dashboard/buyer";
import SettlementAgencyDashboard from "../pages/dashboard/settlement-agency";
import RSPLayout from "../components/layout";
import {
  adminSidebarMenus,
  buyerSidebarMenus,
  settlementAgencySidebarMenus,
} from "../utils/sidebar-config";
import { InwardTransaction } from "../pages/inward-transaction";
import { OutWardTransaction } from "../pages/outward-transaction";
import { PreparerTransaction } from "../pages/preparer-transaction";
import TransactionDetails from "../pages/transaction-details";
import AdminDashboard from "../pages/dashboard/admin";
import AccessManagement from "../pages/access-mangement";
import ResetPassword from "../pages/reset-password";
import Protected from "../components/protected";
import RequireAuth from "../components/protected/requireAuth";
import { BankSettlementTransaction } from "../pages/bank-settlement-transactions";

const Routers = () => {
  return (
    <Routes>
      {/* <Route path={URLS.ROOT} element={<Sample />} />  */}
      <Route path={URLS.LOGIN} element={<Login />} />
      <Route path={URLS.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={URLS.RESET_PASSWORD} element={<ResetPassword />} />

      {/* below are protected routes */}
      <Route element={<Protected />}>
        {/* RSP Admin routes */}
        <Route element={<RequireAuth allowedAppType="adminApp" />}>
          <Route
            path={`${URLS.DASHBOARD}${URLS.ADMIN}`}
            element={
              <RSPLayout menuItems={adminSidebarMenus}>
                <AdminDashboard />
              </RSPLayout>
            }
          />
        </Route>
        <Route element={<RequireAuth allowedAppType="buyerapp" />}>
          {/* Buyer App routes */}

          <Route
            path={`${URLS.BUYER}${URLS.BANK_SETTLEMENT_TRANSACTION}`}
            element={
              <RSPLayout menuItems={buyerSidebarMenus}>
                <BankSettlementTransaction />
              </RSPLayout>
            }
          />

          <Route
            path={`${URLS.BUYER}${URLS.DASHBOARD}`}
            element={
              <RSPLayout menuItems={buyerSidebarMenus}>
                <BuyerDashboard />
              </RSPLayout>
            }
          />
          <Route
            path={`${URLS.BUYER}${URLS.INWARD_TRANSACTIONS}`}
            element={
              <RSPLayout menuItems={buyerSidebarMenus}>
                <InwardTransaction />
              </RSPLayout>
            }
          />
          <Route
            path={`${URLS.BUYER}${URLS.OUTWARD_TRANSACTIONS}:transactionId`}
            element={
              <RSPLayout menuItems={buyerSidebarMenus}>
                <OutWardTransaction />
              </RSPLayout>
            }
          />
          <Route
            path={`${URLS.BUYER}${URLS.OUTWARD_TRANSACTIONS}`}
            element={
              <RSPLayout menuItems={buyerSidebarMenus}>
                <OutWardTransaction />
              </RSPLayout>
            }
          />
          <Route
            path={`${URLS.BUYER}${URLS.PREPARER_TRANSACTIONS}`}
            element={
              <RSPLayout menuItems={buyerSidebarMenus}>
                <PreparerTransaction />
              </RSPLayout>
            }
          />
          <Route
            path={`${URLS.BUYER}${URLS.ACCESS_MANAGEMENT}`}
            element={
              <RSPLayout menuItems={buyerSidebarMenus}>
                <AccessManagement />
              </RSPLayout>
            }
          />
        </Route>

        {/* Settlement agency routes */}
        <Route element={<RequireAuth allowedAppType="settlementagency" />}>
          <Route
            path={`${URLS.TRANSACTION_DETAILS}${URLS.SETTLEMENT}:slug`}
            element={
              <RSPLayout menuItems={buyerSidebarMenus}>
                <TransactionDetails />
              </RSPLayout>
            }
          />
          <Route
            path={`${URLS.SETTLEMENT}${URLS.DASHBOARD}`}
            element={
              <RSPLayout menuItems={settlementAgencySidebarMenus}>
                <SettlementAgencyDashboard />
              </RSPLayout>
            }
          />
          <Route
            path={`${URLS.SETTLEMENT}${URLS.INWARD_TRANSACTIONS}`}
            element={
              <RSPLayout menuItems={settlementAgencySidebarMenus}>
                <InwardTransaction />
              </RSPLayout>
            }
          />
          <Route
            path={`${URLS.SETTLEMENT}${URLS.INWARD_TRANSACTIONS}:transactionId`}
            element={
              <RSPLayout menuItems={settlementAgencySidebarMenus}>
                <InwardTransaction />
              </RSPLayout>
            }
          />
          <Route
            path={`${URLS.SETTLEMENT}${URLS.OUTWARD_TRANSACTIONS}`}
            element={
              <RSPLayout menuItems={settlementAgencySidebarMenus}>
                <OutWardTransaction />
              </RSPLayout>
            }
          />
          <Route
            path={`${URLS.SETTLEMENT}${URLS.OUTWARD_TRANSACTIONS}:transactionId`}
            element={
              <RSPLayout menuItems={settlementAgencySidebarMenus}>
                <OutWardTransaction />
              </RSPLayout>
            }
          />
          <Route
            path={`${URLS.SETTLEMENT}${URLS.BANK_SETTLEMENT_TRANSACTION}`}
            element={
              <RSPLayout menuItems={settlementAgencySidebarMenus}>
                <BankSettlementTransaction />
              </RSPLayout>
            }
          />
          <Route
            path={`${URLS.SETTLEMENT}${URLS.ACCESS_MANAGEMENT}`}
            element={
              <RSPLayout menuItems={settlementAgencySidebarMenus}>
                <AccessManagement />
              </RSPLayout>
            }
          />
        </Route>

        {/* Transaction Logs */}
        <Route
          path={`${URLS.TRANSACTION_DETAILS}${URLS.BUYER}${URLS.ROOT}:slug`}
          element={
            <RSPLayout menuItems={buyerSidebarMenus}>
              <TransactionDetails />
            </RSPLayout>
          }
        />
      </Route>
      {/* end of protected routes */}
    </Routes>
  );
};

export default Routers;
