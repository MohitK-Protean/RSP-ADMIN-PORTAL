import { Col, Row } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RSPButton from "../../components/button";
import { RSPDatePicker } from "../../components/date-picker";
import RSPInput from "../../components/input";
import { RSPSelect } from "../../components/select";
import RSPTable from "../../components/table";
import AuthContext from "../../context/auth-context";
import URLS from "../../navigation/urls";
import { exportCSV } from "../../utils/helper";
import {
  bankSettlementTagContent,
  BankUri,
  CollectorComponent,
  TagRenderer,
} from "../outward-transaction/utils";

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

const genQueryString = (queryParams) =>
  Object.keys(queryParams)
    .map((key) => {
      return key + "=" + queryParams[key];
    })
    .join("&");

export const BankSettlementTransaction = () => {
  const [bankSettlementTransaction, setBankSettlementTransaction] = useState();
  const [isGeneratingBreakup, setIsGeneratingBreakup] = useState(false);
  const fromDate = dayjs().subtract(4, "month");
  const today = dayjs();
  const [dates, setDates] = useState({
    fromDate: fromDate.format("YYYY/M/D"),
    toDate: today.format("YYYY/M/D"),
  });
  const authContext = useContext(AuthContext);
  const [paginationData, setPaginationData] = useState({
    totalPages: 1,
    totalItems: 0,
    itemPerPage: 10,
    count: 0,
    currentPageNumber: 1,
  });
  const [queryParams, setQueryParams] = useState({});
  const [dynamicFilterOpts, setDynamicFilterOpts] = useState([]);
  const [searchPhase, setSearchPhase] = useState("");

  const columns = [
    {
      key: "payer_name",
      dataIndex: "payer_name",
      title: "PAYER NAME",
      render: (val) => (
        <Link to={`${URLS.TRANSACTION_DETAILS}${URLS.BUYER}`}>{val}</Link>
      ),
    },
    {
      key: "payer_address",
      dataIndex: "payer_address",
      title: "PAYER ADDRESS",
    },
    {
      dataIndex: "payer_account_no",
      title: "PAYER ACCOUNT NO",
      render: CollectorComponent,
    },
    {
      key: "payer_bank_code",
      dataIndex: "payer_bank_code",
      title: "PAYER BANK CODE",
      render: BankUri,
    },
    {
      key: "payer_bank_code",
      dataIndex: "payer_bank_name",
      title: "PAYER BANK NAME",
      render: BankUri,
    },
    {
      key: "payer_bank_code",
      dataIndex: "payer_branch_name",
      title: "PAYER BRANCH NAME",
      render: BankUri,
    },
    {
      key: "payer_virtual_payment_address",
      dataIndex: "payer_virtual_payment_address",
      title: "PAYER VIRTUAL PAYMENT ADDRESS",
      render: BankUri,
    },
    {
      key: "settlement_amount",
      dataIndex: "settlement_amount",
      title: "AMOUNT",
    },
    { key: "timestamp", dataIndex: "timestamp", title: "TIMESTAMP" },
    { key: "payee_name", dataIndex: "payee_name", title: "PAYEE NAME" },
    {
      key: "payee_address",
      dataIndex: "payee_address",
      title: "PAYEE ADDRESS",
    },
    {
      key: "payee_account_no",
      dataIndex: "payee_account_no",
      title: "PAYEE ACCOUNT NO",
    },
    {
      key: "payee_bank_code",
      dataIndex: "payee_bank_code",
      title: "PAYEE BANK CODE",
    },
    {
      key: "payee_upi_address",
      dataIndex: "payee_upi_address",
      title: "PAYEE VIRTUAL PAYMENT ADDRESS",
    },
    {
      key: "payment_type",
      dataIndex: "payment_type",
      title: "PAYMENT TYPE",
    },
    { key: "purpose_code", dataIndex: "purpose_code", title: "PURPOSE CODE" },
    { key: "bankName", dataIndex: "bank_name", title: "PAYEE ACCOUNT TYPE" }, // not mentioned in api response
    {
      key: "remarks",
      dataIndex: "remarks",
      title: "REMARKS",
      render: (value) =>
        TagRenderer(bankSettlementTagContent("remarks", value)),
    },
    {
      key: "settlement_id",
      dataIndex: "settlement_id",
      title: "SETTLEMENT ID",
      render: (value) => {
        const redirectPath = `${
          authContext.userDetails.type === "buyerapp"
            ? URLS.BUYER
            : URLS.SETTLEMENT
        }${URLS.OUTWARD_TRANSACTIONS}:${value}`;
        return <Link to={redirectPath}>{value}</Link>;
      },
    },
    {
      key: "settlement_state",
      dataIndex: "settlement_state",
      title: "STATE",
      render: (value) =>
        TagRenderer(bankSettlementTagContent("settlement_state", value)),
    },
    {
      key: "settlement_timestamp",
      dataIndex: "settlement_timestamp",
      title: "PREVIOUS SETTLEMENT REFERENCE NUMBER",
    },
    {
      key: "settlement_Ref_no",
      dataIndex: "settlement_Ref_no",
      title: "SETTLEMENT REF NUMBER",
    },
    {
      key: "error_code",
      dataIndex: "error_code",
      title: "ERROR CODE",
    },
    {
      key: "error_name",
      dataIndex: "error_name",
      title: "ERROR MESSAGE",
    },
  ];

  useEffect(() => {
    var config = {
      method: "GET",
      url: `/admin/misc/applist?Type=all`,
      headers: {
        "Content-Type": "application/json",
        Authorization: authContext.token,
      },
    };
    (async () => {
      const response = await axios(config);
      setDynamicFilterOpts(
        response.data.body.map((app) => ({
          label: app?.appName,
          value: app?.id,
        }))
      );
    })();
  }, []);

  useEffect(() => {
    var config = {
      method: "GET",
      url: `/admin/rspadmin/banksettlement?fromDate=${dates.fromDate}&toDate=${
        dates.toDate
      }&${genQueryString(queryParams)}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: authContext.token,
      },
    };

    axios(config)
      .then(function (response) {
        setBankSettlementTransaction(response?.data?.body?.data);
        const {
          totalItems = 30,
          itemsPerPage = 0,
          count = 0,
        } = response?.data?.body;
        setPaginationData((prevState) => ({
          ...prevState,
          totalItems,
          itemsPerPage,
          count,
        }));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [queryParams, dates, paginationData.currentPageNumber]);

  const downloadFile = async (fileType) => {
    var config = {
      method: "GET",
      url: `/admin/rspadmin/banksettlement?fromDate=${dates.fromDate}&toDate=${dates.toDate}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: authContext.token,
      },
    };
    const response = await axios(config);
    exportCSV(fileType, response.data.body.data, "demoFile");
  };
  const generateBreakUp = () => {
    setIsGeneratingBreakup(true);
    const config = {
      method: "GET",
      url: `/admin/rspadmin/banksettlement/order-id?fromDate=${
        dates.fromDate
      }&toDate=${dates.toDate}&${genQueryString(queryParams)}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: authContext.token,
      },
      responseType: "blob",
    };
    axios(config)
      .then((res) => {
        if (res?.data) {
          let filename = "breakup.xlsx";
          var a = document.createElement("a");
          document.body.appendChild(a);
          a.style = "display: none";
          a = document.createElement("a");
          a.href = window.URL.createObjectURL(res?.data);
          a.download = filename;
          a.style.display = "none";
          document.body.appendChild(a);
          a.click();
        }
      })
      .finally(() => setIsGeneratingBreakup(false));
  };
  const bankSettlementFilters = [
    <RSPSelect
      options={settlementStatuses}
      placeholder="Settlement Status"
      variant="transparent"
      onChange={(value) =>
        setQueryParams({ ...queryParams, settlementStatus: value })
      }
    />,
    <RSPSelect
      options={dynamicFilterOpts}
      placeholder="Collector App"
      variant="transparent"
      onChange={(value) =>
        setQueryParams({ ...queryParams, settlementStatus: value })
      }
    />,
    <RSPSelect
      options={dynamicFilterOpts}
      placeholder="Receiver App"
      variant="transparent"
      onChange={(value) =>
        setQueryParams({ ...queryParams, settlementStatus: value })
      }
    />,
  ];

  return (
    <>
      <Row>
        <Col span={authContext.userDetails.type === "buyerapp" ? 19 : 21}>
          <h2 className="heading-bold">Bank Settlement Transaction</h2>
        </Col>
        <Col
          span={2}
          style={{ display: "flex", columnGap: "16px", marginRight: "32px" }}
        >
          <RSPButton type="secondary" onClick={() => downloadFile("XLSX")}>
            Download XLS
          </RSPButton>
        </Col>
        {authContext.userDetails.type === "buyerapp" && (
          <Col
            span={1}
            style={{ display: "flex", columnGap: "16px", marginRight: "16px" }}
          >
            <RSPButton
              disabled={isGeneratingBreakup}
              type="secondary"
              onClick={() => generateBreakUp()}
            >
              Generate Breakup
            </RSPButton>
          </Col>
        )}
      </Row>
      <Row style={{ display: "flex", alignItems: "center", columnGap: "16px" }}>
        <Col span={8}>
          <RSPInput
            variant="input"
            style={{ height: "36px" }}
            placeholder="Search Settlement Ref. Number..."
            value={searchPhase}
            onChange={(e) => setSearchPhase(e?.target?.value)}
            onKeyDown={(e) => {
              if (e?.key === "Enter") {
                setQueryParams({
                  ...queryParams,
                  search_phrase: e?.target?.value,
                });
              }
            }}
          />
        </Col>
        {[
          <RSPDatePicker
            callback={(evnt) => {
              const modifiedFromDate = Object.values(evnt.fromDate).join("/");
              const modifiedToDate = Object.values(evnt.toDate).join("/");
              setDates({
                fromDate: modifiedFromDate,
                toDate: modifiedToDate,
              });
            }}
            showPicker
            defaultPickerValue={[fromDate, today]}
            defaultValue={[fromDate, today]}
          />,
        ].map((item) => {
          return <Col>{item}</Col>;
        })}

        {bankSettlementFilters.map((item) => {
          return <Col>{item}</Col>;
        })}
      </Row>
      {columns && (
        <RSPTable
          columns={columns}
          dataSource={bankSettlementTransaction}
          scroll={{ x: "max-content" }}
        />
      )}
    </>
  );
};
