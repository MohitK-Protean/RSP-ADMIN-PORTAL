import { Card, Col, Divider, Row, Typography } from "antd";
import { RSPDatePicker } from "../../../components/date-picker";
import RSPDivider from "../../../components/divider";
import RSPTag from "../../../components/tag";
import React, { useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../../../context/auth-context";
import axios from "axios";
import { useState } from "react";
import dayjs from "dayjs";

const transactionTagMap = {
  totalTransaction: {
    text: "Total Transaction",
    color: "primary",
  },
  readyTransaction: {
    text: "Ready Transaction",
    color: "secondary",
    fontColor: "#FE07AA",
  },
  initiatedTransaction: {
    text: "Initiated Transaction",
    color: "warning",
    fontColor: "#FE8C07",
  },
  successTransaction: {
    text: "Successful Transaction ",
    color: "success",
    fontColor: "#25B946",
  },
  failedTransaction: {
    text: "Failed Transaction ",
    color: "danger",
    fontColor: "#E7142D",
  },
  pendingTransaction: {
    text: "Pending Transaction ",
    color: "violet",
    fontColor: "#9714E7",
  },
};

// default dates 
const fromDate = dayjs().subtract(5, "year");
const today = dayjs();

const DataCard = (props) => {
  const { Title } = Typography;
  return (
    <>
      <div
        style={{
          background: "white",
          overflow: "auto",
          display: "flex",
          ...(props.isFullWidth && {
            justifyContent: "space-evenly",
            width: "100%",
          }),
        }}
      >
        {props.data.map((item) => {
          return (
            <Card
              style={{
                background: "transParent",
                border: "none",
              }}
            >
              <Title level={"4"}>{item.number.toLocaleString("en-US")}</Title>
              <h4>
                Value
                <b>{` ${item.value.currency} ${item.value.numbr}`}</b>
              </h4>
              <Typography
                style={{
                  fontWeight: "700",
                  fontSize: "16px",
                  lineHeight: "22px",
                  color: "#F80C61",
                }}
              >
                {item.caption}
              </Typography>
              <br />
              <RSPTag tagColor={item.tag.color} tagSize="large">
                {item.tag.text}
              </RSPTag>
            </Card>
          );
        })}
      </div>
    </>
  );
};
const SettelmentCard = (prop) => {
  return (
    <>
      {prop.data.map((item) => {
        const formattedNUmber = new Intl.NumberFormat("en-US").format(item.amt);
        return (
          <Col span={4}>
            <Card
              bodyStyle={{
                paddingTop: "24px",
                paddingBottom: "24px",
                paddingLeft: "2px",
                paddingRight: "2px",
              }}
              style={{
                width: "230px",
                height: "180px",
              }}
            >
              <Row
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  width: "230px",
                  padding: "4px",
                }}
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt="app logo"
                    style={{ position: "relative" }}
                  />
                ) : (
                  <p style={{ textAlign: "center" }}>{item.appId}</p>
                )}
              </Row>
              <Divider style={{ border: "1px solid #D3D3D3" }} />
              <Typography
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  fontWeight: "700",
                }}
              >
                {`${item.currency} ${formattedNUmber}`}
              </Typography>
            </Card>
          </Col>
        );
      })}
    </>
  );
};

const Dashboard1 = ({
  stats: {
    pendingForwardSettlement = [],
    pendingReverseSettlement = [],
    transaction = [],
  },
  dateSetter,
}) => {
  const modifiePendingSettlements =
    pendingForwardSettlement?.map((elem) => ({
      image: elem?.appLogo,
      appId: elem?.app || "",
      amt: elem?.amount,
      currency: "INR",
    })) || [];
  const modifiedReverseSettlements =
    pendingReverseSettlement?.map((elem) => ({
      image: elem?.appLogo,
      appId: elem?.app || "",
      amt: elem?.amount,
      currency: "INR",
    })) || [];
  const transactionData =
    Object.entries(transaction)?.map((tr) => ({
      number: tr[1]?.count,
      value: { numbr: tr[1]?.value, currency: "INR" },
      caption: "ETD",
      tag: transactionTagMap[tr[0]],
    })) || [];

  return (
    <>
      <Row>
        <RSPDatePicker
          callback={(evnt) => {
            const modifiedFromDate = Object.values(evnt.fromDate).join("/");
            const modifiedToDate = Object.values(evnt.toDate).join("/");
            dateSetter({ fromDate: modifiedFromDate, toDate: modifiedToDate });
          }}
          showPicker
          defaultPickerValue={[fromDate, today]}
          defaultValue={[fromDate, today]}
        />
      </Row>
      <Row id="transactionContainer">
        <DataCard data={transactionData} />
      </Row>
      <Row
        id="pendinSettlements"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <RSPDivider />
        <Row style={{ padding: "12px" }}>
          <h3>Pending Settlements (B to S)</h3>
        </Row>
        <Row gutter={20}>
          <SettelmentCard data={modifiePendingSettlements} />
        </Row>
      </Row>
      <Row
        id="pendingReverseSettlements"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Row style={{ padding: "12px" }}>
          <h3> Pending Reverse Settlements (S to B)</h3>
        </Row>
        <Row gutter={20}>
          <SettelmentCard data={modifiedReverseSettlements} />
        </Row>
      </Row>
    </>
  );
};

const BuyerDashboard = () => {
  const authContext = useContext(AuthContext);
  const [dashboardStats, setStats] = useState({
    pendingForwardSettlement: [],
    pendingReverseSettlement: [],
    transaction: [],
  });
  const [dates, setDates] = useState({
    fromDate: fromDate.format("YYYY/M/D"),
    toDate: today.format("YYYY/M/D"),
  });

  useEffect(() => {
    var config = {
      method: "POST",
      url: `/rspadmin/buyerappstats/${authContext?.userDetails?.appId}?fromDate=${dates.fromDate}&toDate=${dates.toDate}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: authContext.token,
      },
      data: JSON.stringify({
        fromDate: "2022-09-01",
        toDate: "2022-10-04",
      }),
    };

    axios({ ...config })
      .then(function (response) {
        setStats(response.data.body);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [dates.fromDate, dates.toDate]);
  return <Dashboard1 stats={dashboardStats} dateSetter={setDates} />;
};

export default BuyerDashboard;
