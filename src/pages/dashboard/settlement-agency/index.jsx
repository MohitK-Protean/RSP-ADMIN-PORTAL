import { Card, Col, Divider, Row, Typography } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import Image4 from "../../../assets/logos/image 14.svg";
import { RSPDatePicker } from "../../../components/date-picker";
import RSPDivider from "../../../components/divider";
import RSPTag from "../../../components/tag";
import AuthContext from "../../../context/auth-context";

export const DataCard = (props) => {
  const { Title, Text } = Typography;
  const { noOverflow = false, isTransparent = false, heading = "" } = props;
  return (
    <>
      {heading && <Title level={4}>{heading}</Title>}
      <div
        style={{
          background: isTransparent ? "transparent" : "white",
          overflow: noOverflow ? "none" : "auto",
          display: "flex",
          ...(props.isFullWidth && {
            justifyContent: 'space-around',
            width: "100%",
          }),
        }}
      >
        {props.data.map((item) => {
          const formattedNUmber = new Intl.NumberFormat("en-IN").format(item.value.numbr);
          return (
            <Card
              style={{
                background: "transParent",
                border: "none",
              }}
            >
              <Title level={"4"}>{item.number.toLocaleString("en-IN")}</Title>
              <Typography>
                Value
                <Text strong>
                  {` ${item.value.currency} ${formattedNUmber}`}
                </Text>
              </Typography>
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
              size="default"
              bodyStyle={{
                paddingTop: "24px",
                paddingBottom: "24px",
                paddingLeft: "2px",
                paddingRight: "2px",
              }}
            >
              <Row
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                {" "}
                <img src={item.image} alt="" height={45} />{" "}
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
                {" "}
                {`${item.currency} ${formattedNUmber}`}
              </Typography>
            </Card>
          </Col>
        );
      })}
    </>
  );
};

const Dashboard2 = ({dateSetter,dashboardStats:{transaction=[],pendingSettlement=[]}}) => {
  const transactionTagMap={
    totalTransaction: {
      text: "Total Settlement",
      color: "primary",
    },
    initiatedTransaction: {
      text: "Total Settlement Initiated",
      color: "warning",
      fontColor: "#FE8C07",
    },
    successTransaction: {
      text: "Total Settlement Success",
      color: "success",
      fontColor: "#25B946",
    },
    failedTransaction: {
      text: "Total Settlement Failed",
      color: "danger",
      fontColor: "#E7142D",
    },

  }

  const modifiedPendingSettlements =pendingSettlement?.map((elem) => ({
    image: elem?.appLogo,
    appId: elem?.app ||'',
    amt: elem?.amount,
    currency: "INR",
  })) || [];

  const transactionData =
  Object.entries(transaction)?.map((tr) => ({
    number: tr[1]?.count,
    value: { numbr: tr[1]?.value, currency: "INR" },
    caption:"ETD",
    tag:transactionTagMap[tr[0]]
  })) || [];

  return (
    <>
          <Row>
        <RSPDatePicker showPicker={true}
                  callback={(evnt) => {
                    const modifiedFromDate=Object.values(evnt.fromDate).join('/');
                    const modifiedToDate=Object.values(evnt.toDate).join('/')
                    dateSetter({fromDate:modifiedFromDate,toDate:modifiedToDate});
                  }}
        />
      </Row>
      <Row id="transactionContainer">
        <DataCard data={transactionData} isFullWidth={true} />
      </Row>
      <RSPDivider className="mt-40" />
      <Row
        id="pendinSettlements"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Row style={{ padding: "12px" }}>
          <h3>Pending Settlements From (All NP/All Flow)</h3>
        </Row>
        <Row style={{ display: "flex", justifyContent: "space-evenly" }}>
          <SettelmentCard data={[...modifiedPendingSettlements,{ image: Image4, amt: 15000, currency: "INR" },]} isFullWidth={true} />
        </Row>
      </Row>
    </>
  );
};

const SettlementAgencyDashboard = () => {
  const authContext = useContext(AuthContext);
  const [dashboardStats, setStats] = useState({pendingSettlement:[],transaction:[]} );
  const fromDate=dayjs().subtract(4,'month')
  const today=dayjs()
  const [dates,setDates]=useState({fromDate:fromDate.format('YYYY/M/D'),toDate:today.format('YYYY/M/D'),})

  useEffect(() => {
    var config = {
      method: "POST",
      url: `/admin/rspadmin/settlementagency/stats/${authContext?.userDetails?.appId}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": authContext.token,
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
  }, [dates.fromDate, dates.toDate,]);
  return <Dashboard2  dashboardStats={dashboardStats} dateSetter={setDates}/>;
};

export default SettlementAgencyDashboard;
