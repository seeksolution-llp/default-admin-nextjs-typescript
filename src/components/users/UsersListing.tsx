"use client";
import { FileExcelOutlined, FilterOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Flex,
  Image,
  Modal,
  Space,
  Table,
  TableProps,
  Tag,
} from "antd";
import Search, { SearchProps } from "antd/es/input/Search";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import SeekSolutionApi from "seeksolution/utils/SeekSolutionApi";
import { EStatus } from "seeksolution/utils/constant";

const UsersListing = ({ accessToken }: { accessToken: string }) => {
  const [state, setState] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleFile = () => {
    setIsModalOpen(true);
  };
  const handleButton = () => {
    setIsModalOpen(false);
  };

  interface DataType {
    key: string;
    walletAddress: string;
    createdAt?: string;
  }

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => <span>{_ || 0}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, record) => <span>{_ || 0}</span>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, record) => <span>{_ || 0}</span>,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (_, record) => <span>{_ || 0}</span>,
    },
    // {
    //     title: 'Action',
    //     key: 'action',
    //     render: (_, record) => (
    //         <Button type="primary">View</Button>
    //     ),
    // },
  ];
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  const initialiseApi = async () => {
    try {
      SeekSolutionApi.setToken(accessToken);
      const apiRes = await SeekSolutionApi.Users.pagination();
      console.log("apiRes", apiRes);

      setState(apiRes);
    } catch (error) {}
  };

  React.useEffect(() => {
    initialiseApi();
  }, []);

  return (
    <Card
      title="Users"
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
          <Modal
            footer={false}
            title=""
            onCancel={handleButton}
            open={isModalOpen}
          >
            <h1>Which one you want</h1>
            <Flex gap={40} justify="center">
              <Button onClick={handleButton}>Import</Button>
              <Button onClick={handleButton}>Export</Button>
            </Flex>
          </Modal>
        </Flex>
      }
    >
      <Table columns={columns} dataSource={state} pagination={false} />;
    </Card>
  );
};

UsersListing.displayName = "UsersListing";
export default UsersListing;
