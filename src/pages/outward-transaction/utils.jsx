import RSPTag from "../../components/tag/index";
import _ from "lodash";
import { Link } from "react-router-dom";
import { RSPSelect } from "../../components/select";
import { Checkbox, Col } from "antd";

export const CollectorComponent = (value) => {
  // const formatted = value.split("/")[1];
  return <Link>{value}</Link>;
};

export const BankUri = (value) => {
  return <Link>{value}</Link>;
};

export const TagRenderer = ({ condition, value }) => {
  switch (condition) {
    case "SUCCESS":
      return <RSPTag tagColor="success">{_.capitalize(value)}</RSPTag>;

    case "ERROR":
      return <RSPTag tagColor="danger">{_.capitalize(value)}</RSPTag>;

    case "WARNING":
      return <RSPTag tagColor="warning">{_.capitalize(value)}</RSPTag>;

    default:
      return <RSPTag tagColor={"success"}>{_.capitalize(value)}</RSPTag>;
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
        state: "Created",
        collector_app_id: "cloud-adaptor.proteantech.in/kotak",
        receiver_app_id: "stagingapigateway.bizom.in/ondc",
        payout_bank_uri: "https://rsp.somebank.com/rsp/",
        provider_name: "SABJI XPRESS PVT LTD - BANASWADI",
        provider_code: "18275-ONDC-1",
        payment_transaction_id: "6baa811a-6cbe-4ad3-94e9-cbf96aaff343",
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
        settlement_status: "ERROR",
        settlement_ref: "1232424",
        settlement_timestamp: "2022-10-30T07:05:57.454Z",
        order_recon_Status: null,
        payerdetails: {
          payer_name: "“Example1 company Pvt. Ltd",
          payer_address: "string",
          payer_account_no: 509424924294248,
          payer_bank_code: "“HDFC0000000”",
          payer_virtual_payment_address: "80abc@abctMh2h",
        },
        withholding_tax_gst: "10.0 INR",
        withholding_tax_tds: "10.0 INR",
        deduction_by_collector: "10.0 INR",
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
          prev_settlement_reference_no: ["1234ABCD", "2345qwer"],
          diff_amount: "5.0 INR",
          message: {
            name: "string",
            code: "string",
          },
        },
        settlement_id: "21212324",
        transaction_id: "6baa811a-6cbe-4ad3-94e9-cbf96aaff343",
        settlement_Ref_no: "KKIB3718683618631",
        recon_status: "Paid",
        diff_amount: "0",
        counterparty_recon_Status: "Paid",
        counterparty_diff_amount: "0",
        message: null,
        created_at: "2022-10-30T07:05:57.454Z",
        updated_at: "2022-10-30T07:05:57.454Z",
      },
      // {"settlement_status": "Error",},
      // {"settlement_status": "PAID",}
    ],
  },
  message: "Transaction List Fetched successfully",
};

const payerDetails_title_map = {
  payer_name: "PAYER NAME",
  payer_address: "PAYER ADDRESS",
  payer_account_no: "PAYER ACCOUNT NO",
  payer_bank_code: "PAYER BANK CODE",
  payer_virtual_payment_address: "VIRTUAL ADDRESS",
};
const issueInitiator_title_map = {
  issue_initiator_ref: "ISSUE INITIATOR REF",
  issue_responder_ref: "ISSUE RESPONDER REF",
  issue_type: "ISSUE TYPE",
  issue_subtype: "ISSUE SUBTYPE",
  order_id: "ORDER ID",
  order_amount: "ORDER AMOUNT",
  order_correction_amount: "ORDER CORRECTION AMOUNT",
  order_state: "ORDER STATE",
  previous_settled_amount: "PREVIOUS SETTLED AMOUNT",
  prev_settlement_reference_no: "PREVIOUS SETTLED ID'S",
  message: "MESSAGE",
};
export const getModalContent = (key, content) => {
  switch (key) {
    case "payerdetails":
      return content
        ? Object.entries(content).map((subArr) => [
            payerDetails_title_map[subArr[0]],
            subArr[1],
          ])
        : [];

    case "correctionObj": {
      if (content) {
        return Object.entries(content).map((subArr) => {
          if (subArr[0] == "message") {
            return [issueInitiator_title_map[subArr[0]], subArr[1].name];
          } else {
            return [issueInitiator_title_map[subArr[0]], subArr[1]];
          }
        });
      } else {
        return [];
      }
    }
    default: {
      return null;
    }
  }
};

export const bankSettlementTagContent = (field, value) => {
  switch (field) {
    case "remarks":
      return {
        ...(value === "paid" && { condition: "READY", value: value }),
        ...(value === "not-paid" && { condition: "WARNING", value: value }),
      };

    case "settlement_state":
      return {
        ...(value === "settled" && { condition: "READY", value: value }),
        ...(value === "pending" && { condition: "WARNING", value: value }),
        ...(value === "error" && { condition: "ERROR", value: value }),
      };
    default:
      return {};
  }
};

