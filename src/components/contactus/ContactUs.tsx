"use client";

import React, { useState } from "react";
import { Button, Card, Flex, Modal, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import SeekSolutionApi from "seeksolution/utils/SeekSolutionApi";
import Search, { SearchProps } from "antd/es/input/Search";
import { FileExcelOutlined, FilterOutlined } from "@ant-design/icons";

interface DataType {
  key: string;
  name: string;
  email: string;
  desc: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Description",
    dataIndex: "desc",
    key: "desc",
  },
  {
    title: "Action",
    dataIndex: "desc",
    key: "action",
  },
];

const ContactUs: React.FC = () => {
  const [state, setState] = React.useState({
    data: [] as Array<any>,
    count: 0,
  });

  const initialise = async () => {
    try {
      const apiRes = await SeekSolutionApi.ContactUs.pagination();
      console.log("apiRes", apiRes);
      if (Array.isArray(apiRes)) {
        setState({
          data: apiRes,
          count: 0,
        });
        return;
      }

      setState(apiRes);
    } catch (error) {}
  };

  React.useEffect(() => {
    initialise();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleFile = () => {
    setIsModalOpen(true);
  };
  const handleButton = () => {
    setIsModalOpen(false);
  };
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  return (
    <Card
      title="Contact Us"
      extra={
        <Flex gap={20}>
          <Search
            placeholder="input search text"
            allowClear
            onSearch={onSearch}
            style={{ width: 300 }}
          />{" "}
          <FilterOutlined
            style={{ fontSize: "25px", color: "black", cursor: "pointer" }}
          />
          <FileExcelOutlined
            onClick={handleFile}
            style={{ fontSize: "22px", color: "black", cursor: "pointer" }}
          />
          <Modal footer={false} title="" onCancel={handleButton} open={isModalOpen}>
            <h1>Which one you want</h1>
            <Flex gap={40} justify="center">
              <Button onClick={handleButton}>Import</Button>
              <Button onClick={handleButton}>Export</Button>
            </Flex>
          </Modal>
        </Flex>
      }
    >
      <Table columns={columns} dataSource={state.data} pagination={false} />
    </Card>
  );
};

export default ContactUs;
