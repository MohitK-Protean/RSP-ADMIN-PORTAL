import { Timeline } from "antd";
import { ReactComponent as TimelineDot } from "../../assets/icons/timeline-dot.svg";
import RSPButton from "../button";
import { ReactComponent as DownloadIcon } from "../../assets/icons/download.svg";
import styles from "./logs.module.scss";

export const RSPLogs = ({ items, ...restProps }) => {
  return (
    <Timeline {...restProps}>
      {items.map((item) => (
        <Timeline.Item dot={<TimelineDot />}>
          <div className="d-flex space-between">
            <div>
              <p className={styles["logs-title"]}>{item?.title}</p>
              <h4 className={styles["logs-date"]}>{item?.date}</h4>
              {item?.children}
            </div>
            {item?.downloadLogs && (
              <div>
                <RSPButton type="secondary">
                  <DownloadIcon className="mr-12" />
                  Download Logs
                </RSPButton>
              </div>
            )}
          </div>
        </Timeline.Item>
      ))}
    </Timeline>
  );
};
