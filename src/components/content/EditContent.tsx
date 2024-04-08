"use client"
import React, { useState } from 'react';
import { Input, Form, Typography, Button, message } from 'antd';
const { TextArea } = Input;
import { GlobalContext } from "seeksolution/context/Provider";
import SeekSolutionApi from "seeksolution/utils/SeekSolutionApi";
import { useRouter, useParams } from "next/navigation";
import ReactQuill from 'react-quill';
import { useForm } from 'antd/es/form/Form';


interface ContentData {
  _id: string;
  title: string;
  description: string;
  slug: string
}

const EditContent = ({ accessToken }: { accessToken: string }) => {
  const [form]=useForm()
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const params = useParams();
  const { Toast } = React.useContext(GlobalContext)


  const [contentData, setContentData] = useState<ContentData>({
    _id: "",
    description: "",
    slug: "",
    title: ""
  });

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      SeekSolutionApi.setToken(accessToken);
      const { title, description } = values;
      await SeekSolutionApi.Contents.update(params.slug as string, { title, description });
      console.log("-->", title, description);

      Toast.success("Content Updated successfully");
      router.back();
    } catch (error) { 
      console.error("Error:", error);
      Toast.error(error)
    } finally {
      setLoading(false);
    }
  };

  const initialise = async () => {
    try {
      const apiRes = await SeekSolutionApi.Contents.getBySlug(params.slug as string)
      form.setFieldValue("title",apiRes.title)
      form.setFieldValue("description",apiRes.description)
      setContentData(apiRes)
    } catch (error) {

    }
  }

  React.useEffect(() => {
    initialise()
  }, [])


  return (
    <div>
      <h1>Update Content</h1>
      <Form
      form={form}
      layout='vertical'
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="title"
          label={"Title"}
        >
          <Input placeholder="Your title" />
        </Form.Item>

        <Form.Item
          name="description"
          label={"Description"}
        >
          <ReactQuill style={{ height: "206px", marginBottom: 30 }} />


          {/* <TextArea
            placeholder="Controlled autosize"
            autoSize={{ minRows: 5, maxRows: 8 }}
          /> */}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditContent;
