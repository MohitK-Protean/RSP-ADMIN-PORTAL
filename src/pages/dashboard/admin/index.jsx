import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import RSPCard from "../../../components/card";
import RSPCarousel from "../../../components/carousel";
import RSPTable from "../../../components/table";
import RSPTabs from "../../../components/tabs";
import { transactionMockData } from "../../../mocks/transaction";
import { DataCard } from "../settlement-agency";

const mockData1 = [
  {
    number: 116,
    value: { numbr: "25.56cr", currency: "INR" },
    caption: "ETD",
    tag: { text: "Total Transactions", color: "primary" },
  },
  {
    number: "10,099",
    value: { numbr: "25.56cr", currency: "INR" },
    caption: "ETD",
    tag: {
      text: "Successful Transaction",
      color: "success",
    },
  },
  {
    number: "09",
    value: { numbr: "25.56cr", currency: "INR" },
    caption: "ETD",
    tag: {
      text: "Failed Transaction",
      color: "danger",
      fontColor: "#E7142D",
    },
  },
];

const BuyerAppManagement = () => {
  return (
    <RSPCarousel>
      <DataCard
        data={mockData1}
        noOverflow={true}
        isTransparent
        heading="Kotak"
      />
      <DataCard
        data={mockData1}
        noOverflow={true}
        isTransparent
        heading="HDFC"
      />
      <DataCard
        data={mockData1}
        noOverflow={true}
        isTransparent
        heading="SBI"
      />
    </RSPCarousel>
  );
};

const SettlementAgency = () => {
  return (
    <RSPCarousel>
      <DataCard
        data={mockData1}
        noOverflow={true}
        isTransparent
        heading="City Bank"
      />
      <DataCard
        data={mockData1}
        noOverflow={true}
        isTransparent
        heading="HDFC"
      />
      <DataCard
        data={mockData1}
        noOverflow={true}
        isTransparent
        heading="SBI"
      />
    </RSPCarousel>
  );
};

const AdminDashboard = () => {
  const buyerSellerTabs = [
    {
      label: "Buyer App Management",
      key: "buyerAppManagement",
      children: <BuyerAppManagement />,
    },
    {
      label: "Seller App Management",
      key: "sellerAppManagement",
      children: `Seller App Management`,
    },
  ];
  const settlementLogisticTabs = [
    {
      label: "Settlement Agency",
      key: "settlementAgency",
      children: <SettlementAgency />,
    },
    {
      label: "Logistic App",
      key: "logisticApp",
      children: `Logistic App`,
    },
  ];
  const transactionCols = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "PAYEE NAME",
      dataIndex: "payeeName",
      key: "payeeName",
    },
    {
      title: "SETTLEMENT ID",
      dataIndex: "settlementId",
      key: "settlementId",
      render: (val) => <Link>{val}</Link>,
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "SETTLEMENT REF. NO.",
      dataIndex: "settlementRefNo",
      key: "settlementRefNo",
    },
  ];

  return (
    <Row gutter={20}>
      <Col span={12}>
        <RSPCard className="mb-20">
          <RSPTabs defaultKey="buyerAppManagement" tabItems={buyerSellerTabs} />
        </RSPCard>
        <RSPCard>
          <RSPTabs
            defaultKey="settlementAgency"
            tabItems={settlementLogisticTabs}
          />
        </RSPCard>
      </Col>
      <Col span={12}>
        <RSPCard title="Access Management" className="mb-20">
          Hello world
        </RSPCard>
        <RSPCard title="Recon Transaction">
          <RSPTable
            columns={transactionCols}
            dataSource={transactionMockData}
          />
        </RSPCard>
      </Col>
    </Row>
  );
};

export default AdminDashboard;
