import RSPButton from "../../components/button";
import RSPCard from "../../components/card";
import RSPCarousel from "../../components/carousel";
import RSPDivider from "../../components/divider";
import RSPLayout from "../../components/layout";
import RSPTable from "../../components/table";
import RSPTabs from "../../components/tabs";
import RSPTag from "../../components/tag";
import { adminSidebarMenus } from "../../utils/sidebar-config";
import { RSPSelect } from "../../components/select";
import { RSPLogs } from "../../components/logs";

const SamplePage = () => {
  const dummyTabItems = [
    {
      label: "Tab1",
      key: 1,
      children: "Tab1",
    },
    {
      label: "Tab2",
      key: 2,
      children: "Tab2",
    },
  ];

  const timelineItems = [
    <div className="d-flex space-between">
      <div>
        <p className="text-secondary-dark mb-8">/RECON</p>
        <p>2022-09-14T07:25:03.082Z</p>
        <p>10 Order Object</p>
      </div>
      <div>
        <RSPButton type="secondary">Download Logs</RSPButton>
      </div>
    </div>,
    <div className="d-flex space-between">
      <div>
        <p className="text-secondary-dark mb-8">/RECON</p>
        <p>2022-09-14T07:25:03.082Z</p>
        <p>10 Order Object</p>
      </div>
      <div>
        <RSPButton type="secondary">Download Logs</RSPButton>
      </div>
    </div>,
    <div className="d-flex space-between">
      <div>
        <p className="text-secondary-dark mb-8">/RECON</p>
        <p>2022-09-14T07:25:03.082Z</p>
        <p>10 Order Object</p>
      </div>
      <div>
        <RSPButton type="secondary">Download Logs</RSPButton>
      </div>
    </div>,
  ];
  return (
    <RSPLayout menuItems={adminSidebarMenus}>
      <RSPCard title="Hello world">
        <RSPLogs items={timelineItems} />
        <h1 className="heading-bold">
          RSP <span className="heading-light">Admin Dashboard</span>
        </h1>
        <h1>Test font</h1>
        <RSPButton>Test</RSPButton>
        <RSPTable
          columns={[
            {
              title: "Name",
              dataIndex: "name",
              key: "name",
            },
            {
              title: "Age",
              dataIndex: "age",
              key: "age",
            },
          ]}
          dataSource={[
            {
              key: "1",
              name: "John Brown",
              age: 32,
              address: "New York No. 1 Lake Park",
              tags: ["nice", "developer"],
            },
            {
              key: "2",
              name: "Jim Green",
              age: 42,
              address: "London No. 1 Lake Park",
              tags: ["loser"],
            },
          ]}
          pagination={false}
        />
        <RSPDivider />
        <RSPTabs tabItems={dummyTabItems} />
        <RSPCarousel>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
        </RSPCarousel>
        <RSPTag tagColor="violet">Tag Content</RSPTag>
      </RSPCard>
      <RSPSelect
        // variant="transparent"
        // style={{ width: 120 }}
        placeholder="Test Placeholder"
        options={[
          {
            value: "jack",
            label: "Jack",
          },
          {
            value: "lucy",
            label: "Lucy",
          },
          {
            value: "disabled",
            disabled: true,
            label: "Disabled",
          },
          {
            value: "Yiminghe",
            label: "yiminghe",
          },
        ]}
      />
    </RSPLayout>
  );
};

export default SamplePage;
