import { Col, Form, Row } from "antd";
import { useState } from "react";
import proteanLogo from "../../assets/logos/protean-logo.svg";
import RSPButton from "../../components/button";
import RSPCard from "../../components/card";
import RSPInput from "../../components/input";
import { ReactComponent as GreenChecked } from "../../assets/icons/checked-green-contained.svg";
import { useNavigate } from "react-router-dom";
import URLS from "../../navigation/urls";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [isPswChanged, setIsPswChanged] = useState(false);
  const handleSubmit = ({ newPassword, confirmPassword }) => {
    if (newPassword === confirmPassword) {
      setIsPswChanged(true);
    } else {
      alert("Password does not match");
    }
  };
  return (
    <div className="p-80">
      <div className="d-flex">
        <img
          src={proteanLogo}
          alt="protean-logo"
          height="55px"
          className="mr-12"
        />
        <div className="flex-col">
          <h3 className="heading-extra-bold">protean</h3>
          <h3 className="heading-extra-bold mb-80">
            RSP <span className="heading-light">Admin Dashboard</span>
          </h3>
        </div>
      </div>
      <Row align="middle">
        <Col span={12}>
          <p className="heading-light">
            {/* TODO: Replace it with the actual user email */}
            Hello! <span className="heading-extra-bold">buyer@email.com</span>
          </p>
          {isPswChanged ? (
            <h1 className="heading-extra-large heading-light">
              Your password has been
              <span className="heading-black"> changed.</span>
            </h1>
          ) : (
            <h1 className="heading-extra-large heading-black">
              Change{" "}
              <span className="heading-light">
                is good! <br /> Reset your password.
              </span>
            </h1>
          )}
        </Col>
        <Col span={12} className="text-center">
          <RSPCard
            cardSize="medium"
            paddingSize="large"
            className="ml-auto mr-auto"
          >
            {isPswChanged ? (
              <>
                <h2 className="mb-36 heading-light">
                  Reset <span className="heading-extra-bold">Successful!</span>
                </h2>
                <GreenChecked />
                <p className="text-secondary mb-40">
                  Your password has been changed successfully! You can login to
                  your account now.
                </p>
                <RSPButton block onClick={() => navigate(URLS.LOGIN)}>
                  Go to Login
                </RSPButton>
              </>
            ) : (
              <>
                <h2 className="mb-40 heading-light">
                  Reset <span className="heading-extra-bold">Password</span>
                </h2>
                <Form
                  layout="vertical"
                  onFinish={handleSubmit}
                  className="text-left"
                >
                  <Form.Item
                    label="Enter New Password"
                    name="newPassword"
                    className="mb-40"
                  >
                    <RSPInput
                      placeholder="Enter New Password"
                      variant="password"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    className="mb-40"
                  >
                    <RSPInput
                      placeholder="Confirm your Password"
                      variant="password"
                    />
                  </Form.Item>
                  <RSPButton block htmlType="submit">
                    Login
                  </RSPButton>
                </Form>
              </>
            )}
          </RSPCard>
        </Col>
      </Row>
    </div>
  );
};

export default ResetPassword;
