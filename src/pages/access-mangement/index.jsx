import RSPTable from "../../components/table";
import RSPTag from "../../components/tag";
import { DownOutlined, MoreOutlined } from "@ant-design/icons";
import RSPButton from "../../components/button";
import { Col, Form, Row } from "antd";
import { RSPModal } from "../../components/modal";
import { useContext, useEffect, useState } from "react";
import { ReactComponent as CreateIcon } from "../../assets/icons/create.svg";
import RSPInput from "../../components/input";
import { RSPCheckbox } from "../../components/checkbox";
import { ReactComponent as DashboardOutlined } from "../../assets/icons/dashboard-outlined.svg";
import { RSPDropdown } from "../../components/dropdown";
import { Link } from "react-router-dom";
import { RSPConfirmationPopup } from "../../components/confirmation-popup";
import AuthContext from "../../context/auth-context";
import axios from "axios";

const genQueryString = (queryParams) =>
  Object.keys(queryParams)
    .map((key) => {
      return key + "=" + queryParams[key];
    })
    .join("&");

const AccessManagement = () => {
  const authContext = useContext(AuthContext);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [allAdmins, setAllAdmins] = useState([]);
  const [queryParams, setQueryParams] = useState({});
  const [searchPhrase, setSearchPhrase] = useState("");

  useEffect(() => {
    const config = {
      method: "GET",
      url: `/admin/appadmin/admin/all?status=All&${genQueryString(
        queryParams
      )}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: authContext.token,
      },
    };

    axios(config)
      .then((response) => {
        setAllAdmins(response?.data?.body?.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [queryParams]);

  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "EMAIL ID",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "ROLE",
      dataIndex: "role",
      key: "role",
      render: (value) => (
        <RSPTag tagColor={value === "admin" ? "violet" : "secondary"}>
          {value}
        </RSPTag>
      ),
    },
    {
      title: "LAST LOGIN AT",
      dataIndex: "lastLogin",
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (value) => (
        <RSPTag tagColor={value === "Active" ? "success" : "danger"}>
          {value}
        </RSPTag>
      ),
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      render: () => (
        <RSPDropdown
          menu={{
            items: [
              {
                key: "markAsActive",
                label: (
                  <RSPConfirmationPopup title="Are you sure to mark this as active?">
                    <Link>Mark As Active</Link>
                  </RSPConfirmationPopup>
                ),
              },
              {
                key: "deleteAccess",
                label: (
                  <RSPConfirmationPopup title="Are you sure to delete?">
                    <Link>Delete Access</Link>
                  </RSPConfirmationPopup>
                ),
              },
            ],
          }}
        >
          <a>
            <MoreOutlined />
          </a>
        </RSPDropdown>
      ),
    },
  ];

  const handleCreateAccess = () => {
    console.log("Handle Create Access");
  };
  return (
    <>
      <div className="d-flex mb-20">
        {" "}
        <h2 className="heading-bold">Access Management</h2>
        <RSPButton
          className="ml-auto d-flex align-center"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <CreateIcon height={15} className="mr-8" />
          Create Access
        </RSPButton>
      </div>
      <Row>
        <Col xs={6}>
          <RSPInput
            variant="input"
            prefix={<DashboardOutlined />}
            placeholder="Search here..."
            className="mb-20"
            value={searchPhrase}
            onChange={(e) => setSearchPhrase(e?.target?.value)}
            onKeyDown={(e) => {
              if (e?.key === "Enter") {
                setQueryParams({
                  ...queryParams,
                  search_phrase: e?.target?.value,
                });
              }
            }}
            suffix={
              <RSPDropdown
                menu={{
                  items: [
                    {
                      key: "inactive",
                      label: "Inactive",
                    },
                  ],
                }}
              >
                <a>
                  Active <DownOutlined />
                </a>
              </RSPDropdown>
            }
          />
        </Col>
      </Row>
      <RSPTable columns={columns} dataSource={allAdmins} pagination />

      <RSPModal
        paddingSize="lg"
        title={
          <h2 className="heading-light">
            Create <span className="heading-extra-bold">Access</span>
          </h2>
        }
        open={isCreateModalOpen}
        footer={<RSPButton block>Create Access</RSPButton>}
        onCancel={() => setIsCreateModalOpen(false)}
      >
        <Form layout="vertical" onFinish={handleCreateAccess}>
          <Form.Item label="Name" name="name" className="mb-20">
            <RSPInput placeholder="Name" />
          </Form.Item>
          <Form.Item label="Email ID" name="email" className="mb-20">
            <RSPInput placeholder="Email ID" />
          </Form.Item>
          <Form.Item>
            <Form.Item name="user" noStyle>
              <RSPCheckbox variant="contained">User</RSPCheckbox>
            </Form.Item>
            <Form.Item name="admin" noStyle>
              <RSPCheckbox variant="contained">Admin</RSPCheckbox>
            </Form.Item>
          </Form.Item>
        </Form>
      </RSPModal>
    </>
  );
};

export default AccessManagement;
