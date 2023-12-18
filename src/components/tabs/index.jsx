import { Tabs } from "antd";

const RSPTabs = ({ tabItems, ...restProps }) => {
  return <Tabs items={tabItems} {...restProps} />;
};

export default RSPTabs;
