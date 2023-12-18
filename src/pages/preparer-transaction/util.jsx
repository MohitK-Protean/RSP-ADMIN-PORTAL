import RSPTag from "../../components/tag";
import _ from "lodash";
import { Link } from "react-router-dom";

export const CollectorComponent = (value) => {
  const formatted = value.split("/")[1];
  return <Link>{formatted}</Link>;
};

export const BankUri = (value) => {
  const formatted = value.split(".")[1];
  return <Link>{formatted}</Link>;
};

export const SettlementStatus = (value) => {
  //  need to check statuses with BE team
  switch (value) {
    case "READY":
      return <RSPTag tagColor="success">{_.capitalize(value)}</RSPTag>;

    case "ERROR":
      return <RSPTag tagColor="danger">{_.capitalize(value)}</RSPTag>;

    case "PAYOUT INITIATED":
      return <RSPTag tagColor="warning">{_.capitalize(value)}</RSPTag>;

    default:
      return <RSPTag tagColor="success">{_.capitalize(value)}</RSPTag>;
  }
};

export const mockedResponse = {
  status: "SUCCESS",
  body: {
    count: 11,
    totalItems: 11,
    currentPage: 1,
    itemPerPage: 4,
    totalPages: 3,
    currentItemCount: 3,
    lastPage: false,
    data: [
      {
        id: "K106403902112759",
        invoice_no: "INV106403902112759",
        state: "Delivered",
        collector_app_id: "cloud-adaptor.proteantech.in/kotak",
        receiver_app_id: "stagingapigateway.bizom.in/ondc",
        payout_bank_uri: "https://rsp.somebank.com/rsp/",
        provider_name: "SABJI XPRESS PVT LTD - BANASWADI",
        provider_code: "18275-ONDC-1",
        transaction_id: "6baa811a-6cbe-4ad3-94e9-cbf96aaff343",
        order_amount: "500.0 INR",
        collected_by: "BAP",
        buyer_app_finder_fee: "5.0 INR",
        settlement_counterparty: "buyer",
        settlement_amount: 0,
        settlement_type: "neft",
        settlement_bank_account_no: "99679007677676",
        settlement_ifsc_code: "HDFC900008",
        upi_address: "string",
        bank_name: "HDFC",
        branch_name: "Delhi",
        beneficiary_address: "delhi",
        settlement_status: "READY",
        withholding_tax_gst: "10.0 INR",
        withholding_tax_tds: "10.0 INR",
        deduction_by_collector: "10.0 INR",
        payerdetails: {},
        settlement_reason_code: "01",
        correction: {
          issue_initiator_ref: "1243242GQT$",
          issue_responder_ref: "122424HGYG98",
          issue_type: "01",
          issue_subtype: "01",
          order_id: "string",
          order_amount: "5.0 INR",
          order_correction_amount: "5.0 INR",
          order_state: "string",
          previous_settled_amount: "5.0 INR",
          settlement_id: "121313",
          settlement_reference_no: "3718683618631",
          prev_settlement_reference_no: ["1234ABCD", "2345qwer"],
          recon_status: "01",
          diff_amount: "5.0 INR",
          message: {
            name: "string",
            code: "string",
          },
        },
        sent_for_recon: "true",
        created_at: "2022-10-30T07:05:57.454Z",
        updated_at: "2022-10-30T07:05:57.454Z",
      },
    ],
  },
  message: "Preparer Transaction  Fetched successfully",
};
