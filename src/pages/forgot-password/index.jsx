import RSPCard from "../../components/card";
import RSPButton from "../../components/button";
import RSPInput from "../../components/input";
import { Form } from "antd";
import logo from "../../assets/logos/protean-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import URLS from "../../navigation/urls";
import { useState } from "react";
import { ReactComponent as MailboxIcon } from "../../assets/icons/mailbox.svg";
import { obscureEmail } from "../../utils/helper";
import axios from "axios";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [resetLinkSent, setResetLinkSent] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const forgotPassword = ({ emailId }) => {
    if (emailId) {
      setIsLoading(true);
      const data = JSON.stringify({
        email: emailId,
      });

      const config = {
        method: "put",
        url: "/auth/resetpassword",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(() => {
          setResetLinkSent(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  console.log(isLoading);
  return (
    <main className="text-center mt-80">
      <img src={logo} alt="protean-logo" />
      <h1 className="heading-extra-bold mb-74">
        RSP <span className="heading-light">Admin Dashboard</span>
      </h1>

      <RSPCard
        cardSize="medium"
        paddingSize="large"
        className="ml-auto mr-auto"
      >
        {resetLinkSent ? (
          <div className="text-center">
            <h2 className="mb-40 heading-light">
              Check your <span className="heading-extra-bold">Email-ID</span>
            </h2>
            <MailboxIcon className="mb-36" />
            <p className="mb-40 text-secondary">
              We have sent an Email ID to{" "}
              <span className="text-primary">{obscureEmail(email)}</span>
              <Link onClick={() => setResetLinkSent(false)}>(Change)</Link>.
              Click on the link and follow the steps to reset your password.
            </p>
            <RSPButton
              block
              className="mb-20"
              onClick={() => navigate(URLS.LOGIN)}
            >
              Login
            </RSPButton>
            <Link onClick={() => setResetLinkSent(false)}>Resend Link</Link>
          </div>
        ) : (
          <>
            <h2 className="mb-40 heading-light">
              Forgot <span className="heading-extra-bold">Password</span>
            </h2>
            <Form
              layout="vertical"
              onFinish={forgotPassword}
              className="text-left"
            >
              <Form.Item
                label="Email ID"
                name="emailId"
                rules={[
                  { required: true, message: "Please input your Email ID!" },
                  {
                    type: "email",
                    message: "Email is not valid!",
                  },
                ]}
                className="mb-40"
              >
                <RSPInput
                  placeholder="Email ID"
                  value={email}
                  onChange={(e) => setEmail(e?.target?.value)}
                />
              </Form.Item>
              <div className="text-center">
                <RSPButton
                  block
                  htmlType="submit"
                  className="mb-20"
                  disabled={isLoading}
                  loading={isLoading}
                >
                  Send Reset Link
                </RSPButton>
                <Link to={URLS.LOGIN}>Go Back to Login</Link>
              </div>
            </Form>
          </>
        )}
      </RSPCard>
    </main>
  );
};

export default ForgotPassword;
