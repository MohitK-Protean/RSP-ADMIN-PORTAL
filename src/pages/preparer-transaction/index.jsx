import React, { useEffect } from "react";
import { Row, Checkbox, Col } from "antd";
import RSPTable from "../../components/table";
import RSPInput from "../../components/input";
import { RSPDatePicker } from "../../components/date-picker";
import RSPButton from "../../components/button";
import { BankUri, CollectorComponent, SettlementStatus } from "./util";
import { RSPSelect } from "../../components/select";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import AuthContext from "../../context/auth-context";
import { checkIfFull, exportCSV } from "../../utils/helper";
import URLS from "../../navigation/urls";
import { getModalContent } from "../outward-transaction/utils";
import { RSPModal } from "../../components/modal";
import dayjs from "dayjs";
import _ from "lodash";
import {
  LeftOutlined,
  RightOutlined,
  SmallDashOutlined,
} from "@ant-design/icons";

export const PreparerTransaction = () => {
  const orderReconStatuses = [
    { label: "Paid", value: "01" },
    { label: "Over Paid", value: "02" },
    { label: "Under Paid", value: "03" },
    { label: "Not Paid", value: "04" },
  ];

  const authContext = useContext(AuthContext);
  const buyerAppId = authContext?.userDetails?.appId || 1918;
  const [preparerTransaction, setPreparerTransaction] = useState([]);
  const [queryParams, setQueryParams] = useState({ isCorrection: false });
  const [modalContent, setModalContent] = useState();
  const fromDate = dayjs().subtract(1, "month");
  const today = dayjs();
  const [dates, setDates] = useState({
    fromDate: fromDate.format("YYYY/M/D"),
    toDate: today.format("YYYY/M/D"),
  });
  const [paginationData, setPaginationData] = useState({
    totalPages: 1,
    totalItems: 0,
    itemPerPage: 10,
    count: 0,
    currentPageNumber: 1,
  });

  // useEffect(()=>{
  //   if(preparerTransaction.length){
  //   preparerTransaction?.filter((data)=>{console.log(data);return data})
  //   }
  // },[searchValue])

  useEffect(() => {
    const queryString = Object.keys(queryParams)
      .map((key) => {
        return key + "=" + queryParams[key];
      })
      .join("&");

    const config = {
      method: "GET",
      url: `/admin/rspadmin/preparer/${buyerAppId}?${queryString}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: authContext.token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setPreparerTransaction(response?.data?.body?.data);
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
  }, [queryParams]);

  const downloadFile = async (fileType) => {
    const queryString = Object.keys(queryParams)
      .map((key) => {
        return key + "=" + queryParams[key];
      })
      .join("&");

    var config = {
      method: "GET",
      url: `/admin/rspadmin/preparer/${buyerAppId}?${queryString}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: authContext.token,
      },
    };
    const response = await axios(config);
    exportCSV(fileType, response.data.body.data, "demoFile");
  };
  const showModalContent = (key, value) => {
    const modifiedContent = getModalContent(key, value);
    console.log({ modifiedContent });
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
      key: "orderState",
      dataIndex: "state",
      title: "ORDER STATE",
      render: SettlementStatus,
    }, // used common component
    {
      key: "",
      dataIndex: "collector_app_id",
      title: "COLLECTOR",
      render: CollectorComponent,
    },
    {
      key: "reciver",
      dataIndex: "receiver_app_id",
      title: "RECIEVER",
      render: CollectorComponent,
    },
    {
      key: "payoutBank",
      dataIndex: "payout_bank_uri",
      title: "PAYOUT BANK",
      render: BankUri,
    },
    { key: "providerName", dataIndex: "provider_name", title: "PROVIDER NAME" },
    { key: "providerCode", dataIndex: "provider_code", title: "PROVIDER CODE" },
    {
      key: "transactionId",
      dataIndex: "transaction_id",
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
      render: SettlementStatus,
    },
    {
      key: "settlementRef",
      dataIndex: "settlement_ref",
      title: "SETTLEMENT REFERENCE",
    }, // not provided in response
    {
      key: "settlementTmsp",
      dataIndex: "settlement_timestamp",
      title: "SETTLEMENT TIMESTAMP",
    }, // not provided in response
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
      key: "payerdetails",
      dataIndex: "payerdetails",
      title: "PAYER DETAILS",
      render: (value = {}) => {
        const isDisabled = !checkIfFull(Object.values(value || {}));
        return (
          <Link
            disabled={isDisabled}
            onClick={() => showModalContent("payerdetails", value)}
          >
            View
          </Link>
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
        return _.capitalize(
          checkIfFull(row?.correction ? Object.values(row?.correction) : [])
        );
      },
    }, // not given in response
    {
      key: "correctionObject",
      dataIndex: "correction",
      title: "CORRECTION OBJECT",
      render: (value = {}) => {
        const isDisabled = !checkIfFull(Object.values(value || {}));
        return (
          <Link
            disabled={isDisabled}
            onClick={() => showModalContent("correctionObj", value)}
          >
            View
          </Link>
        );
      },
    },
    {
      key: "sentForRecon",
      dataIndex: "sent_for_recon",
      title: "SENT FOR RECON",
      render: (val) => _.capitalize(val),
    }, // convert it into string
    { key: "createdAt", dataIndex: "created_at", title: "CREATED AT" },
    { key: "udpatedAt", dataIndex: "updated_at", title: "UPDATED AT" },
  ];

  return (
    <>
      <Row>
        <Col span={21}>
          <h2 className="heading-bold">Preparer Transactions</h2>
        </Col>
        <Col span={2} style={{ display: "flex", columnGap: "16px" }}>
          <RSPButton type="secondary" onClick={() => downloadFile("XLSX")}>
            Download XLS
          </RSPButton>
          {/* <RSPButton>Download PDF</RSPButton> */}
        </Col>
      </Row>
      <Row style={{ display: "flex", alignItems: "center", columnGap: "16px" }}>
        <Col span={8}>
          <RSPInput
            variant="input"
            placeholder="Order ID, Invoice or Ref. No. ..."
            style={{ height: "36px" }}
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
              setDates({ fromDate: modifiedFromDate, toDate: modifiedToDate });
            }}
            showPicker
            defaultPickerValue={[fromDate, today]}
            defaultValue={[fromDate, today]}
          />,
          // <RSPSelect
          //   options={items}
          //   placeholder="Reciever"
          //   variant="transparent"
          // />,
          <RSPSelect
            options={orderReconStatuses}
            placeholder="Sent for Recon"
            variant="transparent"
            onChange={(value) =>
              setQueryParams({ ...queryParams, orderReconStatus: value })
            }
          />,
          <Checkbox
            checked={queryParams?.isCorrection}
            onChange={(e) =>
              setQueryParams({
                ...queryParams,
                isCorrection: e?.target?.checked,
              })
            }
          >
            Correction Flow
          </Checkbox>,
        ].map((item) => {
          return <Col>{item}</Col>;
        })}
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
              {page === "prev" ? (
                <LeftOutlined />
              ) : page === "page" ? (
                `${val}`
              ) : page === "next" ? (
                <RightOutlined />
              ) : (
                <SmallDashOutlined />
              )}
            </p>
          ),
        }}
        columns={columns}
        scroll={{ x: "max-content" }}
        dataSource={preparerTransaction}
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