export const getOutwardSettlementTag = (field, value) => {
  switch (field) {
    case "settlement_status":
      return {
        ...(value === "PAYOUT_INITIATED" && {
          condition: "SUCCESS",
          value: value,
        }),
      };

    case "recon_status":
      return {};

    case "counterparty_recon_status":
      return {};

    default:
      return {};
  }
};

export const getInwardSettlementTag = (field, value) => {
  console.log({ field, value });
  switch (field) {
    case "state":
      return {
        ...(value === "Delivered" && { condition: "SUCCESS", value: value }),
      };

    case "settlement_status":
      return {
        ...(value === "PAYOUT_INITIATED" && {
          condition: "WARNING",
          value: "Payout Initiated",
        }),
        ...(value === "PAID" && { condition: "SUCCESS", value: "paid" }),
        ...(value === "READY" && { condition: "INFO", value: "Ready" }),
        ...(value === "ERROR" && { condition: "ERROR", value: "Error" }),
      };

    case "recon_status":
      return {
        ...(value === "Paid" && { condition: "SUCCESS", value: "Paid" }),
      };

    case "counterparty_recon_Status": {
      return {
        ...(value === "Paid" && { condition: "SUCCESS", value: "Paid" }),
      };
    }
    default:
      return {};
  }
};

export const getSettlementIdTag = (field, value) => {
  switch (field) {
    case "remarks":
      return {
        ...(value === "Paid" && { condition: "SUCCESS", value: "Paid" }),
      };

    case "state":
      return {
        ...(value === "Settled" && { condition: "SUCCESS", value: "Paid" }),
        ...(value === "Pending" && { condition: "WARNING", value: "Pending" }),
        ...(value === "Error" && { condition: "ERROR", value: "Error" }),
      };

    default:
      return {};
  }
};

const settlementStatuses = [
  { label: "PAID", key: "PAID", value: "PAID" },
  { label: "READY", key: "READY", value: "READY" },
  {
    label: "PAYOUT INITIATED",
    key: "PAYOUT_INITIATED",
    value: "PAYOUT_INITIATED",
  },
  { label: "ERROR", key: "ERROR", value: "ERROR" },
  { label: "SETTLED", key: "SETTLED", value: "SETTLED" },
  { label: "PENDING", key: "PENDING", value: "PENDING" },
];
const reconStatuses = [
  { label: "Paid", value: "01" },
  { label: "Over Paid", value: "02" },
  { label: "Under Paid", value: "03" },
  { label: "Not Paid", value: "04" },
];

const getCommonFilters = (setQueryParams, prevQueryParams) => [
  <RSPSelect
    options={reconStatuses}
    placeholder="Recon Status"
    variant="transparent"
    onChange={(value) =>
      setQueryParams((queryParams) => ({
        ...queryParams,
        reconStatus: value,
      }))
    }
  />,
  <RSPSelect
    options={settlementStatuses}
    placeholder="Settlement Status"
    variant="transparent"
    onChange={(value) =>
      setQueryParams((queryParams) => ({
        ...queryParams,
        settlementStatus: value,
      }))
    }
  />,
  <Checkbox
    checked={prevQueryParams?.isCorrection}
    onChange={(e) =>
      setQueryParams((queryParams) => ({
        ...queryParams,
        isCorrection: e?.target?.checked,
      }))
    }
  >
    Correction Flow
  </Checkbox>,
];

export const getBuyerAppOutwardFilters = (
  appType,
  setQueryParams,
  prevQueryParams,
  dynamicFilterOpts
) => {
  return (
    <>
      {[
        ...(appType === "buyerapp"
          ? [
              <RSPSelect
                options={dynamicFilterOpts}
                placeholder="Reciever"
                variant="transparent"
                onChange={(value) =>
                  setQueryParams((queryParams) => ({
                    ...queryParams,
                    receiver: value,
                  }))
                }
              />,
            ]
          : []),

        ...getCommonFilters(setQueryParams, prevQueryParams),
      ].map((item) => {
        return <Col>{item}</Col>;
      })}
    </>
  );
};
export const getBuyerAppInwardFilters = (
  appType,
  setQueryParams,
  prevQueryParams,
  dynamicFilterOpts
) => {
  return (
    <>
      {[
        ...(appType === "buyerapp"
          ? [
              <RSPSelect
                options={dynamicFilterOpts}
                placeholder="Collector"
                variant="transparent"
                onChange={(value) =>
                  setQueryParams((queryParams) => ({
                    ...queryParams,
                    collector: value,
                  }))
                }
              />,
            ]
          : []),

        ...getCommonFilters(setQueryParams, prevQueryParams),
      ].map((item) => {
        return <Col>{item}</Col>;
      })}
    </>
  );
};
