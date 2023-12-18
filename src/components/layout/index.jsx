import React from "react";
import { Layout, Menu, Typography, Col, Row, } from "antd";
import RSPDivider from "../divider";
import proteanLogo from "../../assets/logos/protean-logo.svg";
import RSPButton from "../button";
import { ReactComponent as UserIcon } from "../../assets/icons/user.svg";
import { ReactComponent as ExitIcon } from "../../assets/icons/exit.svg";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useContext } from "react";
import AuthContext from "../../context/auth-context";
import { useLocation } from "react-router-dom";
import { RSPModal } from "../modal";
import { useState } from "react";
import logoutDoor from '../../assets/icons/logout-door.svg'
import styles from './layout.module.scss'
import { userRole } from "../../utils/sidebar-config";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;


const RSPLayout = ({ menuItems, children }) => {
  const rom=useLocation()
  const lastKey=rom.pathname.split('/')[rom.pathname.split('/').length-1].split(':')[0]
  const [showLogoutModal,setShowLogoutModal]=useState(false)
  const authCtx=useContext(AuthContext);
  dayjs.extend(advancedFormat);
  const currentDate = dayjs().format("Do of MMMM YYYY");
  const today = new Date();
  const curHr = today.getHours();
  let greetingBasedOnTime;

  if (curHr < 12) {
    greetingBasedOnTime = "Good Morning";
  } else if (curHr < 18) {
    greetingBasedOnTime = "Good Afternoon";
  } else {
    greetingBasedOnTime = "Good Evening";
  }

  const userType = userRole(authCtx?.userDetails.type);

  return (
    <Layout className="min-h-screen">
      <Sider theme="light">
        <div className="ml-20 mr-20 mt-40">
          <img src={proteanLogo} alt="protean-logo" height="29px" />
          <h3 className="heading-extra-bold">protean</h3>
          <h3 className="heading-extra-bold">
            {userType}{" "}
            <span className="heading-light">
              {userType === "Settlement" ? "Agency" : "Admin Dashboard"}
            </span>
          </h3>
          <RSPDivider className="mt-40 mb-20" />
        </div>
        <Menu
          defaultSelectedKeys={["1"]}
          selectedKeys={[`/${lastKey}`]}
          mode="inline"
          items={menuItems}
        />
      </Sider>
      <Layout className="pt-36 pb-36 pl-20 pr-20">
        <Header className="mb-36">
          <Row style={{ display: "flex", justifyContent: "space-between" }}>
            <Col>
              <Title level={3} className="rsp-title-text heading-light">
                {`${greetingBasedOnTime}! It's `}
                <span className="heading-bold">{currentDate}</span>
              </Title>
            </Col>
            <Col className="d-flex">
              <RSPButton type="link" className="d-flex align-center">
                <UserIcon className="mr-12" />
                {authCtx.userDetails.userName}
              </RSPButton>
              <RSPButton
                type="link"
                danger
                className="d-flex align-center"
                onClick={() => setShowLogoutModal(true)}
              >
                <ExitIcon className="mr-12" />
                Logout
              </RSPButton>
            </Col>
          </Row>
          <RSPDivider className="mt-20" />
        </Header>
        <Content>
          <div>{children}</div>
        </Content>
      </Layout>
      {showLogoutModal && (
        <RSPModal open footer={null}>
          <div className={styles.logoutModal}>
            <h3 className="heading-bold">Logout?</h3>
            <img src={logoutDoor} width="100px" height="133px" />
            <span>Are you sure you want to log out of this account</span>
            <div className={styles.modalFooter}>
              <RSPButton
                className={styles.footerBtn}
                onClick={() => setShowLogoutModal(false)}
              >
                No
              </RSPButton>
              <RSPButton
                type="default"
                className={styles.footerBtn}
                onClick={authCtx.logout}
              >
                Logout
              </RSPButton>
            </div>
          </div>
        </RSPModal>
      )}
    </Layout>
  );
};
export default RSPLayout;
