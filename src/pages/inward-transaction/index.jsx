import {Col, Row } from "antd";
import React, { useEffect } from "react";
import { RSPDatePicker } from "../../components/date-picker";
import RSPInput from "../../components/input";
import RSPTable from "../../components/table";
import { CollectorComponent,BankUri,TagRenderer, getModalContent, getInwardSettlementTag, getBuyerAppOutwardFilters, getBuyerAppInwardFilters } from "../outward-transaction/utils";
import RSPButton from "../../components/button";

import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import AuthContext from "../../context/auth-context";
import { checkIfFull, exportCSV } from "../../utils/helper";
import { RSPModal } from "../../components/modal";
import { Link } from "react-router-dom";
import URLS from "../../navigation/urls";
import dayjs from "dayjs";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import _ from "lodash";

export const InwardTransaction = () => {
  const [queryParams, setQueryParams] = useState({ isCorrection: false });
  const [settlementId, setSettlementId] = useState("");
  const [inwardTransactions, setInwardTransaction] = useState();
  const [modalContent,setModalContent]=useState();
  const fromDate=dayjs().subtract(4,'month')
  const today=dayjs()
  const [dates,setDates]=useState({fromDate:fromDate.format('YYYY/M/D'),toDate:today.format('YYYY/M/D'),});
  const authContext=useContext(AuthContext)
  const [paginationData,setPaginationData]=useState({totalPages:1,totalItems:0,itemPerPage:10,count:0,currentPageNumber:1});
  const [dynamicFilterOpts, setDynamicFilterOpts] = useState([]);

  useEffect(() => {
    const queryString = Object.keys(queryParams)
      .map((key) => {
        return key + "=" + queryParams[key];
      })
      .join("&");

    var config = {
      method: "GET",
      url: `/admin/rspadmin/inwardtransaction?fromDate=${dates.fromDate}&toDate=${dates.toDate}&${queryString}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: authContext.token,
      },
    };

    axios(config)
      .then(function (response) {
        setInwardTransaction(response?.data?.body?.data);
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
      url: `/admin/rspadmin/inwardtransaction?fromDate=${dates.fromDate}&toDate=${dates.toDate}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: authContext.token,
      },
    };
    const response = await axios(config);
    exportCSV(fileType, response.data.body.data, "inwardTransactions");
  };
  const showModalContent = (key, value) => {
    const modifiedContent = getModalContent(key, value);
    setModalContent(modifiedContent);
  };
  const columns = [
    {
      key: "id",
      dataIndex: "id",
      title: "ORDER ID",
      render: (val) => (
        <Link to={`${URLS.TRANSACTION_DETAILS}${URLS.BUYER}`}>{val}</Link>
      ),
    },
    { key: "", dataIndex: "invoice_no", title: "INVOICE NUMBER" },
    {
      key: "",
      dataIndex: "collector_app_id",
      title: "COLLECTOR",
      render: CollectorComponent,
    },
    {
      key: "reciver",
      dataIndex: "receiver_app_id",
      title: "RECEIVER",
      render: BankUri,
    },
    {
      key: "payoutBank",
      dataIndex: "payout_bank_uri",
      title: "PAYOUT BANK",
      render: BankUri,
    },
    {
      key: "orderState",
      dataIndex: "state",
      title: "ORDER STATE",
      render: (value) => TagRenderer(getInwardSettlementTag("state", value)),
    },
    { key: "providerName", dataIndex: "provider_name", title: "PROVIDER NAME" },
    { key: "providerCode", dataIndex: "provider_code", title: "PROVIDER CODE" },
    {
      key: "transactionId",
      dataIndex: "payment_transaction_id",
      title: "TRANSACTION ID",
    },
    { key: "orderAmt", dataIndex: "order_amount", title: "ORDER AMOUNT" },
    { key: "collectedBy", dataIndex: "collected_by", title: "COLLECTED BY" },
    {
      key: "buyerAppFinderFee",
      dataIndex: "buyer_app_finder_fee",
      title: "BUYER APP FINDER FEE",
    },
    {
      key: "settleMentCounterParty",
      dataIndex: "settlement_counterparty",
      title: "SETTLEMENT COUNTER PARTY",
    },
    {
      key: "settleMentTYpe",
      dataIndex: "settlement_type",
      title: "SETTLEMENT TYPE",
    },
    {
      key: "settleMentBankAccountNumber",
      dataIndex: "settlement_bank_account_no",
      title: "SETTLEMENT BANK ACCOUNT NUMBER",
    },
    {
      key: "settleMentIFSCcode",
      dataIndex: "settlement_ifsc_code",
      title: "SETTLEMENT IFSC CODE",
    },
    { key: "upiAddr", dataIndex: "upi_address", title: "UPI ADDRESS" },
    { key: "bankName", dataIndex: "bank_name", title: "BANK NAME" },
    { key: "branchName", dataIndex: "branch_name", title: "BRANCH NAME" },
    {
      key: "beneficaryAddr",
      dataIndex: "beneficiary_address",
      title: "BENEFICARY ADDRESS",
    },
    {
      key: "settlementStatus",
      dataIndex: "settlement_status",
      title: "SETTLEMENT STATUS",
      render: (value) =>
        TagRenderer(getInwardSettlementTag("settlement_status", value)),
    },
    {
      key: "settlementTmsp",
      dataIndex: "settlement_timestamp",
      title: "SETTLEMENT TIMESTAMP",
    },
    {
      key: "withHoldingTaxGSTAmt",
      dataIndex: "withholding_tax_gst",
      title: "WITHHOLDING TAX GST",
      render:(value)=>(<p>{ Number(value) ?`INR ${value}`:''}</p>)
    },
    {
      key: "withHoldingTaxTDSAmt",
      dataIndex: "withholding_tax_tds",
      title: "WITHHOLDING TAX TDS",
      render:(value)=>(<p>{ Number(value) ?`INR ${value}`:''}</p>)
    },
    {
      key: "deductionByCollectorAmt",
      dataIndex: "deduction_by_collector",
      title: "DEDUCTION BY COLLECTOR",
      render:(value)=>(<p>{ Number(value) ?`INR ${value}`:''}</p>)
    },
    {
      key: "orderRecStatus",
      dataIndex: "order_recon_Status",
      title: "ORDER REC STATUS",
    },
    {
      key: "payerDetailsDto",
      dataIndex: "payerDetailsDto",
      title: "PAYER DETAILS",
      render: (value = {}) => {
        const isDisabled = !checkIfFull(Object.values(value));
        return (
          <RSPButton
            type="link"
            disabled={isDisabled}
            onClick={() => showModalContent("payerdetails", value)}
          >
            View
          </RSPButton>
        );
      },
    },
    {
      key: "settlementReasonCode",
      dataIndex: "settlement_reason_code",
      title: "SETTLEMENT REASON CODE",
    },
    {
      key: "isCorrection",
      dataIndex: "",
      title: "IS CORRECTION",
      render: (value, row) => {
        return _.capitalize(checkIfFull(Object.values(row?.correctionDtoNew)));
      },
    },
    {
      key: "correctionObject",
      dataIndex: "correction",
      title: "CORRECTION OBJECT",
      render:(value={})=>{ 
        const isDisabled=checkIfFull(value)
        return(
          isDisabled && <RSPButton type="link" onClick={()=>showModalContent('correctionObj',value)}>View</RSPButton>
    )},
    },
    {
      key: "transactionId",
      dataIndex: "transaction_id",
      title: "TRANSACTION ID",
    },
    { key: "settlementId", dataIndex: "settlement_id", title: "SETTLEMENT ID" },
    authContext.userDetails.type === "settlementagency"
      ? {
          key: "settlementAmount",
          dataIndex: "settlement_amount",
          title: "SETTLEMENT AMOUNT",
        }
      : {},
    {
      key: "settlementRefNumb",
      dataIndex: "settlement_Ref_no",
      title: "SETTLEMENT REFERENCE ID",
    },
    {
      key: "reconStatus",
      dataIndex: "recon_status",
      title: "RECON STATUS",
      render: (value) =>
        TagRenderer(getInwardSettlementTag("recon_status", value)),
    },
    {
      key: "diffAmt",
      dataIndex: "diff_amount",
      title: "DIFFERENCE AMOUNT",
      render: (value) => <p>{Number(value) ? `INR ${value}` : ""}</p>,
    },
    {
      key: "counterPartyReconStatus",
      dataIndex: "counterparty_recon_Status",
      title: "COUNTER PARTY RECON STATUS",
      render: (value) =>
        TagRenderer(getInwardSettlementTag("counterparty_recon_Status", value)),
    },
    {
      key: "counterPartyDiffAmt",
      dataIndex: "counterparty_diff_amount",
      title: "COUNTER PARTY DIFF AMOUNT",
      render: (value) => <p>{Number(value) ? `INR ${value}` : ""}</p>,
    },
    { key: "message", dataIndex: "message", title: "MESSAGE" },
    { key: "createdAt", dataIndex: "created_at", title: "CREATED AT" },
    { key: "udpatedAt", dataIndex: "updated_at", title: "UPDATED AT" },
  ];

  useEffect(() => {
    if (authContext.userDetails.type === "buyerapp") {
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
    }
  }, []);

  return (
    <>
      <Row>
        <Col span={21}>
          <h2 className="heading-bold">{`Inward Transaction ${
            authContext.userDetails.type === "settlementagency"
              ? "(Receiver)"
              : ""
          }`}</h2>
        </Col>
        <Col span={2} style={{ display: "flex", columnGap: "16px" }}>
          <RSPButton type="secondary" onClick={() => downloadFile("XLSX")}>
            Download XLS
          </RSPButton>
        </Col>
      </Row>
      <Row style={{ display: "flex", alignItems: "center", columnGap: "16px" }}>
        <Col span={8}>
          <RSPInput
            variant="input"
            style={{ height: "36px" }}
            placeholder="Order ID, Invoice or Ref. No. ..."
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
        <Col>
        <RSPDatePicker
          callback={(evnt) => {
            const modifiedFromDate=Object.values(evnt.fromDate).join('/');
            const modifiedToDate=Object.values(evnt.toDate).join('/')
            setDates({fromDate:modifiedFromDate,toDate:modifiedToDate});
          }}
          showPicker
          defaultPickerValue={[fromDate,today]}
          defaultValue={[fromDate,today]}
        />
        </Col>
        {getBuyerAppInwardFilters(authContext.userDetails.type,setQueryParams,queryParams,dynamicFilterOpts)}
      </Row>
      <RSPTable
        pagination={{
          defaultCurrent: 1,
          pageSize: paginationData.itemPerPage,
          total: paginationData.totalItems,
          onChange: (pgNumber) => {
            setPaginationData((prevState) => ({
              ...prevState,
              currentPageNumber: pgNumber,
            }));
          },
          itemRender: (val, page) => (
            <p style={{ margin: "auto", borderRadius: "20%" }}>
              {page === "prev" && <LeftOutlined />}
              {page === "page" && `${val}`}
              {page === "next" && <RightOutlined />}
            </p>
          ),
        }}
        columns={columns}
        scroll={{ x: "max-content" }}
        dataSource={inwardTransactions}
      />
      {modalContent && (
        <RSPModal
          open
          onCancel={() => setModalContent("")}
          onOk={() => setModalContent("")}
        >
          <>
            <h3 className="heading-bold">Payer Details</h3>
            <div style={{ border: "0.5px solid #D3D3D3" }}>
              {modalContent.map((item) => {
                return (
                  <Row style={{ display: "flex", columnGap: "8px" }}>
                    <Col
                      style={{
                        display: "flex",
                        background: "#E8E8E8",
                        padding: "16px",
                        width: "175px",
                      }}
                    >
                      {item[0]}
                    </Col>
                    <Col
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {item[1]}
                    </Col>
                  </Row>
                );
              })}
            </div>
          </>
        </RSPModal>
      )}
    </>
  );
};
