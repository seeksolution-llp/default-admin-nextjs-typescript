"use client";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Space,
  Table,
  Modal,
  Form,
  Input,
  message,
  Popconfirm,
  Flex,
} from "antd";
import { useForm } from "antd/es/form/Form";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GlobalContext } from "seeksolution/context/Provider";
import SeekSolutionApi from "seeksolution/utils/SeekSolutionApi";
import { Typography } from "antd";
import Search, { SearchProps } from "antd/es/input/Search";

const { Text } = Typography;

interface CONTENT {
  _id: string;
  title: string;
  description: string;
  slug: string;
}

const ContentListing = ({ accessToken }: { accessToken: string }) => {
  const [form] = useForm();
  const { Toast } = React.useContext(GlobalContext);
  const [contentData, setContentData] = useState<CONTENT[]>([]);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = React.useState({
    _id: "",
    question: "",
    answer: "",
  });

  const fetchContentData = async () => {
    setLoading(true);
    try {
      SeekSolutionApi.setToken(accessToken);
      const apiRes = await SeekSolutionApi.Contents.pagination();
      setContentData(apiRes);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Failed to fetch FAQs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContentData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await SeekSolutionApi.Contents.delete(id);
      message.success("Content deleted successfully");
      console.log("ok called");

      fetchContentData(); // Refresh FAQ list
    } catch (error) {
      console.error("Error deleting Content:", error);
      message.error("Failed to delete Content");
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text: string) => (
        <Typography.Paragraph ellipsis={{ rows: 1 }}>
          <span dangerouslySetInnerHTML={{ __html: text }}></span>
        </Typography.Paragraph>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: CONTENT) => (
        <Space>
          <Link href={`/content/${record.slug}/edit`}>
            <Button shape="circle" icon={<EditOutlined />}></Button>
          </Link>

          <Popconfirm
            title="Delete the content"
            description="Are you sure to delete this content?"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            onConfirm={() => handleDelete(record.slug)}
          >
            <Button shape="circle" danger>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // const handleUpdateFaq = async (values: any) => {
  //   try {
  //     setLoading(true)
  //     SeekSolutionApi.setToken(accessToken);
  //     const apiRes = await SeekSolutionApi.Faqs.update(editData._id, values);

  //     const index = contentData.findIndex((ele) => ele._id == editData._id)
  //     console.log(index);

  //     contentData[index].question = values.question
  //     contentData[index].answer = values.answer
  //     console.log("-->", contentData[index].question, contentData[index].answer);
  //     setContentData([...contentData])
  //     message.success("Updated Successfully");
  //     setEditData({
  //       _id: "",
  //       answer: "",
  //       question: ""
  //     })
  //   } catch (error) {
  //     Toast.error(error)
  //   } finally {
  //     setLoading(false)

  //   }
  // };

  // useEffect(() => {
  //   if (editData._id) {
  //     form.setFieldValue("question", editData.question);
  //     form.setFieldValue("answer", editData.answer);
  //   }
  // }, [editData]);
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);
  return (
    <Card
      title="Content"
      extra={
        <Flex gap={35} align="center">
          <Search
            placeholder="input search text"
            allowClear
            onSearch={onSearch}
            style={{ width: 350 }}
          />
          <Link href="/content/add">
            <PlusCircleOutlined style={{ fontSize: "20px" }} />
          </Link>
        </Flex>
      }
      className="w-full"
    >
      <Table
        columns={columns}
        dataSource={contentData}
        pagination={false}
        loading={loading}
      />
    </Card>
  );
};

export default ContentListing;
