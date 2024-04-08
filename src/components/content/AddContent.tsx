"use client";
import React, { useState } from "react";
import {
  Input,
  Form,
  Typography,
  Button,
  message,
  UploadProps,
  Upload,
} from "antd";
const { TextArea } = Input;
import SeekSolutionApi from "seeksolution/utils/SeekSolutionApi";
import { useRouter } from "next/navigation";
import ReactQuill from "react-quill";
import Dragger from "antd/es/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";

const AddContent = ({ accessToken }: { accessToken: string }) => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const [value, setValue] = useState("");
  console.log("token -->", accessToken);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      SeekSolutionApi.setToken(accessToken);
      // Extract the title and description from form values
      const { title, description } = values;
      // Make API call to add content
      await SeekSolutionApi.Contents.create({ title, description });
      console.log("-->", title, description);

      message.success("Content submitted successfully");
      router.back();
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to submit content");
    } finally {
      setLoading(false);
    }
  };
  const { Dragger } = Upload;
  const props: UploadProps = {
    name: "file",
    multiple: true,
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <div>
      <h1>Add Content</h1>
      <Form
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item label="Title" name="title">
          <Input placeholder="Your title" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <ReactQuill style={{ height: "206px", marginBottom: 30 }} />
          {/* <TextArea
            placeholder="Controlled autosize"
            autoSize={{ minRows: 5, maxRows: 8 }}
          /> */}
        </Form.Item>

        <Form.Item>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Dragger>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddContent;
